import { useEffect, useState } from "react";
import { Texture, Assets, Rectangle } from "pixi.js";

import mapAsset from "../assets/de_mirage/radar.png";

type LevelProps = React.ComponentProps<"pixiSprite">;

function Level({ ...props }: LevelProps) {
  const [bgTex, setBgTex] = useState<Texture | null>(null);

  useEffect(() => {
    Assets.load(mapAsset).then((tex) => {
      const frame = new Rectangle(0, 0, tex.width, tex.height);

      const cropped = new Texture({
        source: tex.source,
        frame,
      });

      setBgTex(cropped);
    });
  }, []);

  if (!bgTex) return null;

  return <pixiSprite texture={bgTex} height={1024} width={1024} {...props} />;
}

export default Level;
