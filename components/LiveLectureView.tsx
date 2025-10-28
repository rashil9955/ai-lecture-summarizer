import React from 'react';

interface LiveLectureViewProps {
  liveTranscript: string;
  liveSummary: string;
  onStop: () => void;
}

const LiveLectureView: React.FC<LiveLectureViewProps> = ({ liveTranscript, liveSummary, onStop }) => {
  return (
    <div className="min-h-[70vh] flex flex-col px-4 py-8 animate-fade-in">
      {/* Recording Indicator */}
      <div className="flex items-center justify-center mb-12">
        <div className="flex items-center gap-3">
          <div className="relative">
            <span className="absolute inline-flex h-3 w-3 rounded-full bg-red-400 opacity-75 animate-ping"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
          </div>
          <span className="text-sm font-light tracking-widest text-gray-400">
            RECORDING
          </span>
        </div>
      </div>

      {/* Content Grid */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Live Transcript */}
        <div className="flex flex-col">
          <h3 className="text-xs font-light tracking-widest text-gray-400 uppercase mb-4">
            Live Transcript
          </h3>
          <div className="flex-1 bg-gray-50 rounded-3xl p-8 overflow-y-auto min-h-[300px] border border-gray-100">
            <p className="text-base font-light text-gray-700 leading-relaxed whitespace-pre-wrap">
              {liveTranscript || (
                <span className="text-gray-300">Listening...</span>
              )}
            </p>
          </div>
        </div>

        {/* Live Summary */}
        <div className="flex flex-col">
          <h3 className="text-xs font-light tracking-widest text-gray-400 uppercase mb-4">
            Live Summary
          </h3>
          <div className="flex-1 bg-gray-50 rounded-3xl p-8 overflow-y-auto min-h-[300px] border border-gray-100">
            {liveSummary ? (
              <div 
                className="text-base font-light text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: liveSummary.replace(/\n/g, '<br />') }} 
              />
            ) : (
              <p className="text-gray-300 font-light">
                Waiting for content to summarize...
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Stop Button */}
      <div className="flex justify-center">
        <button
          onClick={onStop}
          className="group relative px-16 py-5 overflow-hidden bg-white border border-gray-900 rounded-full transition-all duration-300 hover:bg-gray-900"
        >
          <span className="relative text-sm font-light tracking-widest text-gray-900 group-hover:text-white transition-colors duration-300">
            STOP & FINALIZE
          </span>
        </button>
      </div>
    </div>
  );
};

export default LiveLectureView;
