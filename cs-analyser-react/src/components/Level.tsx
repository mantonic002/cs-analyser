import { useEffect, useState } from "react";
import { Texture, Assets } from "pixi.js";

const maps = import.meta.glob("../assets/*/radar.png", {
  eager: true,
  import: "default",
});

type LevelProps = React.ComponentProps<"pixiSprite"> & {
  map: string;
};

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

  return <pixiSprite texture={bgTex} width={1024} height={1024} {...props} />;
}

export default Level;
