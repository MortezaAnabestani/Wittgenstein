
import React, { useState } from 'react';
import { IconMapping } from './IconMapping';
import { audio } from '../services/audio';

interface TileProps {
  id: string;
  text: string;
  isSolved: boolean;
  isDragging: boolean;
  isHinting?: boolean; 
  colorClass?: string;
  onPointerDown: (e: React.PointerEvent, id: string) => void;
  isToken?: boolean;
  iconName?: string;
}

export const Tile: React.FC<TileProps> = ({ 
  id, 
  text, 
  isSolved, 
  isDragging, 
  isHinting,
  colorClass,
  onPointerDown,
  isToken,
  iconName
}) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isSolved || isDragging) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Increased tilt effect for premium feel
    const rotateX = ((y - centerY) / centerY) * -12; 
    const rotateY = ((x - centerX) / centerX) * 12;

    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const baseClasses = "relative w-full h-full rounded-lg md:rounded-xl flex flex-col items-center justify-center p-0.5 text-center leading-tight transition-all duration-300 select-none touch-none tile-content overflow-hidden cursor-pointer";
  const fontSize = isToken ? "text-xs font-black" : "text-[10px] md:text-sm font-bold tracking-tight";

  let stateClasses = "";
  
  if (isDragging) {
    stateClasses = "opacity-0"; // The drag preview handles the visual
  } else if (isSolved) {
    stateClasses = `${colorClass || 'bg-slate-200'} text-slate-900 shadow-card-solved scale-[0.98] border border-black/5 opacity-90 cursor-default`;
  } else if (isToken) {
    stateClasses = `
      bg-gradient-to-tr from-amber-200 via-yellow-400 to-amber-600
      text-amber-950
      border-[1px] border-white/40
      shadow-card-token
      z-20 animate-pop
      hover:brightness-110 hover:scale-[1.02]
    `;
  } else {
    // Premium Glass-like aesthetic for idle tiles
    stateClasses = `
      bg-tile-idle
      text-tile-text
      shadow-card
      border-b-[3px] border-r-[1px] border-l-[1px] border-tile-border
      hover:shadow-card-hover hover:-translate-y-0.5
      active:border-b-0 active:translate-y-[2px] active:shadow-none
      shadow-inner-light
      ${isHinting ? 'animate-shake ring-4 ring-yellow-400/50 z-20' : ''}
    `;
  }

  const handlePress = (e: React.PointerEvent) => {
    if (!isSolved) {
      audio.playPop(); 
      onPointerDown(e, id);
    }
  };

  const transformStyle = !isSolved && !isDragging && !isToken
    ? { transform: `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale3d(1, 1, 1)` }
    : {};

  return (
    <div
      onPointerDown={handlePress}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`${baseClasses} ${stateClasses} ${fontSize}`}
      role="button"
      data-tile-id={id}
      style={transformStyle}
    >
       {/* Noise Texture */}
       <div 
         className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-multiply"
         style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
       />

      {isToken && iconName && (
        <div className="mb-0.5 text-amber-950 drop-shadow-sm">
          <IconMapping name={iconName} size={24} />
        </div>
      )}
      
      <span className="pointer-events-none z-10 px-0.5 break-words w-full drop-shadow-sm">{text}</span>
      
      {/* Premium Shine */}
      {!isSolved && !isDragging && !isToken && (
        <div 
           className="absolute -inset-full top-0 block h-full w-full -skew-x-12 bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 group-hover:opacity-100 hover:animate-shimmer pointer-events-none" 
        />
      )}
      
      {isToken && (
         <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/50 to-transparent animate-pulse-glow pointer-events-none mix-blend-overlay" />
      )}
    </div>
  );
};
