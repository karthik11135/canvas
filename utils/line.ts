import { Shape } from '@/app/page';
import { redrawAllshapes } from './features';

export const startLine = (
  e: React.MouseEvent<HTMLCanvasElement, MouseEvent>,
  cnv: React.RefObject<HTMLCanvasElement>,
  startX: React.MutableRefObject<number | null>,
  startY: React.MutableRefObject<number | null>,
  ctx: CanvasRenderingContext2D | null
) => {
  startX.current = e.nativeEvent.clientX - Number(cnv.current?.offsetLeft);
  startY.current = e.nativeEvent.clientY - Number(cnv.current?.offsetTop);
  if (!ctx) return;

  ctx.moveTo(Number(startX), Number(startY));
};

export const drawLine = (
  ctx: CanvasRenderingContext2D | null,
  e: React.MouseEvent<HTMLCanvasElement, MouseEvent>,
  startX: number | null,
  startY: number | null,
  shapes: Shape[]
) => {
  if (!ctx || !startX || !startY) return null;
  ctx.clearRect(0, 0, 1000, 800);
  redrawAllshapes(shapes, ctx);
  ctx.beginPath();

  const { offsetX, offsetY } = e.nativeEvent;

  ctx.moveTo(startX, startY);
  ctx.lineTo(offsetX, offsetY);

  ctx.stroke();
};
