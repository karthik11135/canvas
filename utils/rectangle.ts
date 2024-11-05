import { Shape } from '@/types/alltypes';

export const updateRectangle = (
  ctx: CanvasRenderingContext2D | null,
  e: React.MouseEvent<HTMLCanvasElement, MouseEvent>,
  width: number,
  height: number,
) => {
  if (!ctx) return;
  const { nativeEvent } = e;
  ctx.beginPath();
  ctx.strokeRect(nativeEvent.offsetX, nativeEvent.offsetY, width, height);
};
