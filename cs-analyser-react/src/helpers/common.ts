import type { RadarMeta } from "./loadMeta";

export const calculateCanvasSize = () => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  return { width, height };
};

export function worldToRadar(x: number, y: number, meta: RadarMeta) {
  const wx = x + meta.offset.x;
  const wy = y + meta.offset.y;

  const px = wx / meta.resolution;
  const py = wy / meta.resolution;

  return {
    x: px,
    y: 1024 - py,
  };
}

export function interp(a: number, b: number, alpha: number) {
  return a + (b - a) * alpha;
}

export function interpAngle(a: number, b: number, alpha: number) {
  let delta = ((b - a + 180) % 360) - 180;
  if (delta < -180) delta += 360;
  return a + delta * alpha;
}
