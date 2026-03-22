import { useCallback } from "react";
import type { Team } from "../models";
import type { Graphics } from "pixi.js";

function Player({
  x,
  y,
  team,
  hp,
}: {
  x: number;
  y: number;
  z: number;
  team: Team;
  hp: number;
}) {
  const color = team === 2 ? 0xff4444 : team === 3 ? 0x4444ff : 0xffffff;

  const draw = useCallback(
    (g: Graphics) => {
      g.clear();

      // body
      g.fill({ color });
      g.circle(0, 0, 4);
      g.fill();

      // optional HP bar
      g.fill({ color: 0x00ff00 });
      g.rect(-5, -10, (hp / 100) * 10, 2);
      g.fill();
    },
    [color, hp],
  );

  return (
    <pixiContainer x={x} y={y}>
      <pixiGraphics draw={draw} />
    </pixiContainer>
  );
}

export default Player;
