importScripts("/wasm_exec.js");

const go = new Go();

WebAssembly.instantiateStreaming(fetch("/main.wasm"), go.importObject)
  .then((result) => {
    go.run(result.instance);
    postMessage({ action: "ready" });
  })
  .catch((err) => {
    console.error("WASM load failed:", err);
  });

onmessage = ({ data }) => {
  console.log("Worker received:", data);

  const { action, payload } = data;

  switch (action) {
    case "parse": {
      const { bytes } = payload;

      const start = performance.now();

      const json = self.parseDemoFile(bytes);

      const end = performance.now();

      postMessage({
        action: "result",
        payload: {
          json,
          time: end - start,
        },
      });

      break;
    }

    default:
      console.error(`unknown action '${action}'`);
  }
};
