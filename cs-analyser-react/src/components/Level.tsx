import { useEffect, useState } from "react";
import { Texture, Assets, Rectangle } from "pixi.js";

import mapAsset from "../assets/de_nuke/radar.png";

type LevelProps = React.ComponentProps<"pixiSprite"> & {
  canvasSize: { width: number; height: number };
};

function Level({ canvasSize, ...props }: LevelProps) {
  const [bgTex, setBgTex] = useState<Texture | null>(null);

  useEffect(() => {
    Assets.load(mapAsset).then((tex) => {
      const frame = new Rectangle(0, 0, tex.width, tex.height / 2);

      const cropped = new Texture({
        source: tex.source,
        frame,
      });

      setBgTex(cropped);
    });
  }, []);

  if (!bgTex) return null;

  const scale = Math.min(
    canvasSize.width / bgTex.width,
    canvasSize.height / bgTex.height,
  );

  return <pixiSprite texture={bgTex} scale={scale} {...props} />;
}

export default Level;
