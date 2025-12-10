
import React from 'react';
import { FeedbackEvent } from '../types';

interface FeedbackTextProps {
  items: FeedbackEvent[];
}

export const FeedbackText: React.FC<FeedbackTextProps> = ({ items }) => {
  return (
    <div className="fixed inset-0 pointer-events-none z-[200] overflow-hidden">
      {items.map((item) => (
        <div
          key={item.id}
          className="absolute font-black text-xl md:text-2xl animate-float-up drop-shadow-md whitespace-nowrap"
          style={{
            left: item.x,
            top: item.y,
            color: item.color || '#fbbf24', // Default Gold
            textShadow: '0 2px 0 rgba(0,0,0,0.1)'
          }}
        >
          {item.text}
        </div>
      ))}
    </div>
  );
};
