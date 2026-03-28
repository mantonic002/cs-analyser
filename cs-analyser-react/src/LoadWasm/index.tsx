import './wasm_exec.js';
import './wasmTypes.d.ts';
import React, { useEffect, useState } from "react";

async function loadWasm(): Promise<void> {
  const goWasm = new window.Go();

  const result = await WebAssembly.instantiateStreaming(
    fetch("/main.wasm"),
    goWasm.importObject
  );

  goWasm.run(result.instance);
}

type Props = {
  children: React.ReactNode;
};

export const LoadWasm: React.FC<Props> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadWasm().then(() => {
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return <div>Loading WASM...</div>;
  }

  return <>{children}</>;
};
