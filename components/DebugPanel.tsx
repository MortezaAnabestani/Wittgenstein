
import React, { useState } from 'react';
import { Bug, Unlock, Trophy, SkipForward } from 'lucide-react';

interface DebugPanelProps {
  onWinLevel: () => void;
  onUnlockAll: () => void;
  onResetData: () => void;
}

export const DebugPanel: React.FC<DebugPanelProps> = ({ onWinLevel, onUnlockAll, onResetData }) => {
  const [isOpen, setIsOpen] = useState(false);

  // NOTE: process.env removed for browser compatibility without bundler config
  // if (process.env.NODE_ENV === 'production') return null;

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-2 left-2 z-[999] p-2 bg-black/20 text-white/30 rounded-full hover:bg-black/80 hover:text-white transition-all"
        title="Debug Menu"
      >
        <Bug size={16} />
      </button>
    );
  }

  return (
    <div className="fixed bottom-2 left-2 z-[999] bg-black/90 text-white p-3 rounded-xl shadow-2xl flex flex-col gap-2 text-xs font-mono animate-fade-in border border-white/10">
      <div className="flex items-center justify-between mb-2 pb-2 border-b border-white/20">
        <span className="font-bold text-yellow-400">DEV TOOLS</span>
        <button onClick={() => setIsOpen(false)} className="text-white/50 hover:text-white">✕</button>
      </div>
      
      <button onClick={onWinLevel} className="flex items-center gap-2 hover:text-green-400">
        <Trophy size={14} /> Win Level
      </button>
      
      <button onClick={onUnlockAll} className="flex items-center gap-2 hover:text-blue-400">
        <Unlock size={14} /> Unlock All Levels
      </button>
      
      <button onClick={onResetData} className="flex items-center gap-2 hover:text-red-400">
        <SkipForward size={14} /> Reset Data
      </button>
    </div>
  );
};
