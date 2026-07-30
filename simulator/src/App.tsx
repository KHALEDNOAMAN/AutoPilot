import React, { useRef, useEffect, useState, useMemo } from 'react';
import { CarPhysics } from './engine/CarPhysics';
import { AutopilotController } from './engine/AutopilotController';
import { SensorSystem } from './engine/SensorSystem';
import { MAP_DATA } from './utils/maps';
import { CONSTANTS } from './utils/constants';
import { GameConfig, CarState, SensorReading, MapCell } from './types';
import { Dashboard } from './components/Dashboard';
import { InfoPanel } from './components/InfoPanel';
import { ControlsHelp } from './components/ControlsHelp';
import { MiniMap } from './components/MiniMap';

const keys: Record<string, boolean> = {};
window.addEventListener('keydown', e => { keys[e.key.toLowerCase()] = true; });
window.addEventListener('keyup', e => { keys[e.key.toLowerCase()] = false; });

export default function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const [config, setConfig] = useState<GameConfig>({
    autopilot: false, showSensors: true, showPath: true, showMiniMap: true, currentMap: 0
  });

  const map = useMemo(() => MAP_DATA[config.currentMap], [config.currentMap]);
  
  const physics = useRef(new CarPhysics({x: map.start.x * map.cellSize + map.cellSize/2, y: map.start.y * map.cellSize + map.cellSize/2}, 0));
  const autopilot = useRef(new AutopilotController());
  const sensors = useRef(new SensorSystem());

  const [carState, setCarState] = useState<CarState>(physics.current.state);
  const [sensorData, setSensorData] = useState<SensorReading>({front:0,left:0,right:0,frontLeft:0,frontRight:0});

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Tab') { e.preventDefault(); setConfig(c => ({...c, autopilot: !c.autopilot})); }
      if (e.key === '1') setConfig(c => ({...c, currentMap: 0}));
      if (e.key === '2') setConfig(c => ({...c, currentMap: 1}));
      if (e.key === '3') setConfig(c => ({...c, currentMap: 2}));
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  useEffect(() => {
    physics.current.reset({x: map.start.x * map.cellSize + map.cellSize/2, y: map.start.y * map.cellSize + map.cellSize/2}, 0);
    autopilot.current.path = [];
  }, [map]);

  useEffect(() => {
    let lastTime = performance.now();
    let frameId = 0;
    
    const loop = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      let throttle = 0, steer = 0, brake = 0;

      if (config.autopilot) {
        const cmds = autopilot.current.update(physics.current.state, map);
        throttle = cmds.throttle; steer = cmds.steering; brake = cmds.brake;
      } else {
        if (keys['w'] || keys['arrowup']) throttle = 1;
        if (keys['s'] || keys['arrowdown']) brake = 1;
        if (keys['a'] || keys['arrowleft']) steer = -CONSTANTS.MAX_STEERING;
        if (keys['d'] || keys['arrowright']) steer = CONSTANTS.MAX_STEERING;
      }

      physics.current.update(dt, throttle, steer, brake);
      const s = sensors.current.getSensorReadings(physics.current.state, map);
      
      setCarState({...physics.current.state});
      setSensorData(s);

      const ctx = canvasRef.current?.getContext('2d');
      if (ctx && canvasRef.current) {
        ctx.fillStyle = CONSTANTS.COLORS.BACKGROUND;
        ctx.fillRect(0,0, canvasRef.current.width, canvasRef.current.height);
        
        // draw map
        for(let y=0; y<map.height; y++){
          for(let x=0; x<map.width; x++){
            const cell = map.cells[y][x];
            if (cell === MapCell.WALL) ctx.fillStyle = CONSTANTS.COLORS.BORDER;
            else if (cell === MapCell.GRASS) ctx.fillStyle = CONSTANTS.COLORS.GRASS;
            else if (cell === MapCell.ROAD) ctx.fillStyle = CONSTANTS.COLORS.ROAD;
            else if (cell === MapCell.START || cell === MapCell.GOAL) ctx.fillStyle = CONSTANTS.COLORS.SECONDARY;
            else continue;
            
            ctx.fillRect(x*map.cellSize, y*map.cellSize, map.cellSize, map.cellSize);

            // dashed line
            if (cell === MapCell.ROAD && x % 2 === 0) {
              ctx.fillStyle = CONSTANTS.COLORS.LANE;
              ctx.fillRect(x*map.cellSize + map.cellSize/2 - 2, y*map.cellSize + map.cellSize/2 - 5, 4, 10);
            }
          }
        }

        // draw path
        if (config.autopilot && config.showPath && autopilot.current.path.length > 0) {
          ctx.beginPath();
          ctx.strokeStyle = CONSTANTS.COLORS.PATH;
          ctx.lineWidth = 2;
          ctx.moveTo(autopilot.current.path[0].x, autopilot.current.path[0].y);
          for(let p of autopilot.current.path) ctx.lineTo(p.x, p.y);
          ctx.stroke();
        }

        // draw car
        ctx.save();
        ctx.translate(physics.current.state.position.x, physics.current.state.position.y);
        ctx.rotate(physics.current.state.heading);
        ctx.fillStyle = CONSTANTS.COLORS.CAR;
        ctx.fillRect(-CONSTANTS.CAR_LENGTH/2, -CONSTANTS.CAR_WIDTH/2, CONSTANTS.CAR_LENGTH, CONSTANTS.CAR_WIDTH);
        
        ctx.fillStyle = '#f1c40f'; // headlights
        ctx.beginPath(); ctx.arc(CONSTANTS.CAR_LENGTH/2, -CONSTANTS.CAR_WIDTH/3, 3, 0, Math.PI*2); ctx.fill();
        ctx.beginPath(); ctx.arc(CONSTANTS.CAR_LENGTH/2, CONSTANTS.CAR_WIDTH/3, 3, 0, Math.PI*2); ctx.fill();
        
        // sensors
        if (config.showSensors) {
          ctx.strokeStyle = CONSTANTS.COLORS.SENSOR;
          ctx.lineWidth = 1;
          const dists = [s.front, s.frontRight, s.frontLeft, s.right, s.left];
          const angles = [0, Math.PI/6, -Math.PI/6, Math.PI/2, -Math.PI/2];
          
          for(let i=0; i<5; i++) {
            ctx.beginPath();
            ctx.moveTo(0,0);
            ctx.lineTo(Math.cos(angles[i])*dists[i], Math.sin(angles[i])*dists[i]);
            ctx.stroke();
          }
        }
        
        ctx.restore();
      }

      frameId = requestAnimationFrame(loop);
    };
    frameId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frameId);
  }, [config.autopilot, config.showPath, config.showSensors, map]);

  return (
    <div style={{width: '100vw', height: '100vh', position: 'relative'}}>
      <canvas ref={canvasRef} width={800} height={600} style={{width: '100%', height: '100%', objectFit: 'contain'}} />
      <Dashboard carState={carState} autopilot={config.autopilot} />
      <InfoPanel sensors={sensorData} config={config} />
      <ControlsHelp />
      {config.showMiniMap && <MiniMap mapIdx={config.currentMap} carState={carState} />}
    </div>
  );
}
