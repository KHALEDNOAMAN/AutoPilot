import { Vec2 } from '../types';

export const normalizeAngle = (angle: number): number => {
  while (angle > Math.PI) angle -= 2 * Math.PI;
  while (angle <= -Math.PI) angle += 2 * Math.PI;
  return angle;
};

export const angleDiff = (a: number, b: number): number => {
  return normalizeAngle(a - b);
};

export const distance = (a: Vec2, b: Vec2): number => {
  return Math.hypot(a.x - b.x, a.y - b.y);
};

export const lerp = (a: number, b: number, t: number): number => {
  return a + (b - a) * t;
};

export const clamp = (val: number, min: number, max: number): number => {
  return Math.max(min, Math.min(max, val));
};
