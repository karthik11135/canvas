import { Shape } from '@/app/page';
import { redrawAllshapes } from './features';

export const startCircle = (
  e: React.MouseEvent<HTMLCanvasElement, MouseEvent>,
  cnv: React.RefObject<HTMLCanvasElement>,
  startX: React.MutableRefObject<number | null>,
  startY: React.MutableRefObject<number | null>
) => {
  startX.current = e.nativeEvent.clientX - Number(cnv.current?.offsetLeft);
  startY.current = e.nativeEvent.clientY - Number(cnv.current?.offsetTop);
};

export const drawCircle = (
  ctx: CanvasRenderingContext2D | null,
  e: React.MouseEvent<HTMLCanvasElement, MouseEvent>,
  cnv: React.RefObject<HTMLCanvasElement | null>,
  startX: number | null,
  startY: number | null,
  shapes: Shape[]
) => {
  if (!startX || !startY || !ctx || !cnv.current) return;

  ctx.clearRect(0, 0, 1000, 800);
  redrawAllshapes(shapes, ctx);
  ctx.beginPath();
  const { nativeEvent } = e;

  const radius = Math.sqrt(
    Math.pow(nativeEvent.offsetX - startX, 2) +
      Math.pow(nativeEvent.offsetY - startY, 2)
  );

  ctx.arc(startX, startY, radius, 0, 2 * Math.PI);

  ctx.stroke();
};