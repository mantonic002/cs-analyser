declare global {
  export interface Window {
    Go: any;
    parseDemoFile: (file: Uint8Array) => string;
  }
}

export {};
