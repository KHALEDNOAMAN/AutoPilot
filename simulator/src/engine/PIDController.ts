export class PIDController {
  kp: number; ki: number; kd: number;
  integral = 0;
  prevError = 0;

  constructor(kp: number, ki: number, kd: number) {
    this.kp = kp; this.ki = ki; this.kd = kd;
  }

  compute(setpoint: number, measurement: number, dt: number): number {
    const error = setpoint - measurement;
    this.integral += error * dt;
    const derivative = dt > 0 ? (error - this.prevError) / dt : 0;
    this.prevError = error;
    return this.kp * error + this.ki * this.integral + this.kd * derivative;
  }

  reset() {
    this.integral = 0;
    this.prevError = 0;
  }

  setGains(kp: number, ki: number, kd: number) {
    this.kp = kp; this.ki = ki; this.kd = kd;
  }
}
