
import React from 'react';
import { Diamond } from 'lucide-react';

interface CurrencyDisplayProps {
  amount: number;
}

export const CurrencyDisplay: React.FC<CurrencyDisplayProps> = ({ amount }) => {
  return (
    <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 shadow-lg animate-fade-in hover:scale-105 transition-transform cursor-pointer group">
      <div className="relative">
        <Diamond size={18} className="text-cyan-400 fill-cyan-400/20 group-hover:animate-spin-slow" />
        <div className="absolute inset-0 bg-cyan-400 blur-sm opacity-50" />
      </div>
      <span className="font-mono font-bold text-white text-sm md:text-base drop-shadow-sm">
        {amount.toLocaleString()}
      </span>
      {/* Plus animation indicator could go here */}
    </div>
  );
};
