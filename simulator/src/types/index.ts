export interface Vec2 {
  x: number;
  y: number;
}

export interface CarState {
  position: Vec2;
  velocity: number;
  heading: number;
  steeringAngle: number;
  width: number;
  length: number;
}

export interface SensorReading {
  front: number;
  left: number;
  right: number;
  frontLeft: number;
  frontRight: number;
}

export enum MapCell {
  ROAD = 0,
  WALL = 1,
  GRASS = 2,
  CHECKPOINT = 3,
  START = 4,
  GOAL = 5
}

export interface GridMap {
  cells: MapCell[][];
  width: number;
  height: number;
  cellSize: number;
  start: Vec2;
  goal: Vec2;
  checkpoints: Vec2[];
}

export interface AStarNode {
  x: number;
  y: number;
  f: number;
  g: number;
  h: number;
  parent: AStarNode | null;
}

export interface GameConfig {
  autopilot: boolean;
  showSensors: boolean;
  showPath: boolean;
  showMiniMap: boolean;
  currentMap: number;
}
