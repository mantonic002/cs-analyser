import { useState, useEffect, useCallback } from "react";
import { Application, extend } from "@pixi/react";
import { Container, Graphics, Sprite } from "pixi.js";

import Level from "./Level";
import Player from "./Player";
import type { Game } from "../models";
import { calculateCanvasSize, worldToRadar } from "../helpers/common";
import { useRadarMeta } from "../hooks/useRadarMeta";

extend({ Container, Graphics, Sprite });

interface Props {
  game: Game | null;
  tickIndex: number;
}

function PixiApp({ game, tickIndex }: Props) {

  const meta = useRadarMeta(game?.map ?? null);
  console.log(meta);


  if (!game || !meta) return null;

  const tick = game.ticks[tickIndex];
  const players = tick?.[1] ?? [];

  return (
    <Application autoStart sharedTicker resizeTo={window}>
      <Level />

      {players.map((p) => {
        const userID = p[0];
        const team = p[1];
        const pos = p[2];
        const hp = p[4];

        const radar = worldToRadar(pos[0], pos[1], meta);

        return (
          <Player
            key={userID}
            x={radar.x}
            y={radar.y}
            z={pos[2]}
            team={team}
            hp={hp}
          />
        );
      })}
    </Application>
  );
}

export default PixiApp;
