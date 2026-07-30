import React, { useEffect, useRef } from 'react';
import { GridMap, CarState, MapCell } from '../types';
import { MAP_DATA } from '../utils/maps';
import { CONSTANTS } from '../utils/constants';

export const MiniMap: React.FC<{mapIdx: number, carState: CarState}> = ({mapIdx, carState}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const map = MAP_DATA[mapIdx];

  useEffect(() => {
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;
    
    ctx.clearRect(0,0,150,112);
    const sx = 150 / (map.width * map.cellSize);
    const sy = 112 / (map.height * map.cellSize);

    // draw map layout
    for (let y = 0; y < map.height; y++) {
      for (let x = 0; x < map.width; x++) {
        if (map.cells[y][x] === MapCell.WALL) {
          ctx.fillStyle = CONSTANTS.COLORS.BORDER;
          ctx.fillRect(x * map.cellSize * sx, y * map.cellSize * sy, map.cellSize * sx, map.cellSize * sy);
        }
      }
    }

    ctx.fillStyle = 'red';
    ctx.beginPath();
    ctx.arc(carState.position.x * sx, carState.position.y * sy, 3, 0, Math.PI*2);
    ctx.fill();
  }, [carState, map]);

  return (
    <div className="hud-panel minimap">
      <canvas ref={canvasRef} width={150} height={112} />
    </div>
  );
};
