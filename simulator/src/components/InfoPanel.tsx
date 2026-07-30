import React from 'react';
import { SensorReading, GameConfig } from '../types';
import { CONSTANTS } from '../utils/constants';

export const InfoPanel: React.FC<{sensors: SensorReading, config: GameConfig}> = ({sensors, config}) => {
  return (
    <div className="hud-panel info-panel">
      <h3>AutoPilot Info</h3>
      <p>Mode: {config.autopilot ? 'Autopilot' : 'Manual'}</p>
      <div>
        <small>Sensors</small>
        {Object.entries(sensors).map(([k, v]) => (
          <div key={k}>
            <div style={{fontSize: 10}}>{k}</div>
            <div className="sensor-bar" style={{width: `${(v/CONSTANTS.MAX_SENSOR_DIST)*100}%`}}></div>
          </div>
        ))}
      </div>
    </div>
  );
};
