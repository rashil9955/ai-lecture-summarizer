import React from 'react';

interface ContextPromptProps {
  onAddContext: () => void;
  onSkip: () => void;
}

const ContextPrompt: React.FC<ContextPromptProps> = ({ onAddContext, onSkip }) => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 animate-fade-in">
      <div className="max-w-2xl text-center">
        <h2 className="text-5xl md:text-6xl font-extralight text-gray-900 mb-8 tracking-tight">
          Add Context?
        </h2>
        
        <p className="text-lg font-light text-gray-400 mb-16 leading-relaxed">
          Upload textbook chapters or materials to enhance<br />
          your summary. Or let the AI handle it solo.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <button
            onClick={onAddContext}
            className="group relative px-12 py-4 overflow-hidden bg-white border border-gray-900 rounded-full transition-all duration-300 hover:bg-gray-900"
          >
            <span className="relative text-sm font-light tracking-widest text-gray-900 group-hover:text-white transition-colors duration-300">
              ADD CONTEXT
            </span>
          </button>

          <button
            onClick={onSkip}
            className="px-12 py-4 text-sm font-light tracking-widest text-gray-400 hover:text-gray-900 transition-colors duration-300"
          >
            SKIP
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContextPrompt;
