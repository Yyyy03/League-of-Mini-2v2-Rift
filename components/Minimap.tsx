import React from 'react';
import { Unit, UnitType, Team } from '../types';
import { COLORS } from '../constants';

interface MinimapProps {
  units: Unit[];
  cameraX: number;
  viewportWidth: number;
  viewportHeight: number;
  mapWidth: number;
  mapHeight: number;
}

const Minimap: React.FC<MinimapProps> = ({ 
  units, 
  cameraX, 
  viewportWidth, 
  viewportHeight, 
  mapWidth, 
  mapHeight 
}) => {
  // Minimap display constants
  const WIDTH = 250;
  const scale = WIDTH / mapWidth;
  const HEIGHT = mapHeight * scale;

  return (
    <div 
      className="absolute bottom-4 right-4 bg-[#010a13] border-2 border-[#c8aa6e] shadow-[0_0_20px_rgba(0,0,0,0.8)] overflow-hidden z-50 pointer-events-none select-none"
      style={{ width: WIDTH, height: HEIGHT }}
    >
      {/* Background Grid/Terrain hint */}
      <div className="absolute inset-0 bg-[#040c11]">
        {/* Mid Lane */}
        <div className="absolute top-1/2 left-0 w-full h-[2px] bg-[#1e282d] transform -translate-y-1/2" />
        
        {/* River (Vertical hint) */}
        <div className="absolute left-1/2 top-0 w-[2px] h-full bg-[#0a1428] transform -translate-x-1/2" />
        
        {/* Base Areas */}
        <div className="absolute left-0 top-0 bottom-0 w-[10%] bg-[#0c1829]/50 rounded-r-full" />
        <div className="absolute right-0 top-0 bottom-0 w-[10%] bg-[#1a0c0c]/50 rounded-l-full" />
      </div>

      {/* Units */}
      {units.map(unit => {
        if (unit.isDead && unit.type !== UnitType.NEXUS && unit.type !== UnitType.TURRET) return null;

        // Map coordinates to minimap
        const x = unit.position.x * scale;
        const y = unit.position.y * scale;

        const isOrder = unit.team === Team.ORDER;
        const color = isOrder ? COLORS.ORDER_HP : COLORS.CHAOS_HP;

        let size = 3;
        let zIndex = 10;
        let shape = 'rounded-full';
        let border = 'none';

        if (unit.type === UnitType.MINION) {
            size = 3;
            zIndex = 5;
        } else if (unit.type === UnitType.TURRET) {
            size = 6;
            shape = 'rounded-sm'; // Square towers
            zIndex = 15;
        } else if (unit.type === UnitType.NEXUS) {
            size = 10;
            shape = 'rotate-45 rounded-sm'; // Diamond nexus
            zIndex = 15;
            border = `2px solid ${color}`;
        } else if (unit.type === UnitType.CHAMPION) {
            size = 16;
            zIndex = 20;
            border = `2px solid ${color}`;
        }

        return (
          <div
            key={unit.id}
            className={`absolute ${shape} transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center`}
            style={{
              left: x,
              top: y,
              width: size,
              height: size,
              backgroundColor: unit.type === UnitType.CHAMPION ? '#000' : color,
              border: border,
              zIndex
            }}
          >
             {/* Champion Icon on Minimap */}
             {unit.type === UnitType.CHAMPION && (
                 <img 
                    src={unit.avatarUrl} 
                    className="w-full h-full rounded-full object-cover" 
                    alt="" 
                 />
             )}
          </div>
        );
      })}

      {/* Camera Viewport Frame */}
      <div 
        className="absolute border-2 border-white/80 shadow-[0_0_0_9999px_rgba(0,0,0,0.4)]"
        style={{
          left: cameraX * scale,
          top: 0, // Assuming camera Y is locked to top 0 for now
          width: viewportWidth * scale,
          height: viewportHeight * scale, // It might clip if viewport > map height
          maxWidth: WIDTH - (cameraX * scale), // Clamp visual
          maxHeight: HEIGHT
        }}
      />
    </div>
  );
};

export default Minimap;