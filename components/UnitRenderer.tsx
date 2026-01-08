import React from 'react';
import { Unit, UnitType, Team } from '../types';
import { COLORS } from '../constants';
import { Shield, Skull } from 'lucide-react';

interface UnitRendererProps {
  unit: Unit;
  isPlayerTarget: boolean;
}

const UnitRenderer: React.FC<UnitRendererProps> = ({ unit, isPlayerTarget }) => {
  const isOrder = unit.team === Team.ORDER;
  const hpPercent = (unit.stats.hp / unit.stats.maxHp) * 100;
  const manaPercent = unit.stats.maxMana > 0 ? (unit.stats.mana / unit.stats.maxMana) * 100 : 0;
  
  // Base Size calculation
  let size = 40;
  if (unit.type === UnitType.TURRET) size = 80;
  if (unit.type === UnitType.MINION) size = 20;
  if (unit.type === UnitType.NEXUS) size = 120;

  const color = isOrder ? COLORS.ORDER_HP : COLORS.CHAOS_HP;
  const ringColor = isPlayerTarget ? 'ring-4 ring-yellow-400' : '';

  return (
    <div
      className={`absolute flex flex-col items-center justify-center transition-transform duration-100 will-change-transform z-10 select-none ${ringColor} rounded-full`}
      style={{
        width: size,
        height: size,
        left: unit.position.x,
        top: unit.position.y,
        transform: 'translate(-50%, -50%)',
      }}
    >
      {/* Recall Aura */}
      {unit.isRecalling && (
        <div className="absolute inset-[-20px] rounded-full border-4 border-blue-400 animate-[spin_3s_linear_infinite] opacity-70">
          <div className="absolute inset-0 rounded-full border-t-4 border-white opacity-50"></div>
        </div>
      )}

      {/* Recall Timer Bar */}
      {unit.isRecalling && unit.recallTimer && (
         <div className="absolute -bottom-8 w-16 h-2 bg-black border border-blue-500 rounded">
             <div 
                className="h-full bg-blue-400 transition-all duration-100 ease-linear"
                style={{ width: `${(unit.recallTimer / 4000) * 100}%` }}
             />
         </div>
      )}

      {/* Unit Visual Body */}
      <div 
        className={`w-full h-full rounded-full border-2 overflow-hidden shadow-lg ${unit.isDead ? 'opacity-50 grayscale' : ''}`}
        style={{ borderColor: color, backgroundColor: '#000' }}
      >
        {unit.type === UnitType.CHAMPION && (
           <img src={unit.avatarUrl} alt={unit.name} className="w-full h-full object-cover" />
        )}
        {unit.type === UnitType.TURRET && (
           <div className="w-full h-full flex items-center justify-center bg-slate-800 text-slate-400">
             <Shield size={size/2} />
           </div>
        )}
        {unit.type === UnitType.MINION && (
           <div className={`w-full h-full ${isOrder ? 'bg-blue-800' : 'bg-red-800'}`}></div>
        )}
        {unit.type === UnitType.NEXUS && (
           <div className="w-full h-full flex items-center justify-center bg-slate-900 border-4 border-yellow-500 rounded-full animate-pulse">
             <div className={`w-1/2 h-1/2 rounded-full ${isOrder ? 'bg-blue-500' : 'bg-red-500'} shadow-[0_0_50px_currentColor]`} />
           </div>
        )}
      </div>

      {/* Health Bar (Floating above) */}
      {!unit.isDead && unit.type !== UnitType.NEXUS && (
        <div 
            className="absolute -top-6 w-[140%] h-3 bg-black border border-gray-700 pointer-events-none"
            style={{ width: unit.type === UnitType.MINION ? 30 : 80 }}
        >
            <div 
              className="h-full transition-all duration-200 ease-out"
              style={{ width: `${hpPercent}%`, backgroundColor: color }} 
            />
            {/* Mana Bar (Small line below HP) */}
            {unit.stats.maxMana > 0 && (
              <div 
                className="h-1 bg-blue-500 w-full mt-[1px]" 
                style={{ width: `${manaPercent}%` }}
              />
            )}
        </div>
      )}

      {/* Name Tag */}
      {unit.type === UnitType.CHAMPION && !unit.isDead && (
        <div className="absolute -top-10 whitespace-nowrap text-xs font-bold text-white bg-black/50 px-1 rounded shadow text-shadow-sm">
            {unit.name} <span className="text-yellow-400">Lv.{unit.level}</span>
        </div>
      )}

      {/* Dead Icon */}
      {unit.isDead && (
        <div className="absolute inset-0 flex items-center justify-center text-red-600">
            <Skull size={size * 0.8} />
        </div>
      )}
    </div>
  );
};

export default UnitRenderer;