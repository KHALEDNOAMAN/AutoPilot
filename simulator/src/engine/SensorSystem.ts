import { CarState, GridMap, SensorReading, Vec2, MapCell } from '../types';
import { CONSTANTS } from '../utils/constants';

export class SensorSystem {
  castRay(origin: Vec2, angle: number, map: GridMap, maxDist: number): number {
    let dist = 0;
    const step = 2;
    while (dist < maxDist) {
      const cx = origin.x + Math.cos(angle) * dist;
      const cy = origin.y + Math.sin(angle) * dist;
      const gx = Math.floor(cx / map.cellSize);
      const gy = Math.floor(cy / map.cellSize);
      if (gx < 0 || gy < 0 || gx >= map.width || gy >= map.height || map.cells[gy][gx] === MapCell.WALL) {
        return dist;
      }
      dist += step;
    }
    return maxDist;
  }

  getSensorReadings(carState: CarState, map: GridMap): SensorReading {
    const d = CONSTANTS.MAX_SENSOR_DIST;
    return {
      front: this.castRay(carState.position, carState.heading, map, d),
      frontLeft: this.castRay(carState.position, carState.heading - Math.PI/6, map, d),
      frontRight: this.castRay(carState.position, carState.heading + Math.PI/6, map, d),
      left: this.castRay(carState.position, carState.heading - Math.PI/2, map, d),
      right: this.castRay(carState.position, carState.heading + Math.PI/2, map, d)
    };
  }
}
