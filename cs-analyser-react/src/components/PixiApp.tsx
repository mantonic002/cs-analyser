import { Application, extend } from "@pixi/react";
import { Container, Graphics, Sprite } from "pixi.js";

import { calculateCanvasSize } from "../helpers/common";
import { useCallback, useEffect, useState } from "react";
import MainContainer from "./MainContainer";

extend({
  Container,
  Graphics,
  Sprite,
});

function PixiApp() {
  const [canvasSize, setCanvasSize] = useState(calculateCanvasSize);

  const updateCanvasSize = useCallback(() => {
    setCanvasSize(calculateCanvasSize());
  }, []);

  useEffect(() => {
    window.addEventListener("resize", updateCanvasSize);
    return () => window.removeEventListener("resize", updateCanvasSize);
  }, [updateCanvasSize]);

  return (
    <Application resizeTo={window}>
      <MainContainer canvasSize={canvasSize} />
    </Application>
  );
}
export default PixiApp;
