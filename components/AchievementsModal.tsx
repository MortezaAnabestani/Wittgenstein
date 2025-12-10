
import React from 'react';
import { Medal } from 'lucide-react';
import { Modal } from './Modal';
import { Achievement } from '../types';

interface AchievementsModalProps {
  isOpen: boolean;
  onClose: () => void;
  achievements: Achievement[];
}

export const AchievementsModal: React.FC<AchievementsModalProps> = ({ isOpen, onClose, achievements }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="دستاوردها">
      <div className="grid grid-cols-1 gap-3">
        {achievements.map((ach) => (
          <div 
            key={ach.id} 
            className={`
              flex items-center gap-4 p-4 rounded-2xl border-2 transition-all
              ${ach.unlocked 
                ? 'bg-gradient-to-r from-amber-50 to-white border-amber-200' 
                : 'bg-slate-100 border-slate-200 opacity-60 grayscale'
              }
            `}
          >
            <div className={`
              w-12 h-12 rounded-full flex items-center justify-center shadow-sm
              ${ach.unlocked ? 'bg-amber-100 text-amber-600' : 'bg-slate-200 text-slate-400'}
            `}>
              <Medal size={24} />
            </div>
            
            <div className="flex flex-col">
               <span className={`font-black text-sm ${ach.unlocked ? 'text-slate-800' : 'text-slate-500'}`}>
                 {ach.title}
               </span>
               <span className="text-xs text-slate-500 font-medium">
                 {ach.description}
               </span>
            </div>
            
            {ach.unlocked && (
               <div className="mr-auto">
                 <span className="bg-amber-100 text-amber-700 text-[10px] px-2 py-1 rounded-full font-bold">باز شده</span>
               </div>
            )}
          </div>
        ))}
      </div>
    </Modal>
  );
};
