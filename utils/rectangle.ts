import { Shape } from '@/app/page';
import { redrawAllshapes } from './features';

export const startRectangle = (
  e: React.MouseEvent<HTMLCanvasElement, MouseEvent>,
  cnv: React.RefObject<HTMLCanvasElement>,
  startX: React.MutableRefObject<number | null>,
  startY: React.MutableRefObject<number | null>
) => {
  startX.current = e.nativeEvent.clientX - Number(cnv.current?.offsetLeft);
  startY.current = e.nativeEvent.clientY - Number(cnv.current?.offsetTop);
};

export const drawRectangle = (
  ctx: CanvasRenderingContext2D | null,
  e: React.MouseEvent<HTMLCanvasElement, MouseEvent>,
  cnv: React.RefObject<HTMLCanvasElement | null>,
  startX: number | null,
  startY: number | null,
  shapes: Shape[]
) => {
  if (!startX || !startY) return;
  if (!ctx) return;
  const { nativeEvent } = e;
  ctx.beginPath();
  ctx.clearRect(0, 0, Number(cnv.current?.width), Number(cnv.current?.height));
  redrawAllshapes(shapes, ctx);
  ctx.strokeRect(
    startX,
    startY,
    nativeEvent.offsetX - startX,
    nativeEvent.offsetY - startY
  );
};
