import React from 'react';
import { Lightbulb } from 'lucide-react';

interface HintButtonProps {
  onClick: () => void;
  disabled: boolean;
  remainingHints: number;
}

export const HintButton: React.FC<HintButtonProps> = ({ onClick, disabled, remainingHints }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled || remainingHints <= 0}
      className={`
        relative flex items-center gap-2 px-4 py-2 rounded-xl font-bold transition-all
        ${disabled || remainingHints <= 0
          ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
          : 'bg-white text-yellow-600 shadow-md hover:shadow-lg hover:bg-yellow-50 active:scale-95'
        }
      `}
    >
      <Lightbulb size={20} className={remainingHints > 0 && !disabled ? "fill-yellow-400 text-yellow-500" : ""} />
      <span>راهنما</span>
      <span className="bg-black/10 px-1.5 rounded text-xs ml-1">{remainingHints}</span>
    </button>
  );
};