import React from 'react';

interface AboutProps {
  onBack: () => void;
}

const About: React.FC<AboutProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Minimal Navigation */}
      <nav className="w-full py-8 px-12">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button 
            onClick={onBack}
            className="text-sm font-light tracking-widest text-gray-600 hover:text-gray-900 transition-colors cursor-pointer"
          >
            ← BACK
          </button>
          <div className="flex gap-12 text-sm font-light">
            <button onClick={onBack} className="text-gray-600 hover:text-gray-900 transition-colors cursor-pointer">Home</button>
            <span className="text-gray-900">About</span>
            <a href="#" className="text-gray-400 hover:text-gray-900 transition-colors">Contact</a>
          </div>
        </div>
      </nav>

      {/* About Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 py-20">
        <div className="max-w-3xl">
          {/* Main Heading */}
          <div className="text-center mb-20">
            <h1 className="text-7xl md:text-8xl font-extralight tracking-tight text-gray-900 mb-8">
              About
            </h1>
            <div className="h-px w-32 bg-gray-200 mx-auto"></div>
          </div>

          {/* Story Section */}
          <div className="space-y-16 text-left">
            <div>
              <h2 className="text-2xl font-light text-gray-900 mb-6 tracking-tight">
                The Problem
              </h2>
              <p className="text-lg font-light text-gray-600 leading-relaxed">
                Lectures move fast. Too fast. Professors race through slides, explain key concepts 
                verbally, and move on before you can capture everything. By the time you finish 
                writing one concept, they're already three topics ahead. You're left with incomplete 
                notes, gaps in understanding, and hours of recordings you'll never have time to review.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-light text-gray-900 mb-6 tracking-tight">
                The Solution
              </h2>
              <p className="text-lg font-light text-gray-600 leading-relaxed">
                Lecture Summarizer AI captures everything in real-time. It transcribes your 
                professor's words, understands the context from your textbook, and generates 
                a clean, organized summary as the lecture unfolds. No more frantic note-taking. 
                No more hours spent rewatching recordings. Just clear, concise summaries you can 
                actually use for studying.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-light text-gray-900 mb-6 tracking-tight">
                Built by a Student, For Students
              </h2>
              <p className="text-lg font-light text-gray-600 leading-relaxed mb-4">
                Hi, I'm Rashil Shibakoti—a junior studying Computer Science and Data Science 
                at South Dakota State University. This project came from one of my toughest 
                semesters: working two jobs while juggling multiple CS projects and classes.
              </p>
              <p className="text-lg font-light text-gray-600 leading-relaxed">
                I'd record lectures but never had time to review them. I needed something that would 
                do the heavy lifting for me—listen, understand, and summarize automatically. So I 
                built it. My goal is simple: help students learn more effectively by turning long, 
                unstructured lectures into clear summaries they can actually use. Think of it as 
                your personal teaching assistant that never sleeps.
              </p>
            </div>

            <div className="pt-4">
              <h2 className="text-2xl font-light text-gray-900 mb-6 tracking-tight">
                How It Works
              </h2>
              <div className="space-y-4 text-base font-light text-gray-500">
                <div className="flex items-start gap-4">
                  <span className="text-gray-300 font-light">01</span>
                  <p>Upload your textbook content (optional but recommended for better context)</p>
                </div>
                <div className="flex items-start gap-4">
                  <span className="text-gray-300 font-light">02</span>
                  <p>Start recording during your lecture—works in-person or online</p>
                </div>
                <div className="flex items-start gap-4">
                  <span className="text-gray-300 font-light">03</span>
                  <p>Watch as AI generates a real-time summary of key points</p>
                </div>
                <div className="flex items-start gap-4">
                  <span className="text-gray-300 font-light">04</span>
                  <p>Export as PDF or text, share with classmates, or review anytime</p>
                </div>
              </div>
            </div>

            {/* Contact Section */}
            <div className="pt-8 border-t border-gray-100">
              <h2 className="text-2xl font-light text-gray-900 mb-6 tracking-tight">
                Connect
              </h2>
              <p className="text-base font-light text-gray-500 mb-6">
                Have questions, feedback, or just want to chat about the project?
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="https://www.linkedin.com/in/rashilshibakoti/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 px-8 py-3 border border-gray-200 rounded-full text-sm font-light text-gray-600 hover:border-gray-900 hover:text-gray-900 transition-all duration-300"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  LinkedIn
                </a>
                <a
                  href="https://github.com/rashil9955"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 px-8 py-3 border border-gray-200 rounded-full text-sm font-light text-gray-600 hover:border-gray-900 hover:text-gray-900 transition-all duration-300"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                  </svg>
                  GitHub
                </a>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-20 text-center">
            <button
              onClick={onBack}
              className="group relative px-16 py-5 overflow-hidden bg-white border border-gray-900 rounded-full transition-all duration-300 hover:bg-gray-900"
            >
              <span className="relative text-sm font-light tracking-widest text-gray-900 group-hover:text-white transition-colors duration-300">
                TRY IT NOW
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full py-8 text-center">
        <p className="text-xs font-light text-gray-300 tracking-widest">
          by rashil shibakoti
        </p>
      </footer>
    </div>
  );
};

export default About;