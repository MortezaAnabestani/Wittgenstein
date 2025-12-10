import React from 'react';
import { Share2, RefreshCw, Check, Home } from 'lucide-react';
import { Category } from '../types';

interface ShareSheetProps {
  levelId: number;
  solvedCategories: Category[];
  moves: number;
  timeSeconds: number;
  onNextLevel?: () => void; // Optional, might go back to map
  onHome: () => void;
  onShare: () => void;
  isCopied: boolean;
  hasNextLevel: boolean;
}

const formatTime = (totalSeconds: number) => {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
};

export const ShareSheet: React.FC<ShareSheetProps> = ({
  levelId,
  solvedCategories,
  moves,
  timeSeconds,
  onNextLevel,
  onHome,
  onShare,
  isCopied,
  hasNextLevel
}) => {
  return (
    <div className="absolute inset-0 z-50 flex flex-col items-center justify-center p-4 animate-fade-in">
       <div className="absolute inset-0 bg-theme-dark/90 backdrop-blur-md" />
       
       <div className="relative bg-white w-full max-w-sm rounded-3xl shadow-2xl overflow-hidden animate-slide-up p-6 flex flex-col gap-5 text-center">
          
          <div className="space-y-1">
            <div className="text-5xl animate-bounce mb-2">🎉</div>
            <h2 className="text-2xl font-black text-slate-800">پیروزی!</h2>
            <p className="text-slate-500 font-bold">مرحله {levelId} کامل شد</p>
          </div>

          <div className="flex justify-center items-center gap-4 bg-slate-50 p-3 rounded-xl text-sm font-bold text-slate-600">
              <div className="flex flex-col">
                <span className="text-xs text-slate-400">زمان</span>
                <span>{formatTime(timeSeconds)}</span>
              </div>
              <div className="w-px h-8 bg-slate-200" />
              <div className="flex flex-col">
                <span className="text-xs text-slate-400">حرکات</span>
                <span>{moves}</span>
              </div>
          </div>

          <div className="grid grid-cols-2 gap-3 w-full mt-2">
            <button 
              onClick={onHome}
              className="col-span-1 bg-slate-100 text-slate-700 py-3 rounded-xl font-bold hover:bg-slate-200 transition-colors flex items-center justify-center gap-2"
            >
              <Home size={18} />
              خانه
            </button>
            
            <button 
              onClick={onShare}
              className={`col-span-1 py-3 rounded-xl font-bold border-2 transition-all flex items-center justify-center gap-2 ${
                isCopied 
                ? 'bg-green-50 border-green-200 text-green-700' 
                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {isCopied ? <Check size={18} /> : <Share2 size={18} />}
              {isCopied ? 'کپی شد' : 'اشتراک'}
            </button>

            {hasNextLevel && onNextLevel && (
              <button 
                onClick={onNextLevel}
                className="col-span-2 bg-theme-bg text-white py-4 rounded-xl font-black text-lg shadow-lg hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <RefreshCw size={20} />
                مرحله بعدی
              </button>
            )}
            {!hasNextLevel && (
               <div className="col-span-2 text-sm text-slate-400 font-bold py-2">
                 تمام مراحل تکمیل شد! 🌟
               </div>
            )}
          </div>
       </div>
    </div>
  );
};
