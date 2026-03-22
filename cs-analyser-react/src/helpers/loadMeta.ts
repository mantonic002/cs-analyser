import JSON5 from "json5";

export type RadarMeta = {
  resolution: number;
  offset: {
    x: number;
    y: number;
  };
  //splits?: any[];
  zRange?: {
    min: number;
    max: number;
  };
};

export async function loadRadarMeta(map: string): Promise<RadarMeta> {
const raw = await import(`../assets/${map}/meta.json5?raw`);
return JSON5.parse(raw.default);
}
