import React from 'react';
import { Unit, Ability } from '../types';
import { ITEMS } from '../constants';
import { Shield, Sword, Zap, Heart, Footprints, Feather, ShoppingBag, RotateCcw } from 'lucide-react';

interface HUDProps {
  unit: Unit;
  gold: number;
  time: number;
  onCast: (ability: Ability) => void;
  onToggleShop: () => void;
  onRecall: () => void;
}

const HUD: React.FC<HUDProps> = ({ unit, gold, onCast, onToggleShop, onRecall }) => {
  const hpPercent = (unit.stats.hp / unit.stats.maxHp) * 100;
  const manaPercent = unit.stats.maxMana > 0 ? (unit.stats.mana / unit.stats.maxMana) * 100 : 0;

  const getIcon = (name: string, size = 16) => {
    const props = { size, className: "text-[#c8aa6e]" };
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

  return (
    <div className="absolute bottom-0 left-0 w-full pointer-events-none flex flex-col items-center pb-4 z-40">
      
      {/* Buffs / Status (Simplified) */}
      <div className="flex gap-2 mb-2">
        {unit.isDead && <span className="px-2 py-1 bg-red-900/80 text-white rounded text-xs">复活中 ({Math.ceil(unit.respawnTimer / 1000)}秒)</span>}
        {unit.isRecalling && <span className="px-2 py-1 bg-blue-900/80 text-white rounded text-xs animate-pulse">回城中...</span>}
      </div>

      {/* Main Control Panel */}
      <div className="pointer-events-auto bg-[#010a13] border-t-2 border-[#c8aa6e] px-8 py-4 flex items-end gap-6 shadow-2xl relative">
          
          {/* Avatar & Stats */}
          <div className="relative w-20 h-20 rounded-full border-2 border-[#c8aa6e] overflow-hidden bg-black shrink-0 hidden md:block">
              <img src={unit.avatarUrl} alt={unit.name} className="w-full h-full object-cover" />
              <div className="absolute bottom-0 right-0 bg-black/80 text-[#c8aa6e] text-xs px-1 rounded-tl">{unit.level}</div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-x-3 gap-y-1 w-32 text-xs text-gray-400 font-mono hidden md:grid select-none">
             {/* Attack Damage */}
             <div className="flex items-center gap-1 group relative cursor-help">
                 <Sword size={12} className="text-orange-500" />
                 <span className="text-orange-100">{Math.floor(unit.stats.ad)}</span>
                 <span className="absolute bottom-full left-0 bg-black border border-gray-600 px-1 hidden group-hover:block whitespace-nowrap z-50">攻击力</span>
             </div>
             {/* Ability Power */}
             <div className="flex items-center gap-1 group relative cursor-help">
                 <Zap size={12} className="text-blue-500" />
                 <span className="text-blue-100">{Math.floor(unit.stats.ap)}</span>
                 <span className="absolute bottom-full left-0 bg-black border border-gray-600 px-1 hidden group-hover:block whitespace-nowrap z-50">法术强度</span>
             </div>
             {/* Armor */}
             <div className="flex items-center gap-1 group relative cursor-help">
                 <Shield size={12} className="text-yellow-600" />
                 <span className="text-yellow-100">{Math.floor(unit.stats.armor)}</span>
                 <span className="absolute bottom-full left-0 bg-black border border-gray-600 px-1 hidden group-hover:block whitespace-nowrap z-50">护甲</span>
             </div>
             {/* Magic Resist */}
             <div className="flex items-center gap-1 group relative cursor-help">
                 <Shield size={12} className="text-purple-400" />
                 <span className="text-purple-100">{Math.floor(unit.stats.mr)}</span>
                 <span className="absolute bottom-full left-0 bg-black border border-gray-600 px-1 hidden group-hover:block whitespace-nowrap z-50">魔法抗性</span>
             </div>
             {/* Attack Speed */}
             <div className="flex items-center gap-1 group relative cursor-help">
                 <Feather size={12} className="text-yellow-200" />
                 <span className="text-gray-200">{unit.stats.attackSpeed.toFixed(2)}</span>
                 <span className="absolute bottom-full left-0 bg-black border border-gray-600 px-1 hidden group-hover:block whitespace-nowrap z-50">攻击速度</span>
             </div>
             {/* Move Speed */}
             <div className="flex items-center gap-1 group relative cursor-help">
                 <Footprints size={12} className="text-white" />
                 <span className="text-white">{Math.floor(unit.stats.moveSpeed)}</span>
                 <span className="absolute bottom-full left-0 bg-black border border-gray-600 px-1 hidden group-hover:block whitespace-nowrap z-50">移动速度</span>
             </div>
          </div>

          {/* Ability Bar */}
          <div className="flex gap-4 items-center">
              {unit.abilities.map((ability, idx) => {
                  const isOnCooldown = unit.cooldowns[ability.id] > performance.now();
                  const cooldownRemaining = isOnCooldown ? Math.ceil((unit.cooldowns[ability.id] - performance.now()) / 1000) : 0;

                  return (
                      <div key={ability.id} className="relative group flex flex-col items-center gap-1">
                          <button
                            onClick={() => onCast(ability)}
                            disabled={isOnCooldown || unit.isDead || unit.stats.mana < ability.cost || unit.isRecalling}
                            className={`w-14 h-14 bg-slate-900 border-2 ${isOnCooldown ? 'border-gray-700' : 'border-[#c8aa6e]'} rounded flex items-center justify-center relative overflow-hidden transition-transform active:scale-95 hover:brightness-110 disabled:opacity-50`}
                          >
                              {/* Icon Placeholder */}
                              <div className={`text-white ${isOnCooldown ? 'opacity-20' : 'opacity-100'}`}>
                                  {idx === 0 ? <Zap size={24} color={ability.color} /> : <Sword size={24} color={ability.color} />}
                              </div>
                              
                              {/* Key Bind */}
                              <div className="absolute top-0 right-1 text-[10px] font-bold text-gray-400">{ability.id.toUpperCase()}</div>
                              
                              {/* Cooldown Overlay */}
                              {isOnCooldown && (
                                  <div className="absolute inset-0 flex items-center justify-center bg-black/60 text-xl font-bold text-white">
                                      {cooldownRemaining}
                                  </div>
                              )}
                              
                              {/* Mana Cost */}
                              <div className="absolute bottom-0 right-0 text-[10px] bg-blue-900/80 px-1 text-blue-200">{ability.cost}</div>
                          </button>
                          
                          {/* Tooltip */}
                          <div className="absolute bottom-full mb-2 hidden group-hover:block w-48 bg-[#091428] border border-[#c8aa6e] p-2 text-xs z-50 shadow-lg">
                              <div className="font-bold text-[#c8aa6e]">{ability.name}</div>
                              <div className="text-gray-300">{ability.description}</div>
                          </div>
                      </div>
                  );
              })}
              
              {/* Recall Button */}
              <div className="relative group flex flex-col items-center gap-1 ml-2 border-l border-gray-700 pl-4">
                  <button 
                    onClick={onRecall}
                    disabled={unit.isDead || unit.isRecalling}
                    className="w-10 h-10 bg-slate-900 border border-blue-500 rounded flex items-center justify-center hover:bg-blue-900/50 transition-colors disabled:opacity-50"
                  >
                      <RotateCcw size={16} className="text-blue-400" />
                      <div className="absolute top-0 right-1 text-[9px] font-bold text-gray-400">B</div>
                  </button>
                  <div className="absolute bottom-full mb-2 hidden group-hover:block w-24 bg-[#091428] border border-blue-500 p-2 text-xs z-50 shadow-lg text-center">
                      回城 (B)
                  </div>
              </div>
          </div>

          {/* Center Info: HP/Mana Bars */}
          <div className="w-80 flex flex-col gap-1 pb-2">
              <div className="relative w-full h-5 bg-black border border-gray-700">
                  <div className="h-full bg-[#22c55e] transition-all duration-200" style={{ width: `${hpPercent}%` }} />
                  <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white shadow-black drop-shadow-md">
                      {Math.floor(unit.stats.hp)} / {unit.stats.maxHp}
                  </div>
              </div>
              {unit.stats.maxMana > 0 && (
                  <div className="relative w-full h-3 bg-black border border-gray-700">
                      <div className="h-full bg-[#3b82f6] transition-all duration-200" style={{ width: `${manaPercent}%` }} />
                       <div className="absolute inset-0 flex items-center justify-center text-[9px] font-bold text-white shadow-black drop-shadow-md">
                          {Math.floor(unit.stats.mana)} / {unit.stats.maxMana}
                      </div>
                  </div>
              )}
          </div>

           {/* Inventory & Gold */}
           <div className="flex flex-col items-end gap-2">
                {/* Inventory Slots */}
                <div className="grid grid-cols-3 gap-1">
                   {[...Array(6)].map((_, i) => {
                       const itemId = unit.items[i];
                       const itemData = itemId ? ITEMS.find(it => it.id === itemId) : null;
                       return (
                           <div key={i} className="w-8 h-8 bg-black border border-gray-700 flex items-center justify-center relative group">
                               {itemData && getIcon(itemData.icon)}
                               {itemData && (
                                   <div className="absolute bottom-full right-0 mb-2 hidden group-hover:block w-32 bg-[#091428] border border-[#c8aa6e] p-2 text-[10px] z-50 shadow-lg whitespace-nowrap">
                                        <div className="font-bold text-[#c8aa6e]">{itemData.name}</div>
                                        <div className="text-gray-400">{itemData.description}</div>
                                   </div>
                               )}
                           </div>
                       );
                   })}
                </div>

                {/* Gold and Shop Button */}
                <div className="flex items-center gap-2 text-[#c8aa6e]">
                    <div className="flex flex-col items-end font-bold">
                        <div className="text-lg leading-none">{gold}</div>
                        <div className="text-[10px] text-gray-500 uppercase">金币</div>
                    </div>
                    <button 
                        onClick={onToggleShop}
                        className="w-10 h-10 bg-[#1e2328] border border-[#c8aa6e] hover:bg-[#c8aa6e] hover:text-black flex items-center justify-center transition-colors shadow-lg active:scale-95"
                        title="打开商店"
                    >
                        <ShoppingBag size={20} />
                    </button>
                </div>
           </div>
      </div>
    </div>
  );
};

export default HUD;