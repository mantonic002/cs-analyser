import { Application, extend } from "@pixi/react";
import { Container, Graphics, Sprite } from "pixi.js";

import { BunnySprite } from "./components/BunnySprite";
import { UploadDemo } from "./components/UploadDemo";

// extend tells @pixi/react what Pixi.js components are available
extend({
  Container,
  Graphics,
  Sprite,
});

function App() {
  return (
    <>
    <UploadDemo/>
      <Application>
        <BunnySprite />
      </Application>
    </>
  );
}

export default App;
