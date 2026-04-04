import { useTick } from "@pixi/react";
import { interp, interpAngle, worldToRadar } from "../helpers/common";
import { useRadarMeta } from "../hooks/useRadarMeta";
import type { Game } from "../models";
import Level from "./Level";
import Player from "./Player";
import { useState } from "react";
import { DEMO_FRAME_MS } from "../constants/game";

interface Props {
  game: Game | null;
}

function Scene({ game }: Props) {
  const [time, setTime] = useState(0);
  const meta = useRadarMeta(game?.map ?? null);

  useTick((ticker) => {
    setTime((prev) => prev + ticker.elapsedMS);
  });

  if (!game || !meta) return null;

  const tickFloat = (time / DEMO_FRAME_MS) % game.ticks.length;
  const tickIndex = Math.floor(tickFloat);
  const alpha = tickFloat % 1;

  const tick = game.ticks[tickIndex];
  // next tick for lerping
  const tickN = game.ticks[tickIndex + 1];
  const players = tick?.[1] ?? [];
  const playersN = tickN?.[1] ?? [];

  return (
    <pixiContainer>
      <Level map={game.map} />

      {players.map((p) => {
        const userID = p[0];
        const pN = playersN.find((p) => p[0] === userID);
        if (!pN) return null;

        const [, team, pos, angle, hp] = p;
        const [, , posN, angleN] = pN;

        const x = interp(pos[0], posN[0], alpha);
        const y = interp(pos[1], posN[1], alpha);
        const z = interp(pos[2], posN[2], alpha);

        const viewDirectionX = interpAngle(angle, angleN, alpha);

        const radar = worldToRadar(x, y, meta);

        return (
          <Player
            key={userID}
            x={radar.x}
            y={radar.y}
            viewDirectionX={viewDirectionX}
            z={z}
            team={team}
            hp={hp}
          />
        );
      })}
    </pixiContainer>
  );
}

export default Scene;
