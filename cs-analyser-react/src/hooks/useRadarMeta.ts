import { useEffect, useState } from "react";
import { loadRadarMeta, type RadarMeta } from "../helpers/loadMeta";

export function useRadarMeta(map: string | null) {
  const [meta, setMeta] = useState<RadarMeta | null>(null);

  useEffect(() => {
    if (!map) return;

    loadRadarMeta(map).then(setMeta);
  }, [map]);

  return meta;
}
