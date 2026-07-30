import { CarState, Vec2 } from '../types';
import { CONSTANTS } from '../utils/constants';
import { clamp } from '../utils/helpers';

export class CarPhysics {
  state: CarState;

  constructor(pos: Vec2, heading: number) {
    this.state = {
      position: { ...pos },
      velocity: 0,
      heading,
      steeringAngle: 0,
      width: CONSTANTS.CAR_WIDTH,
      length: CONSTANTS.CAR_LENGTH
    };
  }

  update(dt: number, throttle: number, steering: number, brake: number) {
    this.state.steeringAngle = clamp(steering, -CONSTANTS.MAX_STEERING, CONSTANTS.MAX_STEERING);
    
    let accel = throttle * 100 - brake * 150;
    if (this.state.velocity > 0) accel -= this.state.velocity * 0.5; // drag
    else if (this.state.velocity < 0) accel += Math.abs(this.state.velocity) * 0.5;

    this.state.velocity += accel * dt;
    this.state.velocity = clamp(this.state.velocity, -CONSTANTS.MAX_SPEED/2, CONSTANTS.MAX_SPEED);

    if (Math.abs(this.state.velocity) > 0.1) {
      const turnRadius = this.state.length / Math.tan(this.state.steeringAngle || 0.0001);
      const angularVelocity = this.state.velocity / turnRadius;
      this.state.heading += angularVelocity * dt;
    }

    this.state.position.x += Math.cos(this.state.heading) * this.state.velocity * dt;
    this.state.position.y += Math.sin(this.state.heading) * this.state.velocity * dt;
  }

  reset(pos: Vec2, heading: number) {
    this.state.position = { ...pos };
    this.state.velocity = 0;
    this.state.heading = heading;
    this.state.steeringAngle = 0;
  }
}
