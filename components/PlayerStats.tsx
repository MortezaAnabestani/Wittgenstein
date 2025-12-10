
import React from 'react';
import { User, Trophy, Star } from 'lucide-react';
import { PlayerStats as IPlayerStats } from '../types';

interface PlayerStatsProps {
  stats: IPlayerStats;
}

export const PlayerStats: React.FC<PlayerStatsProps> = ({ stats }) => {
  const xpForNextLevel = stats.level * 1000;
  const progress = (stats.xp / xpForNextLevel) * 100;

  return (
    <div className="w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 flex items-center gap-4 mb-4 shadow-lg">
      <div className="w-14 h-14 bg-gradient-to-tr from-purple-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg border-2 border-white/20">
         <User className="text-white" size={24} />
      </div>
      
      <div className="flex-1">
         <div className="flex justify-between items-end mb-1">
            <span className="text-white font-bold text-lg">فیلسوف جوان</span>
            <span className="text-yellow-400 font-black text-xs uppercase tracking-widest">LEVEL {stats.level}</span>
         </div>
         
         <div className="w-full h-2 bg-black/40 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full transition-all duration-1000"
              style={{ width: `${progress}%` }}
            />
         </div>
         
         <div className="flex justify-between mt-1">
            <span className="text-white/40 text-[10px] font-mono">{stats.xp} / {xpForNextLevel} XP</span>
            <div className="flex items-center gap-1 text-white/60 text-[10px]">
               <Trophy size={10} />
               <span>{stats.totalWins} پیروزی</span>
            </div>
         </div>
      </div>
    </div>
  );
};
