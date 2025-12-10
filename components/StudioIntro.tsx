
import React, { useEffect, useState } from 'react';
import { Gamepad2 } from 'lucide-react';

interface StudioIntroProps {
  onComplete: () => void;
}

export const StudioIntro: React.FC<StudioIntroProps> = ({ onComplete }) => {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    // Timeline of the intro
    const t1 = setTimeout(() => setStage(1), 500); // Reveal Text
    const t2 = setTimeout(() => setStage(2), 2500); // Fade Out
    const t3 = setTimeout(onComplete, 3500); // Remove component

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onComplete]);

  return (
    <div className={`fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center transition-opacity duration-1000 ${stage === 2 ? 'opacity-0' : 'opacity-100'}`}>
      <div className="relative flex flex-col items-center">
        
        {/* Logo Icon */}
        <div className={`mb-6 text-white transform transition-all duration-1000 ${stage >= 1 ? 'scale-100 opacity-100 translate-y-0' : 'scale-50 opacity-0 translate-y-10'}`}>
          <div className="w-20 h-20 bg-gradient-to-tr from-purple-600 to-blue-500 rounded-2xl flex items-center justify-center shadow-[0_0_40px_rgba(124,58,237,0.5)] rotate-3">
             <Gamepad2 size={48} className="text-white" />
          </div>
        </div>

        {/* Text Reveal */}
        <div className="overflow-hidden">
          <h1 className={`text-4xl md:text-6xl font-black text-white tracking-wider font-sans transition-transform duration-1000 ${stage >= 1 ? 'translate-y-0' : 'translate-y-full'}`}>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">CODABIAT</span> STUDIO
          </h1>
        </div>

        <div className="mt-4 overflow-hidden">
          <p className={`text-sm md:text-base text-gray-400 uppercase tracking-[0.5em] transition-transform duration-1000 delay-300 ${stage >= 1 ? 'translate-y-0' : '-translate-y-full'}`}>
            PRESENTS
          </p>
        </div>

        {/* Loading Bar */}
        <div className="absolute -bottom-20 w-32 h-1 bg-gray-800 rounded-full overflow-hidden">
           <div className={`h-full bg-white transition-all duration-[2000ms] ease-out ${stage >= 1 ? 'w-full' : 'w-0'}`} />
        </div>
      </div>
    </div>
  );
};
