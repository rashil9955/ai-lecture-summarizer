import React, { useState } from 'react';
import jsPDF from 'jspdf';

interface FinalSummaryProps {
  summary: string;
  onReset: () => void;
}

const FinalSummary: React.FC<FinalSummaryProps> = ({ summary, onReset }) => {
  const [copyButtonText, setCopyButtonText] = useState('Copy');

  const handleDownloadPDF = () => {
    const pdf = new jsPDF('p', 'mm', 'a4');
    const margin = 15;
    const pageWidth = pdf.internal.pageSize.getWidth() - margin * 2;
    const textLines = pdf.splitTextToSize(summary, pageWidth);

    pdf.setFontSize(12);
    pdf.text(textLines, margin, margin + 10);
    pdf.save('lecture-summary.pdf');
  };

  const handleDownloadTXT = () => {
    const blob = new Blob([summary], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'lecture-summary.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(summary).then(() => {
      setCopyButtonText('Copied');
      setTimeout(() => setCopyButtonText('Copy'), 2000);
    }).catch(err => {
      console.error('Failed to copy text: ', err);
      alert('Failed to copy text.');
    });
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Lecture Summary',
          text: summary,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      alert('Web Share API is not supported in your browser.');
    }
  };

  const IconButton: React.FC<{ 
    onClick: () => void;
    icon: React.ReactNode;
    label: string;
  }> = ({ onClick, icon, label }) => (
    <button
      onClick={onClick}
      className="group flex flex-col items-center gap-2 p-4 hover:bg-gray-50 rounded-2xl transition-colors"
      title={label}
    >
      <div className="w-12 h-12 flex items-center justify-center border border-gray-200 rounded-full group-hover:border-gray-900 transition-colors">
        {icon}
      </div>
      <span className="text-xs font-light tracking-wide text-gray-400 group-hover:text-gray-900 transition-colors">
        {label}
      </span>
    </button>
  );

  return (
    <div className="min-h-[70vh] flex flex-col px-4 py-8 animate-fade-in">
      <div className="text-center mb-12">
        <h2 className="text-5xl md:text-6xl font-extralight text-gray-900 mb-4 tracking-tight">
          Your Summary
        </h2>
        <p className="text-lg font-light text-gray-400">
          Ready to export and share
        </p>
      </div>

      {/* Summary Content */}
      <div className="flex-1 bg-gray-50 rounded-3xl p-12 mb-12 overflow-y-auto border border-gray-100">
        <div className="max-w-3xl mx-auto">
          <p className="text-base font-light text-gray-700 leading-relaxed whitespace-pre-wrap">
            {summary}
          </p>
        </div>
      </div>

      {/* Export Options */}
      <div className="mb-12">
        <div className="flex justify-center gap-2">
          <IconButton
            onClick={handleDownloadPDF}
            label="PDF"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            }
          />

          <IconButton
            onClick={handleDownloadTXT}
            label="Text"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            }
          />

          <IconButton
            onClick={handleCopy}
            label={copyButtonText}
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            }
          />

          {navigator.share && (
            <IconButton
              onClick={handleShare}
              label="Share"
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12s-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6.348l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
              }
            />
          )}
        </div>
      </div>

      {/* New Session Button */}
      <div className="flex justify-center">
        <button
          onClick={onReset}
          className="group relative px-16 py-5 overflow-hidden bg-white border border-gray-900 rounded-full transition-all duration-300 hover:bg-gray-900"
        >
          <span className="relative text-sm font-light tracking-widest text-gray-900 group-hover:text-white transition-colors duration-300">
            NEW SESSION
          </span>
        </button>
      </div>
    </div>
  );
};

export default FinalSummary;
