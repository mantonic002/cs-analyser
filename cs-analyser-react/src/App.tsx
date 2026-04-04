import { UploadDemo } from "./components/UploadDemo";
import PixiApp from "./components/PixiApp";
import { useState } from "react";
import type { Game } from "./models";

function App() {
  const [game, setGame] = useState<Game | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <>
      <UploadDemo setGame={setGame} />

      <div style={{ display: "flex", gap: 10 }}>
        <button onClick={() => setIsPlaying((p) => !p)}>
          {isPlaying ? "Pause" : "Play"}
        </button>

        <button>Reset</button>

        <input
          type="range"
          min={0}
          max={game?.ticks.length ? game.ticks.length - 1 : 0}
        />
      </div>

      <PixiApp game={game} />
    </>
  );
}

export default App;
