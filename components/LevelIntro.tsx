
import React, { useEffect, useState } from 'react';
import { Sparkles } from 'lucide-react';

interface LevelIntroProps {
  levelTitle: string;
  description?: string;
  onComplete: () => void;
}

export const LevelIntro: React.FC<LevelIntroProps> = ({ levelTitle, description, onComplete }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onComplete, 800); // Wait for exit anim
    }, 2800);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className={`fixed inset-0 z-[200] flex flex-col items-center justify-center bg-black/90 backdrop-blur-xl transition-all duration-700 ${visible ? 'opacity-100' : 'opacity-0 pointer-events-none scale-110'}`}>
      
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
         <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500 rounded-full blur-[100px] animate-pulse-glow" />
         <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-500 rounded-full blur-[100px] animate-pulse-glow" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative z-10 flex flex-col items-center">
        <div className="mb-4 text-yellow-400 animate-pop">
           <Sparkles size={48} className="animate-spin-slow" />
        </div>

        <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-slate-400 mb-6 animate-slide-up drop-shadow-2xl text-center px-4 tracking-tight leading-tight">
          {levelTitle}
        </h1>
        
        <div className="w-24 h-1.5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mb-6 animate-width" />

        {description && (
          <p className="text-xl text-white/90 font-medium text-center animate-fade-in delay-300 max-w-md px-6 leading-relaxed">
            {description}
          </p>
        )}
      </div>

      <div className="absolute bottom-20 flex gap-3 opacity-50">
         <div className="w-2 h-2 bg-white rounded-full animate-bounce delay-0" />
         <div className="w-2 h-2 bg-white rounded-full animate-bounce delay-100" />
         <div className="w-2 h-2 bg-white rounded-full animate-bounce delay-200" />
      </div>
    </div>
  );
};
