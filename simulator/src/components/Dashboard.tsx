import React from 'react';
import { CarState } from '../types';

export const Dashboard: React.FC<{carState: CarState, autopilot: boolean}> = ({carState, autopilot}) => {
  return (
    <div className="hud-panel dashboard">
      <div>
        <div style={{fontSize: 24, fontWeight: 'bold'}}>{Math.abs(Math.round(carState.velocity))}</div>
        <div style={{fontSize: 12, color: '#7f8c8d'}}>km/h</div>
      </div>
      <div className={`autopilot-badge ${autopilot ? 'active' : ''}`}>
        AUTOPILOT
      </div>
    </div>
  );
};
