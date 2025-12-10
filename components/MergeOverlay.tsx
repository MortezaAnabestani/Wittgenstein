
import React, { useEffect, useState } from 'react';
import { IconMapping } from './IconMapping';

interface MergeOverlayProps {
  iconName: string;
  onComplete: () => void;
}

export const MergeOverlay: React.FC<MergeOverlayProps> = ({ iconName, onComplete }) => {
  const [stage, setStage] = useState<'implode' | 'explode' | 'fade'>('implode');

  useEffect(() => {
    // Sequence: Implode (1s) -> Explode (0.5s) -> Fade (0.5s) -> Done
    const t1 = setTimeout(() => setStage('explode'), 800);
    const t2 = setTimeout(() => setStage('fade'), 1400);
    const t3 = setTimeout(onComplete, 2000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center pointer-events-none">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in" />
      
      {stage === 'implode' && (
        <div className="relative w-64 h-64">
           {/* Imploding particles */}
           {Array.from({length: 12}).map((_, i) => (
             <div 
               key={i}
               className="absolute top-1/2 left-1/2 w-8 h-8 bg-yellow-400 rounded-full shadow-[0_0_20px_rgba(250,204,21,0.8)] animate-implode"
               style={{ 
                 animationDelay: `${i * 0.05}s`,
                 transform: `rotate(${i * 30}deg) translate(150px)` 
               }}
             />
           ))}
        </div>
      )}

      {(stage === 'explode' || stage === 'fade') && (
        <div className={`flex flex-col items-center animate-pop ${stage === 'fade' ? 'opacity-0 transition-opacity duration-500' : ''}`}>
           <div className="w-40 h-40 rounded-3xl bg-gradient-to-br from-yellow-300 to-amber-500 shadow-[0_0_100px_rgba(251,191,36,0.8)] flex items-center justify-center border-4 border-white animate-spin-slow ring-8 ring-yellow-400/50">
              <IconMapping name={iconName} size={80} className="text-white drop-shadow-lg" />
           </div>
           <h2 className="mt-8 text-4xl font-black text-white drop-shadow-xl tracking-wider">آیتم ساخته شد!</h2>
        </div>
      )}
    </div>
  );
};
