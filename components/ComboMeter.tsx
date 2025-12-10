import React, { useEffect, useState } from 'react';
import { Flame } from 'lucide-react';

interface ComboMeterProps {
  combo: number;
}

export const ComboMeter: React.FC<ComboMeterProps> = ({ combo }) => {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    if (combo > 1) {
      setScale(1.5);
      const t = setTimeout(() => setScale(1), 300);
      return () => clearTimeout(t);
    }
  }, [combo]);

  if (combo < 2) return null;

  return (
    <div 
      className="absolute top-16 left-4 z-30 flex flex-col items-center animate-pop"
      style={{ transform: `scale(${scale})`, transition: 'transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)' }}
    >
      <div className="relative">
        <Flame 
          size={40} 
          className="text-orange-500 fill-orange-500 drop-shadow-[0_0_10px_rgba(249,115,22,0.6)] animate-pulse" 
        />
        <div className="absolute inset-0 flex items-center justify-center pt-2">
           <span className="text-white font-black text-sm">{combo}x</span>
        </div>
      </div>
      <span className="text-orange-400 font-bold text-xs shadow-black drop-shadow-sm">کمبو!</span>
    </div>
  );
};