
import React from 'react';
import { X, Lock } from 'lucide-react';
import { Modal } from './Modal';
import { CollectionItem } from '../types';
import { IconMapping } from './IconMapping';

interface CollectionBookProps {
  isOpen: boolean;
  onClose: () => void;
  items: CollectionItem[];
  totalSlots: number;
}

export const CollectionBook: React.FC<CollectionBookProps> = ({ isOpen, onClose, items, totalSlots }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="کتابچه سوغات">
      <div className="grid grid-cols-3 gap-3 p-2">
        {Array.from({ length: totalSlots }).map((_, idx) => {
           const item = items[idx];
           
           return (
             <div 
               key={idx}
               className={`
                 aspect-square rounded-2xl flex flex-col items-center justify-center p-2 border-2 transition-all
                 ${item 
                   ? 'bg-amber-50 border-amber-200 shadow-card-token' 
                   : 'bg-slate-100 border-slate-200 opacity-50 inner-shadow'
                 }
               `}
             >
               {item ? (
                 <>
                   <div className="w-10 h-10 mb-2 text-amber-600 drop-shadow-sm animate-pop">
                     <IconMapping name={item.icon} size={40} />
                   </div>
                   <span className="text-[10px] font-bold text-amber-900 text-center leading-tight">
                     {item.name}
                   </span>
                 </>
               ) : (
                 <Lock size={24} className="text-slate-300" />
               )}
             </div>
           );
        })}
      </div>
      
      <div className="mt-4 text-center">
         <span className="text-xs text-slate-500 font-bold">
           {items.length} از {totalSlots} سوغات جمع شده
         </span>
         <div className="w-full h-2 bg-slate-200 rounded-full mt-2 overflow-hidden">
            <div 
              className="h-full bg-amber-500 transition-all duration-1000" 
              style={{ width: `${(items.length / totalSlots) * 100}%` }} 
            />
         </div>
      </div>
    </Modal>
  );
};
