import { Shape } from '@/types/alltypes';
import { drawRectangle, drawCircle, drawLine } from './drawShapes';

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
      if (!shape.text) return;
      ctx?.beginPath();

      ctx?.fillText(shape.text as string, startX, startY);
      ctx?.closePath();
    }
  });
};

export const findNearestShape = (
  startX: number | null,
  startY: number | null,
  shapes: Shape[]
) => {
  const x = startX as number,
    y = startY as number;

  const possibleShapes = shapes.filter((shape) => {
    switch (shape.type) {
      case 'rectangle':
        if (
          shape.startX < x &&
          shape.endX > x &&
          shape.startY < y &&
          shape.endY > y
        )
          return true;
        return false;
      case 'circle':
        const radius = Math.sqrt(
          Math.pow(shape.startX - shape.endX, 2) +
            Math.pow(shape.startY - shape.endY, 2)
        );
        if (
          x > shape.startX - radius &&
          x < shape.startX + radius &&
          y > shape.startY - radius &&
          y < shape.startY + radius
        ) {
          return true;
        }
        return false;
      case 'line':
        console.log(x, y, shape);
        if (
          ((x >= shape.startX - 3 && x <= shape.endX + 3) ||
            (x <= shape.startX - 3 && x >= shape.endX + 3)) &&
          ((y >= shape.startY && y <= shape.endY) ||
            (y >= shape.endY && y <= shape.startY))
        ) {
          return true;
        }
        return false;
    }
  });

  const index = shapes.indexOf(possibleShapes[possibleShapes.length - 1]);
  return index;
};

export const setStartXandY = (
  startX: React.MutableRefObject<number | null>,
  startY: React.MutableRefObject<number | null>,
  clientX: number,
  clientY: number,
  offsetLeft: number,
  offsetTop: number
) => {
  startX.current = clientX - offsetLeft;
  startY.current = clientY - offsetTop;
};

export const clearCanvasAndRedraw = (
  ctx: CanvasRenderingContext2D | null,
  cnv: React.RefObject<HTMLCanvasElement | null>,
  shapes: Shape[]
) => {
  ctx?.clearRect(0, 0, Number(cnv.current?.width), Number(cnv.current?.height));
  redrawAllshapes(shapes, ctx);
};

export const startUpdatingShape = (
  updatingShape: Shape,
  contextRef: React.MutableRefObject<CanvasRenderingContext2D | null>,
  startX: number, //pointer points
  startY: number
) => {
  switch (updatingShape.type) {
    case 'rectangle':
      const width = updatingShape.endX - updatingShape.startX;
      const height = updatingShape.endY - updatingShape.startY;
      drawRectangle({
        ctx: contextRef.current,
        startX: startX,
        startY: startY,
        offSetX: startX + width,
        offSetY: startY + height,
      });
      break;
    case 'circle':
      drawCircle({
        ctx: contextRef.current,
        startX: startX,
        startY: startY,
        offSetX:
          startX +
          calcRadius(
            updatingShape.startX,
            updatingShape.startY,
            updatingShape.endX,
            updatingShape.endY
          ),
        offSetY: startY,
      });
      break;
    case 'line':
      const deltaX = updatingShape.endX - updatingShape.startX;
      const deltaY = updatingShape.endY - updatingShape.startY;

      const angle = Math.atan2(deltaX, deltaY);
      const distance = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));

      drawLine({
        ctx: contextRef.current,
        startX: startX,
        startY: startY,
        offSetX: startX + distance * Math.cos(angle),
        offSetY: startY + distance * Math.sin(angle),
      });
      break;
    // }
  }
};

export const calcRadius = (s1: number, s2: number, e1: number, e2: number) => {
  return Math.sqrt(Math.pow(e1 - s1, 2) + Math.pow(e2 - s2, 2));
};
