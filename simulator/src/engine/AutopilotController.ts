import { CarState, GridMap, Vec2 } from '../types';
import { PIDController } from './PIDController';
import { AStarPathfinder } from './AStarPathfinder';
import { SensorSystem } from './SensorSystem';
import { angleDiff, clamp } from '../utils/helpers';
import { CONSTANTS } from '../utils/constants';

export class AutopilotController {
  pidSteer = new PIDController(CONSTANTS.PID_STEERING.kp, CONSTANTS.PID_STEERING.ki, CONSTANTS.PID_STEERING.kd);
  pathfinder = new AStarPathfinder();
  sensors = new SensorSystem();
  path: Vec2[] = [];
  targetIdx = 0;

  update(carState: CarState, map: GridMap) {
    if (this.path.length === 0) {
      const gx = Math.floor(carState.position.x / map.cellSize);
      const gy = Math.floor(carState.position.y / map.cellSize);
      this.path = this.pathfinder.findPath(map, {x: gx, y: gy}, map.goal);
      this.path = this.path.map(p => ({ x: p.x * map.cellSize + map.cellSize/2, y: p.y * map.cellSize + map.cellSize/2 }));
      this.targetIdx = 0;
    }

    if (this.targetIdx < this.path.length) {
      const target = this.path[this.targetIdx];
      const dist = Math.hypot(target.x - carState.position.x, target.y - carState.position.y);
      if (dist < map.cellSize) {
        this.targetIdx++;
      }
    }

    let steering = 0;
    let throttle = 0;
    let brake = 0;

    if (this.targetIdx < this.path.length) {
      const target = this.path[this.targetIdx];
      const targetHeading = Math.atan2(target.y - carState.position.y, target.x - carState.position.x);
      const err = angleDiff(targetHeading, carState.heading);
      steering = this.pidSteer.compute(0, -err, 1/60); 
      steering = clamp(steering, -CONSTANTS.MAX_STEERING, CONSTANTS.MAX_STEERING);
      throttle = 0.5;
    }

    const s = this.sensors.getSensorReadings(carState, map);
    if (s.front < 50) {
      brake = 1; throttle = 0;
    }

    return { throttle, steering, brake };
  }
}
