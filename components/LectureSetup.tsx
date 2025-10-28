import React, { useState } from 'react';

interface LectureSetupProps {
  onStart: (textbookContent: string, chapter: string) => void;
  error: string | null;
}

const LectureSetup: React.FC<LectureSetupProps> = ({ onStart, error }) => {
  const [textbookContent, setTextbookContent] = useState('');
  const [chapter, setChapter] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (textbookContent.trim() && chapter.trim()) {
      setIsSubmitting(true);
      onStart(textbookContent, chapter);
    }
  };

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 animate-fade-in">
      <div className="w-full max-w-3xl">
        <div className="text-center mb-12">
          <h2 className="text-5xl md:text-6xl font-extralight text-gray-900 mb-6 tracking-tight">
            Lecture Context
          </h2>
          <p className="text-lg font-light text-gray-400 leading-relaxed">
            Paste your textbook content below
          </p>
        </div>

        {error && (
          <div className="mb-8 p-6 bg-red-50 border border-red-100 rounded-2xl">
            <p className="text-sm font-light text-red-600 text-center">
              {error}
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label htmlFor="chapter" className="block text-xs font-light text-gray-400 tracking-widest uppercase mb-3">
              Chapter / Topic
            </label>
            <input
              type="text"
              id="chapter"
              value={chapter}
              onChange={(e) => setChapter(e.target.value)}
              className="w-full px-6 py-4 bg-white border border-gray-200 rounded-2xl text-gray-900 font-light placeholder-gray-300 focus:outline-none focus:border-gray-400 transition-colors"
              placeholder="e.g., Photosynthesis"
              required
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label htmlFor="textbookContent" className="block text-xs font-light text-gray-400 tracking-widest uppercase mb-3">
              Textbook Content
            </label>
            <textarea
              id="textbookContent"
              value={textbookContent}
              onChange={(e) => setTextbookContent(e.target.value)}
              className="w-full h-64 px-6 py-4 bg-white border border-gray-200 rounded-2xl text-gray-900 font-light placeholder-gray-300 focus:outline-none focus:border-gray-400 transition-colors resize-none"
              placeholder="Paste relevant textbook section here..."
              required
              disabled={isSubmitting}
            />
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={!textbookContent.trim() || !chapter.trim() || isSubmitting}
              className="w-full group relative px-12 py-5 overflow-hidden bg-white border border-gray-900 rounded-full transition-all duration-300 hover:bg-gray-900 disabled:border-gray-200 disabled:cursor-not-allowed disabled:hover:bg-white"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-3 text-sm font-light tracking-widest text-gray-400">
                  <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  PREPARING
                </span>
              ) : (
                <span className="relative text-sm font-light tracking-widest text-gray-900 group-hover:text-white transition-colors duration-300 group-disabled:text-gray-300">
                  START RECORDING
                </span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LectureSetup;
