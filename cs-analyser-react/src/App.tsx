import { UploadDemo } from "./components/UploadDemo";
import PixiApp from "./components/PixiApp";
import { useEffect, useState } from "react";
import type { Game } from "./models";

function App() {
  const [game, setGame] = useState<Game | null>(null);
  const [tickIndex, setTickIndex] = useState(20);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!game || !isPlaying) return;

    const interval = setInterval(
      () => {
        setTickIndex((prev) => Math.min(prev + 1, game.ticks.length - 1));
      },
      (1000 / 64) * 4,
    );

    return () => clearInterval(interval);
  }, [game, isPlaying]);

  return (
    <>
      <UploadDemo setGame={setGame} />

      <div style={{ display: "flex", gap: 10 }}>
        <button onClick={() => setIsPlaying((p) => !p)}>
          {isPlaying ? "Pause" : "Play"}
        </button>

        <button onClick={() => setTickIndex(0)}>Reset</button>

        <input
          type="range"
          min={0}
          max={game?.ticks.length ? game.ticks.length - 1 : 0}
          value={tickIndex}
          onChange={(e) => setTickIndex(Number(e.target.value))}
        />
      </div>

      <PixiApp game={game} tickIndex={tickIndex} />
    </>
  );
}

export default App;
