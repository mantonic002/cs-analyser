import type { PropsWithChildren } from "react";
import Level from "./Level";

interface IMainContainerProps {
  canvasSize: { width: number; height: number };
}

function MainContainer({
  canvasSize,
  children,
}: PropsWithChildren<IMainContainerProps>) {
  return (
    <pixiContainer>
      {children}
      <Level canvasSize={canvasSize} />
    </pixiContainer>
  );
}
export default MainContainer;
