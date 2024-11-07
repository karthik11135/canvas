import { drawShapeProps } from '@/types/alltypes';

export const drawLine = ({
  ctx,
  startX,
  startY,
  offSetX,
  offSetY,
  dotted,
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
  dotted,
}: drawShapeProps) => {
  if (!ctx) return;

  ctx.beginPath();
  const radius = Math.sqrt(
    Math.pow(offSetX - startX, 2) + Math.pow(offSetY - startY, 2)
  );
  ctx.arc(startX, startY, radius, 0, 2 * Math.PI);
  ctx.stroke();
  if (dotted === true) {
    ctx.beginPath();
    ctx.setLineDash([3, 7]);
    ctx.arc(startX, startY, radius + radius * 0.2, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.setLineDash([0]);
  }
};

export const drawRectangle = ({
  ctx,
  startX,
  startY,
  offSetX,
  offSetY,
  dotted,
}: drawShapeProps) => {
  if (!ctx) return;

  ctx.beginPath();
  ctx.strokeRect(startX, startY, offSetX - startX, offSetY - startY);

  if (dotted === true) {
    ctx.beginPath();
    ctx.setLineDash([3, 7]);
    ctx.strokeRect(
      startX - 15,
      startY - 15,
      offSetX - startX + 30,
      offSetY - startY + 30
    );
    ctx.setLineDash([0]);
  }
};

export const drawText = ({
  ctx,
  startX,
  startY,
  offSetX,
  offSetY,
  textStr,
  dotted,
}: drawShapeProps) => {
  if (!ctx || !textStr) return;

  ctx.fillText(textStr, startX, startY);
  if (dotted === true) {
    ctx.beginPath();
    ctx.setLineDash([3, 7]);
    ctx.roundRect(
      startX - 10,
      startY - 10,
      ctx.measureText(textStr).width + 20,
      offSetY - startY + 20,
      2
    );
    ctx.stroke();
    ctx.setLineDash([0]);
  }
};