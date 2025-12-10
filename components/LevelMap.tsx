
import React from 'react';
import { MapPin, Lock, Star } from 'lucide-react';
import { LEVELS } from '../data/levels';
import { audio } from '../services/audio';

interface LevelMapProps {
  currentLevelId: number;
  onSelectLevel: (id: number) => void;
  completedLevels: number[];
}

export const LevelMap: React.FC<LevelMapProps> = ({ currentLevelId, onSelectLevel, completedLevels }) => {
  const maxCompleted = Array.isArray(completedLevels) && completedLevels.length > 0 
    ? Math.max(...completedLevels) 
    : 0;

  const handleSelect = (id: number) => {
    audio.playSuccess();
    onSelectLevel(id);
  };

  return (
    <div className="relative w-full h-full flex flex-col items-center overflow-hidden bg-slate-900/50 rounded-3xl border border-white/5 shadow-inner">
      
      {/* Abstract Map Background (Stylized Iran Shape) */}
      <svg className="absolute inset-0 w-full h-full opacity-10 pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
         <defs>
           <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
             <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5"/>
           </pattern>
         </defs>
         <rect width="100" height="100" fill="url(#grid)" />
         
         {/* Simple polygonal representation roughly resembling Iran's shape */}
         <path 
           d="M 10 10 L 40 5 L 80 10 L 95 40 L 90 80 L 60 95 L 30 90 L 5 60 Z"
           fill="white"
           opacity="0.1"
         />
      </svg>

      {/* Connection Paths */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
        {LEVELS.map((level, index) => {
          if (index === LEVELS.length - 1) return null;
          const nextLevel = LEVELS[index + 1];
          const isUnlocked = completedLevels.includes(level.id);
          
          return (
            <line
              key={`path-${level.id}`}
              x1={`${level.mapCoordinates?.x}%`}
              y1={`${level.mapCoordinates?.y}%`}
              x2={`${nextLevel.mapCoordinates?.x}%`}
              y2={`${nextLevel.mapCoordinates?.y}%`}
              stroke={isUnlocked ? "#fbbf24" : "#4b5563"}
              strokeWidth="3"
              strokeDasharray={isUnlocked ? "0" : "5,5"}
              className={isUnlocked ? "animate-dash" : ""}
            />
          );
        })}
      </svg>

      {/* Cities (Nodes) */}
      {LEVELS.map((level) => {
        const isLocked = level.id > (maxCompleted + 1) && level.id !== 1;
        const isCompleted = completedLevels.includes(level.id);
        const isCurrent = !isLocked && !isCompleted;

        return (
          <button
            key={level.id}
            onClick={() => !isLocked && handleSelect(level.id)}
            disabled={isLocked}
            className={`
              absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group
              transition-all duration-500
            `}
            style={{
              left: `${level.mapCoordinates?.x}%`,
              top: `${level.mapCoordinates?.y}%`
            }}
          >
            {/* Ping effect for current level */}
            {isCurrent && (
              <div className="absolute w-16 h-16 bg-amber-400/30 rounded-full animate-ping" />
            )}

            {/* Node Circle */}
            <div className={`
               w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center border-4 shadow-xl z-10
               transition-transform duration-300 group-hover:scale-110
               ${isLocked 
                 ? 'bg-slate-800 border-slate-600 text-slate-500' 
                 : isCompleted 
                   ? 'bg-emerald-500 border-emerald-300 text-white shadow-emerald-500/50' 
                   : 'bg-amber-500 border-amber-300 text-white animate-pulse-glow'
               }
            `}>
               {isLocked ? <Lock size={20} /> : isCompleted ? <Star size={24} fill="white" /> : <MapPin size={24} fill="white" />}
            </div>

            {/* Label */}
            <div className={`
               mt-2 px-3 py-1 rounded-full text-xs md:text-sm font-black whitespace-nowrap backdrop-blur-md border shadow-lg z-20
               ${isLocked 
                 ? 'bg-black/40 text-slate-400 border-slate-700' 
                 : 'bg-white text-slate-900 border-white/50 transform -translate-y-1'
               }
            `}>
              {level.title.split(':')[0]}
            </div>
          </button>
        );
      })}
    </div>
  );
};
