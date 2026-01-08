import React, { useState } from 'react';
import { Item } from '../types';
import { ITEMS } from '../constants';
import Button from './Button';
import { Sword, Heart, Zap, Footprints, Shield, Feather, X } from 'lucide-react';

interface ItemShopProps {
  isOpen: boolean;
  onClose: () => void;
  playerGold: number;
  inventory: string[];
  onBuy: (item: Item) => void;
}

const ItemShop: React.FC<ItemShopProps> = ({ isOpen, onClose, playerGold, inventory, onBuy }) => {
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  if (!isOpen) return null;

  const selectedItem = selectedItemId ? ITEMS.find(i => i.id === selectedItemId) : null;
  const canAfford = selectedItem ? playerGold >= selectedItem.cost : false;
  const isInventoryFull = inventory.length >= 6;

  const getIcon = (name: string, size = 24) => {
    const props = { size };
    switch (name) {
      case 'Sword': return <Sword {...props} />;
      case 'Heart': return <Heart {...props} />;
      case 'Zap': return <Zap {...props} />;
      case 'Footprints': return <Footprints {...props} />;
      case 'Shield': return <Shield {...props} />;
      case 'Feather': return <Feather {...props} />;
      default: return <Sword {...props} />;
    }
  };

  const translateStat = (key: string) => {
      const map: Record<string, string> = {
          ad: '攻击力',
          ap: '法术强度',
          armor: '护甲',
          mr: '魔法抗性',
          moveSpeed: '移动速度',
          attackSpeed: '攻击速度',
          maxHp: '最大生命值',
          maxMana: '最大法力值',
          hp: '生命值',
          mana: '法力值'
      };
      return map[key] || key;
  };

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="w-full max-w-4xl h-[600px] bg-[#010a13] border-2 border-[#c8aa6e] flex flex-col shadow-[0_0_50px_rgba(0,0,0,0.8)] relative">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[#c8aa6e]/30 bg-[#091428]">
           <h2 className="text-2xl font-bold text-[#c8aa6e] uppercase tracking-widest">装备商店</h2>
           <div className="flex items-center gap-4">
               <div className="text-[#eab308] font-bold text-xl">{playerGold} <span className="text-xs text-gray-400">金币</span></div>
               <button onClick={onClose} className="text-gray-400 hover:text-white"><X size={32} /></button>
           </div>
        </div>

        {/* Content */}
        <div className="flex-1 flex overflow-hidden">
            {/* Item List */}
            <div className="flex-1 p-6 overflow-y-auto custom-scrollbar bg-[#050a10]">
                <h3 className="text-[#0ac8b9] font-bold mb-4 uppercase text-sm">推荐装备</h3>
                <div className="grid grid-cols-4 gap-4">
                    {ITEMS.map(item => (
                        <div 
                            key={item.id}
                            onClick={() => setSelectedItemId(item.id)}
                            className={`
                                relative aspect-square bg-[#091428] border-2 cursor-pointer transition-all group
                                ${selectedItemId === item.id ? 'border-[#eab308] bg-[#1e2328]' : 'border-[#3c3c41] hover:border-[#c8aa6e]'}
                            `}
                        >
                            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                                <div className={`${selectedItemId === item.id ? 'text-[#eab308]' : 'text-gray-500 group-hover:text-[#c8aa6e]'}`}>
                                    {getIcon(item.icon, 32)}
                                </div>
                                <div className="text-xs font-bold text-center px-1 truncate w-full text-gray-300">{item.name}</div>
                                <div className="text-[#eab308] text-xs">{item.cost}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Details Panel */}
            <div className="w-80 bg-[#091428] border-l border-[#c8aa6e]/30 p-6 flex flex-col gap-6">
                {selectedItem ? (
                    <>
                        <div className="text-center">
                            <div className="w-20 h-20 mx-auto bg-black border-2 border-[#eab308] flex items-center justify-center mb-4">
                                <div className="text-[#eab308]">
                                    {getIcon(selectedItem.icon, 40)}
                                </div>
                            </div>
                            <h3 className="text-xl font-bold text-[#c8aa6e]">{selectedItem.name}</h3>
                            <div className="text-[#eab308] font-bold mt-1">{selectedItem.cost} 金币</div>
                        </div>

                        <div className="bg-[#010a13] p-4 border border-[#3c3c41] text-sm">
                            <div className="text-[#0ac8b9] font-bold mb-2">属性</div>
                            <div className="space-y-1 text-gray-300">
                                {Object.entries(selectedItem.stats).map(([key, val]) => (
                                    <div key={key} className="flex justify-between uppercase text-xs">
                                        <span>{translateStat(key)}</span>
                                        <span className="text-white">+{val}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-4 pt-4 border-t border-[#3c3c41] text-gray-400 italic">
                                {selectedItem.description}
                            </div>
                        </div>

                        <div className="mt-auto">
                             <Button 
                                className="w-full h-12" 
                                disabled={!canAfford || isInventoryFull}
                                onClick={() => onBuy(selectedItem)}
                             >
                                 {isInventoryFull ? "装备栏已满" : canAfford ? "购买" : "金币不足"}
                             </Button>
                        </div>
                    </>
                ) : (
                    <div className="flex items-center justify-center h-full text-gray-500 italic text-center">
                        选择一件装备查看详情
                    </div>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};

export default ItemShop;