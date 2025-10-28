import React from 'react';

interface WelcomeProps {
    onStart: () => void;
    onAbout: () => void;

    
}

const Balloon: React.FC<{ 
  color: string;
  text: string;
  onClick: () => void;
  delay: string;
  disabled?: boolean;
}> = ({ color, text, onClick, delay, disabled }) => {
  const gradients = {
    pink: 'from-pink-100 to-pink-200',
    lavender: 'from-purple-100 to-purple-200',
  }[color] || 'from-gray-100 to-gray-200';

  return (
    <div 
      className="balloon-container group cursor-pointer"
      style={{ 
        animationDelay: delay,
        opacity: disabled ? 0.5 : 1,
        pointerEvents: disabled ? 'none' : 'auto'
      }}
      onClick={onClick}
    >
      <div className={`balloon bg-gradient-to-br ${gradients} relative`}>
        <div className="balloon-content">
          <span className="text-xl font-light tracking-wide text-gray-800">
            {text}
          </span>
        </div>
        {/* Balloon tie */}
        <div className="balloon-tie"></div>
      </div>
      {/* String */}
      <div className="balloon-string"></div>
    </div>
  );
};

const Welcome: React.FC<WelcomeProps> = ({ onStart, onAbout }) => {
  return (
    <>
      <style>{`
        .balloon-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          animation: gentle-float 6s ease-in-out infinite;
          transition: transform 0.3s ease;
        }

        .balloon-container:hover {
          animation-play-state: paused;
          transform: translateY(-20px);
        }

        .balloon {
          width: 200px;
          height: 240px;
          border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 
            0 10px 30px rgba(0, 0, 0, 0.08),
            inset -10px -10px 20px rgba(0, 0, 0, 0.05),
            inset 10px 10px 20px rgba(255, 255, 255, 0.5);
          position: relative;
          transition: all 0.4s ease;
        }

        .balloon-container:hover .balloon {
          box-shadow: 
            0 20px 50px rgba(0, 0, 0, 0.15),
            inset -10px -10px 20px rgba(0, 0, 0, 0.05),
            inset 10px 10px 20px rgba(255, 255, 255, 0.5);
        }

        .balloon-content {
          text-align: center;
          padding: 20px;
          z-index: 1;
        }

        .balloon-tie {
          position: absolute;
          bottom: -8px;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 0;
          border-left: 12px solid transparent;
          border-right: 12px solid transparent;
          border-top: 20px solid rgba(0, 0, 0, 0.1);
        }

        .balloon-string {
          width: 2px;
          height: 150px;
          background: linear-gradient(to bottom, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.1));
          margin-top: 5px;
        }

        @keyframes gentle-float {
          0%, 100% { 
            transform: translateY(0px) rotate(-2deg);
          }
          50% { 
            transform: translateY(-30px) rotate(2deg);
          }
        }
      `}</style>

      <div className="min-h-screen bg-white flex flex-col">
        {/* Minimal Navigation */}
        <nav className="w-full py-8 px-12">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="text-sm font-light tracking-widest text-gray-400">
              LECTURE AI
            </div>
            <div className="flex gap-12 text-sm font-light">
              <span className="text-gray-600">Home</span>
              <button 
                onClick={onAbout} 
                className="text-gray-400 hover:text-gray-900 transition-colors cursor-pointer"
              >
                About
              </button>
              
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="flex-1 flex flex-col items-center justify-center px-4 -mt-20">
          <div className="text-center mb-32">
            <h1 className="text-7xl md:text-8xl font-extralight tracking-tight text-gray-900 mb-6">
              Lecture
            </h1>
            <h1 className="text-7xl md:text-8xl font-extralight tracking-tight text-gray-900 mb-8">
              Summarizer
            </h1>
            <p className="text-lg font-light text-gray-400 tracking-wide">
              Transform your lectures into insights
            </p>
          </div>

          {/* Floating Balloons */}
          <div className="flex items-end gap-32 md:gap-48">
            <Balloon 
              color="pink" 
              text="Start Summarization" 
              onClick={onStart} 
              delay="0s" 
            />
            <Balloon 
              color="lavender" 
              text="Past Recordings" 
              onClick={() => alert('Coming soon!')} 
              delay="2s"
              disabled={true}
            />
          </div>
        </div>

        {/* Footer */}
        <footer className="w-full py-8 text-center">
          <p className="text-xs font-light text-gray-300 tracking-widest">
            by rashil shibakoti
          </p>
        </footer>
      </div>
    </>
  );
};

export default Welcome;