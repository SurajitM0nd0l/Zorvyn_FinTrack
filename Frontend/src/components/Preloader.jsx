import React, { useState, useEffect } from 'react';

const styleSheet = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@800;900&display=swap');

  @keyframes waterRise {
    0%   { clip-path: inset(100% 0% 0% 0%); }
    100% { clip-path: inset(0% 0% 0% 0%); }
  }

  @keyframes shimmerSlide {
    0%   { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }

  @keyframes bubbleRise {
    0%   { transform: translateY(0) scale(1); opacity: 0; }
    20%  { opacity: 0.6; }
    100% { transform: translateY(-120px) scale(0.3); opacity: 0; }
  }

  .ft-container {
    position: relative;
    display: inline-block;
    max-width: 100vw;
    text-align: center;
  }

  .ft-base {
    font-family: 'Syne', sans-serif;
    /* Reduced min size to 45px and scaling to 13vw to prevent clipping */
    font-size: clamp(45px, 13vw, 160px);
    font-weight: 900;
    color: #f1f5f9;
    letter-spacing: clamp(-1px, -0.5vw, -5px);
    line-height: 1;
    white-space: nowrap;
    display: block;
    animation: textWiggle 3s ease-in-out infinite;
  }

  .dark .ft-base {
    color: #1e293b;
  }

  .ft-water, .ft-shimmer {
    position: absolute;
    inset: 0;
    font-family: 'Syne', sans-serif;
    font-size: clamp(45px, 13vw, 160px);
    font-weight: 900;
    letter-spacing: clamp(-1px, -0.5vw, -5px);
    line-height: 1;
    white-space: nowrap;
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    pointer-events: none;
  }

  .ft-water {
    background-image: linear-gradient(to top,
      #1d4ed8 0%,
      #2563eb 40%,
      #60a5fa 100%
    );
    animation: waterRise 3.5s cubic-bezier(0.45, 0.05, 0.55, 0.95) forwards;
  }

  .ft-shimmer {
    background-image: linear-gradient(105deg,
      transparent 35%,
      rgba(255,255,255,0.4) 50%,
      transparent 65%
    );
    background-size: 200% 100%;
    animation: 
      waterRise 3.5s cubic-bezier(0.45, 0.05, 0.55, 0.95) forwards,
      shimmerSlide 2.5s ease-in-out infinite;
  }

  .ft-bubble {
    position: absolute;
    bottom: 20%;
    border-radius: 50%;
    background: rgba(96, 165, 250, 0.4);
    animation: bubbleRise var(--dur) ease-out var(--delay) infinite;
  }

  @keyframes textWiggle {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-2px); }
  }
`;

const BUBBLES = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  x: 5 + Math.random() * 90,
  size: 3 + Math.random() * 7,
  dur: (1.5 + Math.random() * 2).toFixed(2) + 's',
  delay: (Math.random() * 3).toFixed(2) + 's',
}));

const Preloader = () => {
  const [progress, setProgress] = useState(1);

  useEffect(() => {
    const id = setInterval(() => {
      setProgress(prev => (prev < 100 ? prev + 1 : 100));
    }, 30);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      <style>{styleSheet}</style>
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white dark:bg-slate-950 px-6 overflow-hidden">
        
        <div className="flex flex-col w-full max-w-fit items-center">
          {/* Main Title Section */}
          <div className="ft-container">
            <span className="ft-base">FinTrack</span>
            <span className="ft-water" aria-hidden="true">FinTrack</span>
            <span className="ft-shimmer" aria-hidden="true">FinTrack</span>

            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {BUBBLES.map(b => (
                <div
                  key={b.id}
                  className="ft-bubble"
                  style={{
                    left: `${b.x}%`,
                    width: `${b.size}px`,
                    height: `${b.size}px`,
                    '--dur': b.dur,
                    '--delay': b.delay,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Footer Info */}
          <div className="flex justify-end mt-2 sm:mt-0 w-full px-1">
            <div className="flex items-baseline gap-2 opacity-80">
              <span 
                className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-slate-400 dark:text-slate-600 font-bold"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                Initializing
              </span>
              <span 
                className="text-lg sm:text-2xl font-black text-blue-600 dark:text-blue-500 tabular-nums"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                {progress}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Preloader;