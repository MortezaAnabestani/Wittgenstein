import React from 'react';

interface ProgressBarProps {
  total: number;
  solvedCount: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ total, solvedCount }) => {
  return (
    <div className="flex gap-1.5 bg-black/20 px-4 py-2.5 rounded-full backdrop-blur-md border border-white/10 shadow-lg">
      {Array.from({ length: total }).map((_, idx) => {
        const isSolved = idx < solvedCount;
        return (
          <div 
            key={idx}
            className={`
              w-2 h-2 md:w-2.5 md:h-2.5 rounded-full transition-all duration-700 ease-out
              ${isSolved 
                ? 'bg-gradient-to-tr from-green-400 to-emerald-300 shadow-[0_0_12px_rgba(52,211,153,0.8)] scale-125' 
                : 'bg-white/10 scale-100'
              }
            `}
          />
        );
      })}
    </div>
  );
};