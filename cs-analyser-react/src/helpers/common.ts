import type { RadarMeta } from "./loadMeta";

export const calculateCanvasSize = () => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  return { width, height };
};

export function worldToRadar(
  x: number,
  y: number,
  meta: RadarMeta,
  canvasSize: { width: number; height: number },
) {
  const wx = x + meta.offset.x;
  const wy = y + meta.offset.y;

  const px = wx / meta.resolution;
  const py = wy / meta.resolution;

  return {
    x: px,
    y: canvasSize.height - py,
  };
}
