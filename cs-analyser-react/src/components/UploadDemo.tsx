import { useState } from "react";
import type { Game } from "../models";

type UploadDemoProps = {
  setGame: (game: Game) => void;
};

export function UploadDemo({ setGame }: UploadDemoProps) {
  const [loading, setLoading] = useState(false);
  const [parseTime, setParseTime] = useState<number | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setLoading(true);

    const reader = new FileReader();
    reader.onload = function () {
      if (!reader.result) return;

      const buffer = reader.result as ArrayBuffer;
      const bytes = new Uint8Array(buffer);

      const start = performance.now();

      const json = window.parseDemoFile(bytes);
      const game = JSON.parse(json);
      setGame(game);

      const end = performance.now();
      setParseTime(end - start);

      setLoading(false);
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <div>
      <input type="file" accept=".dem" onChange={handleFileChange} />
      {loading && <p>Uploading…</p>}
      {parseTime !== null && <p>Parsed in {parseTime.toFixed(2)} ms</p>}
    </div>
  );
}
