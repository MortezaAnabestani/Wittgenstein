
import React from 'react';
import { Play, RotateCcw, Home, Settings } from 'lucide-react';

interface PauseMenuProps {
  isOpen: boolean;
  onResume: () => void;
  onRestart: () => void;
  onExit: () => void;
  onSettings: () => void;
}

export const PauseMenu: React.FC<PauseMenuProps> = ({ isOpen, onResume, onRestart, onExit, onSettings }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center animate-fade-in">
      <div className="absolute inset-0 bg-theme-dark/90 backdrop-blur-md" onClick={onResume} />
      
      <div className="relative bg-white w-full max-w-sm rounded-3xl p-8 flex flex-col gap-6 items-center shadow-2xl animate-scale-bounce">
         <h2 className="text-3xl font-black text-theme-dark tracking-tight">توقف بازی</h2>
         
         <div className="flex flex-col w-full gap-3">
            <button 
              onClick={onResume}
              className="w-full bg-theme-dark text-white py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 shadow-lg hover:scale-[1.02] transition-transform"
            >
               <Play size={24} fill="currentColor" />
               ادامه بازی
            </button>

            <button 
              onClick={onRestart}
              className="w-full bg-slate-100 text-slate-700 py-3.5 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-slate-200 transition-colors"
            >
               <RotateCcw size={20} />
               شروع مجدد
            </button>

             <div className="grid grid-cols-2 gap-3 w-full">
                <button 
                  onClick={onSettings}
                  className="bg-slate-50 text-slate-600 py-3 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-100 transition-colors"
                >
                  <Settings size={18} />
                  تنظیمات
                </button>
                <button 
                  onClick={onExit}
                  className="bg-red-50 text-red-500 py-3 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-red-100 transition-colors"
                >
                  <Home size={18} />
                  خروج
                </button>
             </div>
         </div>
      </div>
    </div>
  );
};
