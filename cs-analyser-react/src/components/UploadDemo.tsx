import { useEffect, useRef, useState } from "react";
import type { Game } from "../models";

type UploadDemoProps = {
  setGame: (game: Game) => void;
};

export function UploadDemo({ setGame }: UploadDemoProps) {
  const [loading, setLoading] = useState(false);
  const [parseTime, setParseTime] = useState<number | null>(null);
  const [ticks, setTicks] = useState<number | null>(null);
  const workerRef = useRef<Worker | null>(null);

  useEffect(() => {
    const worker = new Worker(new URL("../workers/worker.js", import.meta.url));

    worker.onmessage = ({ data }) => {
      const { action, payload } = data;

      switch (action) {
        case "ready":
          console.log("Worker ready");
          break;

        case "result": {
          const { json, time } = payload;

          const game = JSON.parse(json);
          setGame(game);
          const g = game as Game;
          setTicks(g.ticks.length);
          setParseTime(time);
          setLoading(false);
          break;
        }

        default:
          console.error("Unknown action:", action);
      }
    };

    workerRef.current = worker;

    return () => {
      worker.terminate();
    };
  }, [setGame]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !workerRef.current) return;

    setLoading(true);

    const reader = new FileReader();
    reader.onload = function () {
      if (!reader.result) return;

      const buffer = reader.result as ArrayBuffer;
      const bytes = new Uint8Array(buffer);

      workerRef.current?.postMessage({
        action: "parse",
        payload: { bytes },
      });
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <div>
      <input type="file" accept=".dem" onChange={handleFileChange} />
      {loading && <p>Uploading…</p>}
      {parseTime !== null && <p>Parsed in {parseTime.toFixed(2)} ms</p>}
      {ticks !== null && <p> Ticks: {ticks}</p>}
    </div>
  );
}
