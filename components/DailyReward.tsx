
import React, { useEffect, useState } from 'react';
import { Gift, Check } from 'lucide-react';
import { Modal } from './Modal';
import { storage } from '../services/storage';
import { DailyRewardState } from '../types';

interface DailyRewardProps {
  onClaim: (amount: number) => void;
}

const REWARDS = [50, 100, 150, 200, 250, 300, 500];

export const DailyReward: React.FC<DailyRewardProps> = ({ onClaim }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [state, setState] = useState<DailyRewardState>({ lastClaimDate: '', streak: 0 });

  useEffect(() => {
    const saved = storage.getItem('persian_connections_daily');
    if (saved) {
      try { setState(JSON.parse(saved)); } catch(e) {}
    }
  }, []);

  useEffect(() => {
    // Check if eligible
    const today = new Date().toDateString();
    if (state.lastClaimDate !== today) {
       setIsOpen(true);
    }
  }, [state.lastClaimDate]);

  const handleClaim = () => {
    const today = new Date().toDateString();
    
    // Check if streak is broken (more than 1 day passed)
    let newStreak = state.streak;
    const lastDate = new Date(state.lastClaimDate);
    const diffTime = Math.abs(new Date().getTime() - lastDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    
    if (state.lastClaimDate && diffDays > 1) {
       newStreak = 0; // Reset streak
    }

    const rewardAmount = REWARDS[newStreak % REWARDS.length];
    
    const newState = {
      lastClaimDate: today,
      streak: newStreak + 1
    };
    
    setState(newState);
    storage.setItem('persian_connections_daily', JSON.stringify(newState));
    onClaim(rewardAmount);
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={() => {}} title="پاداش روزانه">
      <div className="flex flex-col items-center gap-6">
         <div className="w-24 h-24 bg-gradient-to-tr from-cyan-400 to-blue-500 rounded-full flex items-center justify-center shadow-lg animate-bounce">
            <Gift size={48} className="text-white" />
         </div>
         
         <div className="text-center">
            <h3 className="text-xl font-black text-slate-800">خوش آمدید!</h3>
            <p className="text-slate-500 font-bold mt-1">پاداش امروز شما آماده است.</p>
         </div>

         <div className="flex gap-2 w-full overflow-x-auto p-2 no-scrollbar">
           {REWARDS.map((amount, idx) => {
             const currentDay = state.streak % REWARDS.length;
             const isToday = idx === currentDay;
             const isPast = idx < currentDay;
             
             return (
               <div 
                 key={idx}
                 className={`
                   flex-shrink-0 w-16 h-20 rounded-xl flex flex-col items-center justify-center gap-1 border-2
                   ${isToday ? 'border-cyan-400 bg-cyan-50 scale-110 shadow-lg' : 'border-slate-100 bg-white opacity-60'}
                   ${isPast ? 'bg-slate-100 grayscale' : ''}
                 `}
               >
                 <span className="text-xs font-bold text-slate-400">روز {idx + 1}</span>
                 {isPast ? <Check size={16} className="text-green-500" /> : <span className="font-black text-slate-800">{amount}</span>}
               </div>
             );
           })}
         </div>

         <button 
           onClick={handleClaim}
           className="w-full bg-cyan-500 text-white py-4 rounded-2xl font-black text-lg shadow-lg hover:bg-cyan-600 active:scale-95 transition-all"
         >
           دریافت پاداش
         </button>
      </div>
    </Modal>
  );
};
