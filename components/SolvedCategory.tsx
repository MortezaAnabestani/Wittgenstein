import React from 'react';
import { Category } from '../types';

interface SolvedCategoryProps {
  category: Category;
}

export const SolvedCategoryLabel: React.FC<SolvedCategoryProps> = ({ category }) => {
  return (
    <div className={`absolute inset-0 flex flex-col items-center justify-center bg-black/5 rounded-xl z-10 animate-fade-in pointer-events-none`}>
       <div className={`bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg text-slate-900`}>
         <span className="font-bold text-sm md:text-base">{category.title}</span>
       </div>
    </div>
  );
};