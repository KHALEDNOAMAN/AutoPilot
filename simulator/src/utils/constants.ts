export const CONSTANTS = {
  CAR_WIDTH: 10,
  CAR_LENGTH: 20,
  MAX_SPEED: 150,
  MAX_STEERING: (35 * Math.PI) / 180,
  MAX_SENSOR_DIST: 150,
  PID_STEERING: { kp: 1.5, ki: 0.01, kd: 0.5 },
  PID_SPEED: { kp: 1.0, ki: 0.1, kd: 0.05 },
  COLORS: {
    BACKGROUND: '#0f0f1a',
    CARD: '#1a1a2e',
    BORDER: '#2d2d4a',
    PRIMARY: '#e74c3c',
    SECONDARY: '#f39c12',
    ROAD: '#2c3e50',
    LANE: '#f1c40f',
    GRASS: '#1a472a',
    CAR: '#e74c3c',
    SENSOR: 'rgba(46, 204, 113, 0.4)',
    PATH: '#3498db',
    PATH_VISITED: 'rgba(52, 152, 219, 0.1)',
    TEXT: '#ecf0f1',
    MUTED: '#7f8c8d'
  }
};
