import React from 'react';
import { Category } from '../types';
import { IconMapping } from './IconMapping';

interface VisualSolvedRowProps {
  category: Category;
}

export const VisualSolvedRow: React.FC<VisualSolvedRowProps> = ({ category }) => {
  return (
    <div className={`
      col-span-6 w-full h-16 md:h-20 rounded-xl md:rounded-2xl 
      flex items-center justify-between px-6 md:px-10
      ${category.color} shadow-inner animate-pop relative overflow-hidden group
    `}>
      {/* Background decoration */}
      <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="absolute -right-10 -bottom-10 opacity-20 transform rotate-12 scale-150 text-black/20">
         {category.icon && <IconMapping name={category.icon} size={120} />}
      </div>

      {/* Content */}
      <div className="flex items-center gap-4 z-10">
        <div className="bg-white/90 p-2.5 rounded-full shadow-lg transform group-hover:scale-110 transition-transform duration-300">
           {category.icon && <IconMapping name={category.icon} size={28} className="text-slate-800" />}
        </div>
        <div className="flex flex-col">
          <span className="text-xs font-bold opacity-70 text-slate-900 uppercase tracking-widest">تکمیل شد</span>
          <span className="text-xl md:text-2xl font-black text-slate-900">{category.title}</span>
        </div>
      </div>
      
      {/* Words preview (optional, small) */}
      <div className="hidden md:flex gap-1 opacity-60">
        {category.words.slice(0, 3).map((w, i) => (
          <span key={i} className="text-[10px] bg-black/5 px-1.5 py-0.5 rounded text-slate-800 font-bold">{w}</span>
        ))}
        <span>...</span>
      </div>
    </div>
  );
};