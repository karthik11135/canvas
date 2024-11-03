import { Shape } from '@/app/page';

export const redrawAllshapes = (
  shapes: Shape[],
  ctx: CanvasRenderingContext2D | null
) => {
  shapes.forEach((shape) => {
    const startX = shape.startX,
      startY = shape.startY,
      endX = shape.endX,
      endY = shape.endY;
    if (shape.type === 'rectangle') {
      ctx?.strokeRect(startX, startY, endX - startX, endY - startY);
    } else if (shape.type === 'circle') {
      const radius = Math.sqrt(
        Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2)
      );
      ctx?.beginPath();
      ctx?.arc(startX, startY, radius, 0, 2 * Math.PI);
      ctx?.stroke();
    } else if (shape.type === 'line') {
      ctx?.beginPath();

      ctx?.moveTo(startX, startY);
      ctx?.lineTo(endX, endY);

      ctx?.stroke();
    } else if (shape.type === 'text') {
      if(!shape.text) return
      ctx?.beginPath();

      ctx?.fillText(shape.text as string, startX, startY);
      ctx?.closePath();
    }
  });
};
