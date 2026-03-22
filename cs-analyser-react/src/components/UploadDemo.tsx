import { useMutation } from "@tanstack/react-query";
import type { Game } from "../models";
import { parseDemo } from "../api/api";

type UploadDemoProps = {
  setGame: (game: Game) => void;
};

export function UploadDemo({ setGame }: UploadDemoProps) {
  const mutation = useMutation({
    mutationFn: parseDemo,
    onSuccess: (data) => {
      setGame(data);
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    mutation.mutate(file);
  };

  return (
    <div>
      <input type="file" accept=".dem" onChange={handleFileChange} />

      {mutation.isPending && <p>Uploading...</p>}
      {mutation.isError && <p>Error: {mutation.error.message}</p>}
      {mutation.isSuccess && (
        <p>Loaded demo with {mutation.data.ticks.length} ticks</p>
      )}
    </div>
  );
}
