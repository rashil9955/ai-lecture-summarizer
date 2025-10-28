import React, { useState, useRef, useCallback } from 'react';
import { GoogleGenAI, LiveServerMessage, Modality, Chat, Blob } from '@google/genai';
import { AppState } from './types';
import { createBlob } from './utils/audio';
import LectureSetup from './components/LectureSetup';
import LiveLectureView from './components/LiveLectureView';
import FinalSummary from './components/FinalSummary';
import Welcome from './components/Welcome';
import ContextPrompt from './components/ContextPrompt';
import About from './components/About';

type LiveSession = {
  sendRealtimeInput: (params: { media: Blob }) => void;
  close: () => void;
};

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.WELCOME);
  const [showAbout, setShowAbout] = useState(false);
  const [textbookContent, setTextbookContent] = useState<string>('');
  const [chapter, setChapter] = useState<string>('');
  const [liveTranscript, setLiveTranscript] = useState<string>('');
  const [liveSummary, setLiveSummary] = useState<string>('');
  const [finalSummary, setFinalSummary] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const liveSessionPromiseRef = useRef<Promise<LiveSession> | null>(null);
  const chatRef = useRef<Chat | null>(null);
  const microphoneStreamRef = useRef<MediaStream | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const scriptProcessorRef = useRef<ScriptProcessorNode | null>(null);
  const currentTurnTranscriptRef = useRef<string>('');

  const updateLiveSummary = useCallback(async (transcriptChunk: string) => {
    if (!chatRef.current) return;
    try {
      let newSummaryText = '';
      const stream = await chatRef.current.sendMessageStream({ message: transcriptChunk });
      for await (const chunk of stream) {
        newSummaryText += chunk.text;
        setLiveSummary(newSummaryText);
      }
    } catch (err) {
      console.error('Failed to update live summary:', err);
    }
  }, []);

  const handleStartRecording = useCallback(
    async (newTextbookContent: string = '', newChapter: string = '') => {
      setTextbookContent(newTextbookContent);
      setChapter(newChapter);
      setLiveTranscript('');
      setLiveSummary('');
      setFinalSummary('');
      setError(null);
      currentTurnTranscriptRef.current = '';

      if (!import.meta.env.VITE_API_KEY) {
        setError('API key is not configured. Please set VITE_API_KEY in your .env.local file.');
        setAppState(AppState.SETUP);
        return;
      }

      setAppState(AppState.RECORDING);

      try {
        const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_API_KEY });

        const systemInstruction =
          newTextbookContent && newChapter
            ? `You are a live summarizer for a university lecture. The student has provided the following textbook context for the chapter '${newChapter}': '${newTextbookContent}'. As you receive chunks of the lecture transcript, your task is to provide a continuously updated, concise summary of all key points discussed so far. Format the summary as a list of bullet points. Each time you respond, provide the complete, updated summary, not just a summary of the latest chunk.`
            : `You are a live summarizer for a university lecture. As you receive chunks of the lecture transcript, your task is to provide a continuously updated, concise summary of all key points discussed so far. Format the summary as a list of bullet points. Each time you respond, provide the complete, updated summary, not just a summary of the latest chunk.`;

        chatRef.current = ai.chats.create({
          model: 'gemini-2.5-flash',
          config: { systemInstruction },
        });

        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        microphoneStreamRef.current = stream;

        liveSessionPromiseRef.current = ai.live.connect({
          model: 'gemini-2.5-flash-native-audio-preview-09-2025',
          callbacks: {
            onopen: () => {
              console.log('Live session opened.');
              audioContextRef.current = new (window.AudioContext ||
                (window as any).webkitAudioContext)({ sampleRate: 16000 });
              const source = audioContextRef.current.createMediaStreamSource(stream);
              scriptProcessorRef.current = audioContextRef.current.createScriptProcessor(4096, 1, 1);

              scriptProcessorRef.current.onaudioprocess = (audioProcessingEvent) => {
                const inputData = audioProcessingEvent.inputBuffer.getChannelData(0);
                const pcmBlob = createBlob(inputData);
                liveSessionPromiseRef.current?.then((session) => {
                  session.sendRealtimeInput({ media: pcmBlob });
                });
              };

              source.connect(scriptProcessorRef.current);
              scriptProcessorRef.current.connect(audioContextRef.current.destination);
            },
            onmessage: (message: LiveServerMessage) => {
              if (message.serverContent?.inputTranscription) {
                const text = message.serverContent.inputTranscription.text;
                setLiveTranscript((prev) => prev + text);
                currentTurnTranscriptRef.current += text;
              }
              if (message.serverContent?.turnComplete) {
                const transcriptChunk = currentTurnTranscriptRef.current.trim();
                if (transcriptChunk) {
                  updateLiveSummary(transcriptChunk);
                }
                currentTurnTranscriptRef.current = '';
              }
            },
            onerror: (e: ErrorEvent) => {
              console.error('Live session error:', e);
              setError('An error occurred during the live session.');
              handleStopRecording(false);
            },
            onclose: () => {
              console.log('Live session closed.');
            },
          },
          config: {
            responseModalities: [Modality.AUDIO],
            inputAudioTranscription: {},
            systemInstruction: `You are a lecture transcription service. Transcribe the user's speech accurately.`,
          },
        });
      } catch (err) {
        console.error('Failed to start recording:', err);
        setError('Could not access microphone. Please check your permissions.');
        setAppState(AppState.CONTEXT_PROMPT);
      }
    },
    [updateLiveSummary]
  );

  const handleStopRecording = useCallback(
    async (shouldSummarize: boolean = true) => {
      liveSessionPromiseRef.current?.then((session) => session.close());
      liveSessionPromiseRef.current = null;

      if (microphoneStreamRef.current) {
        microphoneStreamRef.current.getTracks().forEach((track) => track.stop());
        microphoneStreamRef.current = null;
      }
      if (scriptProcessorRef.current) {
        scriptProcessorRef.current.disconnect();
        scriptProcessorRef.current = null;
      }
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        await audioContextRef.current.close();
        audioContextRef.current = null;
      }

      if (!shouldSummarize || !chatRef.current) {
        setAppState(AppState.WELCOME);
        return;
      }

      setAppState(AppState.SUMMARIZING);

      try {
        const finalPrompt = `The lecture has now concluded. Based on our conversation so far, please provide one final, comprehensive summary of the entire lecture.`;
        const result = await chatRef.current.sendMessage({ message: finalPrompt });

        setFinalSummary(result.text);
        setAppState(AppState.FINISHED);
      } catch (err) {
        console.error('Failed to generate final summary:', err);
        setError('Could not generate the final summary. Using last live summary as fallback.');
        setFinalSummary(liveSummary);
        setAppState(AppState.FINISHED);
      }
    },
    [liveSummary]
  );

  const handleReset = () => {
    setTextbookContent('');
    setChapter('');
    setLiveTranscript('');
    setLiveSummary('');
    setFinalSummary('');
    setError(null);
    currentTurnTranscriptRef.current = '';
    setAppState(AppState.WELCOME);
  };

  const renderContent = () => {
    if (showAbout) {
      return <About onBack={() => setShowAbout(false)} />;
    }

    switch (appState) {
      case AppState.WELCOME:
        return (
          <Welcome
            onStart={() => setAppState(AppState.CONTEXT_PROMPT)}
            onAbout={() => setShowAbout(true)}
          />
        );
      case AppState.CONTEXT_PROMPT:
        return (
          <ContextPrompt
            onAddContext={() => setAppState(AppState.SETUP)}
            onSkip={() => handleStartRecording()}
          />
        );
      case AppState.SETUP:
        return <LectureSetup onStart={handleStartRecording} error={error} />;
      case AppState.RECORDING:
        return (
          <LiveLectureView
            liveTranscript={liveTranscript}
            liveSummary={liveSummary}
            onStop={handleStopRecording}
          />
        );
      case AppState.SUMMARIZING:
        return (
          <div className="flex flex-col items-center justify-center min-h-[70vh]">
            <svg
              className="w-12 h-12 text-gray-300 animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="2"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 
                5.291A7.962 7.962 0 014 12H0c0 3.042 
                1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <p className="mt-6 text-sm font-light text-gray-400 tracking-wide">
              Finalizing your summary...
            </p>
          </div>
        );
      case AppState.FINISHED:
        return <FinalSummary summary={finalSummary} onReset={handleReset} />;
      default:
        return (
          <Welcome
            onStart={() => setAppState(AppState.CONTEXT_PROMPT)}
            onAbout={() => setShowAbout(true)}
          />
        );
    }
  };

  return <div className="min-h-screen bg-white">{renderContent()}</div>;
};

export default App;
