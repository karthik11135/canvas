import { drawShapeProps } from '@/types/alltypes';

export const drawLine = ({
  ctx,
  startX,
  startY,
  offSetX,
  offSetY,
}: drawShapeProps) => {
  if (!ctx || !startX || !startY) return null;

  ctx.beginPath();
  ctx.moveTo(startX, startY);
  ctx.lineTo(offSetX, offSetY);
  ctx.stroke();
};

export const drawCircle = ({
  ctx,
  startX,
  startY,
  offSetX,
  offSetY,
}: drawShapeProps) => {
  if (!ctx) return;

  ctx.beginPath();
  const radius = Math.sqrt(
    Math.pow(offSetX - startX, 2) + Math.pow(offSetY - startY, 2)
  );
  console.log('real radius', radius)
  ctx.arc(startX, startY, radius, 0, 2 * Math.PI);
  ctx.stroke();
};

export const drawRectangle = ({
  ctx,
  startX,
  startY,
  offSetX,
  offSetY,
}: drawShapeProps) => {
  if (!ctx) return;

  ctx.beginPath();
  ctx.strokeRect(startX, startY, offSetX - startX, offSetY - startY);
};
