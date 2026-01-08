import React, { useState } from 'react';
import { CHAMPIONS } from '../constants';
import Button from './Button';
import { Shield, Sword, Zap, Target } from 'lucide-react';

interface LobbyProps {
  onStart: (championIndex: number) => void;
}

const Lobby: React.FC<LobbyProps> = ({ onStart }) => {
  const [selected, setSelected] = useState<number | null>(null);

  const getRoleIcon = (role?: string) => {
      switch(role) {
          case 'Fighter': return <Sword size={16} />;
          case 'Tank': return <Shield size={16} />;
          case 'Mage': return <Zap size={16} />;
          case 'Marksman': return <Target size={16} />;
          case 'Assassin': return <Sword size={16} className="text-red-500" />;
          default: return <Sword size={16} />;
      }
  };

  const getRoleName = (role?: string) => {
      switch(role) {
          case 'Fighter': return '战士';
          case 'Tank': return '坦克';
          case 'Mage': return '法师';
          case 'Marksman': return '射手';
          case 'Assassin': return '刺客';
          default: return role;
      }
  }

  return (
    <div className="min-h-screen bg-[#010a13] text-[#f0e6d2] flex flex-col items-center p-8 bg-[url('https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2670&auto=format&fit=crop')] bg-cover bg-center bg-no-repeat relative">
      {/* Overlay */}
      <div className="absolute inset-0 bg-[#010a13]/80 backdrop-blur-sm z-0"></div>

      <div className="relative z-10 w-full max-w-5xl flex flex-col gap-8 h-full">
          {/* Header */}
          <div className="text-center border-b border-[#c8aa6e]/30 pb-6">
              <h1 className="text-4xl font-bold text-[#c8aa6e] uppercase tracking-[0.2em] mb-2 font-serif">选择你的英雄</h1>
              <p className="text-gray-400">准备在迷你峡谷进行 2v2 对战</p>
          </div>

          {/* Main Content: Grid + Details */}
          <div className="flex-1 flex gap-8">
              
              {/* Grid */}
              <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-4 content-start">
                  {CHAMPIONS.map((champ, idx) => (
                      <div 
                        key={champ.name}
                        onClick={() => setSelected(idx)}
                        className={`
                            cursor-pointer group relative aspect-square border-2 transition-all duration-300
                            ${selected === idx ? 'border-[#c8aa6e] scale-105 shadow-[0_0_20px_#c8aa6e]' : 'border-gray-700 hover:border-[#0ac8b9]'}
                        `}
                      >
                          <img src={champ.avatarUrl} alt={champ.name} className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all" />
                          <div className="absolute bottom-0 w-full bg-black/70 p-2 text-center font-bold text-sm tracking-widest">
                              {champ.name?.toUpperCase()}
                          </div>
                      </div>
                  ))}
              </div>

              {/* Details Panel */}
              <div className="w-80 bg-[#091428]/90 border border-[#c8aa6e] p-6 flex flex-col gap-6 shadow-2xl">
                  {selected !== null ? (
                      <>
                        <div className="text-center">
                            <h2 className="text-3xl font-bold text-[#c8aa6e] font-serif">{CHAMPIONS[selected].name}</h2>
                            <div className="flex items-center justify-center gap-2 text-[#0ac8b9] text-sm mt-1 uppercase tracking-wider">
                                {getRoleIcon(CHAMPIONS[selected].role)}
                                <span>{getRoleName(CHAMPIONS[selected].role)}</span>
                            </div>
                        </div>

                        <div className="w-32 h-32 mx-auto border border-gray-600 rounded-full overflow-hidden">
                             <img src={CHAMPIONS[selected].avatarUrl} alt="" className="w-full h-full object-cover" />
                        </div>

                        <div className="space-y-4 text-sm">
                            <div className="bg-black/40 p-3 border border-gray-700">
                                <h3 className="text-[#c8aa6e] font-bold mb-1">{CHAMPIONS[selected].abilities?.[0].name} (Q)</h3>
                                <p className="text-gray-400 text-xs leading-relaxed">{CHAMPIONS[selected].abilities?.[0].description}</p>
                            </div>
                            <div className="bg-black/40 p-3 border border-gray-700">
                                <h3 className="text-[#c8aa6e] font-bold mb-1">{CHAMPIONS[selected].abilities?.[1].name} (R)</h3>
                                <p className="text-gray-400 text-xs leading-relaxed">{CHAMPIONS[selected].abilities?.[1].description}</p>
                            </div>
                        </div>

                        <div className="mt-auto">
                            <Button 
                                onClick={() => onStart(selected)}
                                className="w-full h-12 text-lg"
                            >
                                锁定
                            </Button>
                        </div>
                      </>
                  ) : (
                      <div className="flex items-center justify-center h-full text-gray-500 italic text-center">
                          选择一个英雄查看详情
                      </div>
                  )}
              </div>
          </div>
      </div>
    </div>
  );
};

export default Lobby;