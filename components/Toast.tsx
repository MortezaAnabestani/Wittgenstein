import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info';

interface ToastProps {
  message: string;
  type?: ToastType;
  isVisible: boolean;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, type = 'info', isVisible, onClose }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  const bgColors = {
    success: 'bg-theme-dark text-white',
    error: 'bg-red-500 text-white',
    info: 'bg-white text-theme-dark'
  };

  const Icon = type === 'success' ? CheckCircle2 : type === 'error' ? AlertCircle : Info;

  return (
    <div className="fixed top-24 left-1/2 transform -translate-x-1/2 z-[70] animate-pop pointer-events-none">
      <div className={`flex items-center gap-2 px-6 py-3 rounded-full shadow-xl font-bold text-sm md:text-base ${bgColors[type]}`}>
        <Icon size={20} />
        <span>{message}</span>
      </div>
    </div>
  );
};