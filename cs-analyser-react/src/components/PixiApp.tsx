import { Application, extend } from "@pixi/react";
import { Container, Graphics, Sprite } from "pixi.js";

import type { Game } from "../models";
import Scene from "./Scene";

extend({ Container, Graphics, Sprite });

interface Props {
  game: Game | null;
}

function PixiApp({ game}: Props) {
  return (
    <Application autoStart sharedTicker resizeTo={window}>
      <Scene game={game} />
    </Application>
  );
}

export default PixiApp;
