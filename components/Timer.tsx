
import React from 'react';
import { Clock } from 'lucide-react';

interface TimerProps {
  seconds: number;
}

export const Timer: React.FC<TimerProps> = React.memo(({ seconds }) => {
  const formatTime = (totalSeconds: number) => {
    const m = Math.floor(totalSeconds / 60);
    const s = totalSeconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex items-center gap-1.5 text-white/80 bg-black/10 px-3 py-1.5 rounded-lg backdrop-blur-sm font-mono text-sm md:text-base">
      <Clock size={16} />
      <span>{formatTime(seconds)}</span>
    </div>
  );
});
