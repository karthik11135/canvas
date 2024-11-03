import { drawCircle, startCircle } from './circle';
import { drawRectangle, startRectangle } from './rectangle';
import { drawLine, startLine } from './line';
import { Shape } from '@/app/page';

export const mouseMoveHandler = (
  e: React.MouseEvent<HTMLCanvasElement, MouseEvent>,
  drawing: boolean,
  tool: string,
  cnv: React.RefObject<HTMLCanvasElement>,
  startX: React.MutableRefObject<number | null>,
  startY: React.MutableRefObject<number | null>,
  contextRef: React.MutableRefObject<CanvasRenderingContext2D | null>,
  shapes: Shape[]
) => {
  e.preventDefault();
  e.stopPropagation();

  if (drawing === false || tool === 'text') {
    return;
  }

  if (tool === 'rectangle')
    drawRectangle(
      contextRef.current,
      e,
      cnv,
      startX.current,
      startY.current,
      shapes
    );
  else if (tool === 'circle') {
    drawCircle(
      contextRef.current,
      e,
      cnv,
      startX.current,
      startY.current,
      shapes
    );
  } else if (tool === 'line') {
    drawLine(contextRef.current, e, startX.current, startY.current, shapes);
  }
};

export const mouseDownHandler = (
  e: React.MouseEvent<HTMLCanvasElement, MouseEvent>,
  cnv: React.RefObject<HTMLCanvasElement>,
  startX: React.MutableRefObject<number | null>,
  startY: React.MutableRefObject<number | null>,
  contextRef: React.MutableRefObject<CanvasRenderingContext2D | null>,
  tool: string,
  setDrawing: React.Dispatch<React.SetStateAction<boolean>>,
  shapes: Shape[],
  setWriting: React.Dispatch<React.SetStateAction<boolean>>,
  textRef?: React.MutableRefObject<null | HTMLInputElement>
) => {
  e.preventDefault();
  e.stopPropagation();
  if (!cnv) return;

  if (textRef && textRef.current) {
    return;
  }

  startX.current = e.nativeEvent.clientX - Number(cnv.current?.offsetLeft);
  startY.current = e.nativeEvent.clientY - Number(cnv.current?.offsetTop);
  setDrawing(true);
  if (tool === 'text') {
    setWriting(true);
    return;
  }
  setWriting(false);

  contextRef.current?.beginPath();

  if (tool === 'rectangle') startRectangle(e, cnv, startX, startY);
  else if (tool === 'circle') {
    startCircle(e, cnv, startX, startY);
  } else if (tool === 'line') {
    startLine(e, cnv, startX, startY, contextRef.current);
  }
};

export const mouseUpHandler = (
  e: React.MouseEvent<HTMLCanvasElement, MouseEvent>,
  contextRef: React.MutableRefObject<CanvasRenderingContext2D | null>,
  setDrawing: React.Dispatch<React.SetStateAction<boolean>>,
  startX: React.MutableRefObject<number | null>,
  startY: React.MutableRefObject<number | null>,
  tool: string,
  setShapes: React.Dispatch<React.SetStateAction<Shape[]>>,
  setTool: React.Dispatch<React.SetStateAction<string>>,
  setWriting: React.Dispatch<React.SetStateAction<boolean>>,
  textRef?: React.MutableRefObject<null | HTMLInputElement>
) => {
  e.preventDefault();
  e.stopPropagation();
  if (tool == '') return;
  setTool('draw');
  setWriting(false);

  if (!startX.current || !startY.current) return;

  const { offsetX, offsetY } = e.nativeEvent;

  const shape: Shape = {
    type: tool,
    startX: startX.current,
    startY: startY.current,
    endX: offsetX,
    endY: offsetY,
  };

  if (shape.type === 'text') {
    textRef?.current?.blur();
    setDrawing(false);
    return;
  }

  if (tool !== 'draw') {
    setShapes((prev) => {
      return [...prev, shape];
    });
  }

  contextRef.current?.closePath();
  setDrawing(false);
};

export const textOnFocusHandler = () => {};

export const textFocusOutHandler = (
  contextRef: React.MutableRefObject<CanvasRenderingContext2D | null>,
  textRef: React.MutableRefObject<null | HTMLInputElement>,
  startX: React.MutableRefObject<number | null>,
  startY: React.MutableRefObject<number | null>,
  setShapes: React.Dispatch<React.SetStateAction<Shape[]>>
) => {
  if (!startX.current || !startY.current) return;
  if (!textRef || !textRef.current) return;

  contextRef.current?.fillText(
    textRef?.current?.value ? textRef.current.value : '',
    startX.current,
    startY.current
  );

  setShapes((prev) => {
    return [
      ...prev,
      {
        type: 'text',
        text: textRef?.current?.value as string,
        startX: startX.current as number,
        startY: startY.current as number,
        endX: 0,
        endY: 0,
      },
    ];
  });
};
