import { useEffect, useState } from "react";
import { Texture, Assets, Sprite } from "pixi.js";
import { RADAR_IMG_SIZE } from "../constants/gameUi";
import { extend } from "@pixi/react";

const maps = import.meta.glob("../assets/*/radar.png", {
  eager: true,
  import: "default",
});

type LevelProps = React.ComponentProps<"pixiSprite"> & {
  map: string;
};

extend({ Sprite });

function Level({ map, ...props }: LevelProps) {
  const [bgTex, setBgTex] = useState<Texture | null>(null);

  useEffect(() => {
    const path = `../assets/${map}/radar.png`;
    const asset = maps[path];

    if (!asset) {
      console.error("Map not found:", path);
      return;
    }

    Assets.load(asset).then((tex) => {
      setBgTex(tex);
    });
  }, [map]);

  if (!bgTex) return null;

  return (
    <pixiSprite
      texture={bgTex}
      width={RADAR_IMG_SIZE}
      height={RADAR_IMG_SIZE}
      {...props}
    />
  );
}

export default Level;
