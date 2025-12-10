import React from 'react';
import { Volume2, VolumeX, Trash2 } from 'lucide-react';
import { Modal } from './Modal';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onResetProgress: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose, onResetProgress }) => {
  // Mock state for audio since we don't have real audio assets yet
  const [soundEnabled, setSoundEnabled] = React.useState(true);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="تنظیمات">
      <div className="space-y-4">
        <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white rounded-lg shadow-sm text-slate-600">
               {soundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
            </div>
            <span className="font-bold text-slate-700">صدای بازی</span>
          </div>
          <button 
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`w-12 h-6 rounded-full p-1 transition-colors ${soundEnabled ? 'bg-green-500' : 'bg-slate-300'}`}
          >
             <div className={`w-4 h-4 bg-white rounded-full shadow-sm transform transition-transform ${soundEnabled ? '-translate-x-6' : 'translate-x-0'}`} />
          </button>
        </div>

        <div className="border-t border-slate-200 my-4" />

        <button 
          onClick={() => {
            if(confirm('آیا مطمئن هستید؟ تمام پیشرفت شما پاک خواهد شد.')) {
              onResetProgress();
              onClose();
            }
          }}
          className="w-full p-4 bg-red-50 text-red-600 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-red-100 transition-colors"
        >
          <Trash2 size={20} />
          <span>حذف پیشرفت و شروع مجدد</span>
        </button>
      </div>
    </Modal>
  );
};
