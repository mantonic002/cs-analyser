import { useCallback } from "react";
import type { Team } from "../models";
import { Graphics } from "pixi.js";
import { TEAM_COLORS, TEAMS } from "../constants/gameUi";


function Player({
  x,
  y,
  viewDirectionX,
  team,
  hp,
}: {
  x: number;
  y: number;
  z: number;
  viewDirectionX: number;
  team: Team;
  hp: number;
}) {
  const color =
    team === TEAMS.T
      ? TEAM_COLORS.T
      : team === TEAMS.CT
        ? TEAM_COLORS.CT
        : 0xffffff;

  const rad = (-viewDirectionX * Math.PI) / 180;

  const dx = Math.cos(rad) * 20;
  const dy = Math.sin(rad) * 20;

  const draw = useCallback(
    (g: Graphics) => {
      g.clear();

      if (hp > 0) {
        // player body
        g.fill({ color });
        g.circle(0, 0, 6);
        g.fill();

        // direction line
        g.moveTo(0, 0);
        g.lineTo(dx, dy);
        g.setStrokeStyle({ width: 2, color: 0xff0000 });
        g.stroke();
      }

      // HP bar
      g.fill({ color: 0x00ff00 });
      g.rect(-10, -12, (hp / 100) * 20, 3);
      g.fill();
    },
    [color, hp, dx, dy],
  );

  return (
    <pixiContainer x={x} y={y}>
      <pixiGraphics draw={draw} />
    </pixiContainer>
  );
}

export default Player;
