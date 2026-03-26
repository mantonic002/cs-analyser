import { Application, extend } from "@pixi/react";
import { Container, Graphics, Sprite } from "pixi.js";

import Level from "./Level";
import Player from "./Player";
import type { Game } from "../models";
import { worldToRadar } from "../helpers/common";
import { useRadarMeta } from "../hooks/useRadarMeta";

extend({ Container, Graphics, Sprite });

interface Props {
  game: Game | null;
  tickIndex: number;
}

function PixiApp({ game, tickIndex }: Props) {
  const meta = useRadarMeta(game?.map ?? null);

  if (!game || !meta) return null;

  const tick = game.ticks[tickIndex];
  const players = tick?.[1] ?? [];

  return (
    <Application autoStart sharedTicker resizeTo={window}>
      <pixiContainer>
        <Level map={game.map} />

        {players.map((p) => {
          const userID = p[0];
          const team = p[1];
          const pos = p[2];
          const viewDirectionX = p[3];
          const hp = p[4];

          const radar = worldToRadar(pos[0], pos[1], meta);

          return (
            <Player
              key={userID}
              x={radar.x}
              y={radar.y}
              viewDirectionX={viewDirectionX}
              z={pos[2]}
              team={team}
              hp={hp}
            />
          );
        })}
      </pixiContainer>
    </Application>
  );
}

export default PixiApp;
