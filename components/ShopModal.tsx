
import React from 'react';
import { ShoppingBag, Zap, Clock, Diamond } from 'lucide-react';
import { Modal } from './Modal';
import { ShopItem } from '../types';

interface ShopModalProps {
  isOpen: boolean;
  onClose: () => void;
  currency: number;
  onBuy: (item: ShopItem) => void;
}

const SHOP_ITEMS: ShopItem[] = [
  { id: 'hint_1', name: 'یک راهنما', cost: 50, icon: 'Zap', action: 'hint' },
  { id: 'time_30', name: '+۳۰ ثانیه', cost: 30, icon: 'Clock', action: 'time' },
  { id: 'hint_pack', name: '۳ راهنما', cost: 120, icon: 'Zap', action: 'hint' },
];

export const ShopModal: React.FC<ShopModalProps> = ({ isOpen, onClose, currency, onBuy }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="فروشگاه">
      <div className="flex flex-col gap-4">
        {/* Header Currency */}
        <div className="bg-slate-900 rounded-2xl p-4 flex items-center justify-between shadow-inner">
           <span className="text-slate-400 font-bold text-sm">موجودی شما:</span>
           <div className="flex items-center gap-2">
             <Diamond className="text-cyan-400 fill-cyan-400" size={20} />
             <span className="text-2xl font-black text-white tracking-widest">{currency}</span>
           </div>
        </div>

        <div className="grid grid-cols-1 gap-3">
          {SHOP_ITEMS.map((item) => {
            const canAfford = currency >= item.cost;
            return (
              <button
                key={item.id}
                onClick={() => {
                  if (canAfford) onBuy(item);
                }}
                disabled={!canAfford}
                className={`
                  relative flex items-center justify-between p-4 rounded-xl border-2 transition-all group
                  ${canAfford 
                    ? 'bg-white border-slate-100 hover:border-theme-dark/20 hover:shadow-lg active:scale-95' 
                    : 'bg-slate-50 border-slate-100 opacity-60 cursor-not-allowed grayscale'
                  }
                `}
              >
                <div className="flex items-center gap-4">
                   <div className={`
                     p-3 rounded-xl 
                     ${item.action === 'hint' ? 'bg-yellow-100 text-yellow-600' : 'bg-blue-100 text-blue-600'}
                   `}>
                      {item.action === 'hint' ? <Zap size={24} /> : <Clock size={24} />}
                   </div>
                   <div className="flex flex-col items-start">
                     <span className="font-bold text-slate-800 text-lg">{item.name}</span>
                     <span className="text-xs text-slate-400 font-bold">آیتم مصرفی</span>
                   </div>
                </div>

                <div className={`
                  flex items-center gap-1 px-3 py-1.5 rounded-full font-black text-sm
                  ${canAfford ? 'bg-cyan-50 text-cyan-600' : 'bg-slate-200 text-slate-500'}
                `}>
                   <span>{item.cost}</span>
                   <Diamond size={14} className={canAfford ? 'fill-cyan-600' : 'fill-slate-500'} />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </Modal>
  );
};
