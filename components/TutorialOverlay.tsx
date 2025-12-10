
import React from 'react';
import { Hand } from 'lucide-react';

export const TutorialOverlay: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none z-50 flex items-center justify-center opacity-0 animate-fade-in delay-1000">
      <div className="relative w-full max-w-xs h-64">
         <div className="absolute top-1/2 left-1/4 animate-hand-swipe text-white drop-shadow-[0_0_10px_rgba(0,0,0,0.5)]">
            <Hand size={48} className="fill-white/20" />
         </div>
         <div className="absolute bottom-10 left-0 right-0 text-center">
            <span className="bg-black/60 text-white px-4 py-2 rounded-full backdrop-blur text-sm font-bold">
               بکشید و رها کنید
            </span>
         </div>
      </div>
    </div>
  );
};
