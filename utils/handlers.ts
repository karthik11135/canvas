import { dragginShapeType, Shape } from '@/types/alltypes';
import {
  findNearestShape,
  startUpdatingShape,
  setStartXandY,
} from './features';
import { drawRectangle, drawCircle, drawLine } from './drawShapes';
import { clearCanvasAndRedraw } from './features';

export const mouseMoveHandler = (
  e: React.MouseEvent<HTMLCanvasElement, MouseEvent>,
  drawing: boolean,
  tool: string,
  cnv: React.RefObject<HTMLCanvasElement>,
  startX: React.MutableRefObject<number | null>,
  startY: React.MutableRefObject<number | null>,
  contextRef: React.MutableRefObject<CanvasRenderingContext2D | null>,
  shapes: Shape[],
  selectedShape: number,
  setShapes: React.Dispatch<React.SetStateAction<Shape[]>>,
  setSelectedShape: React.Dispatch<React.SetStateAction<number>>,
  draggingShape: Shape | null,
  setDraggingShape: React.Dispatch<React.SetStateAction<Shape | null>>
) => {
  // console.log(shapes);
  if (!drawing || !startX.current || !startY.current || !cnv) return;

  clearCanvasAndRedraw(contextRef.current, cnv, shapes);

  if (draggingShape && selectedShape !== -1) {
    startUpdatingShape(
      draggingShape,
      contextRef,
      e.nativeEvent.offsetX,
      e.nativeEvent.offsetY
    );
  }

  const drawingTools = {
    ctx: contextRef.current,
    startX: startX.current,
    startY: startY.current,
    offSetX: e.nativeEvent.offsetX,
    offSetY: e.nativeEvent.offsetY,
  };

  switch (tool) {
    case 'rectangle':
      drawRectangle(drawingTools);
      break;
    case 'circle':
      drawCircle(drawingTools);
      break;
    case 'line':
      drawLine(drawingTools);
      break;
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
  setSelectedShape: React.Dispatch<React.SetStateAction<number>>,
  selectedShape: number,
  setShapes: React.Dispatch<React.SetStateAction<Shape[]>>,
  draggingShape: Shape | null,
  setDraggingShape: React.Dispatch<React.SetStateAction<Shape | null>>,
  textRef?: React.MutableRefObject<null | HTMLInputElement>
) => {
  if (!cnv || !cnv.current || (textRef && textRef.current)) return;

  setStartXandY(
    startX,
    startY,
    e.nativeEvent.clientX,
    e.nativeEvent.clientY,
    cnv.current.offsetLeft,
    cnv.current.offsetTop
  );

  setDrawing(true);

  switch (tool) {
    case 'select':
      const uId = findNearestShape(startX.current, startY.current, shapes);
      if (uId !== -1) {
        startUpdatingShape(
          shapes[uId],
          contextRef,
          e.nativeEvent.offsetX,
          e.nativeEvent.offsetY
        );

        const filteredShapes = shapes.filter((_, ind) => uId !== ind);
        setSelectedShape(uId);
        setDraggingShape(shapes[uId]);
        setShapes(filteredShapes);
        setWriting(false);
        return;
      }
      break;
    case 'text':
      setWriting(true);
      setSelectedShape(-1);
      setDraggingShape(null);
      return;
  }

  setWriting(false);
  setSelectedShape(-1);
  setDraggingShape(null);
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
  selectedShape: number,
  setSelectedShape: React.Dispatch<React.SetStateAction<number>>,
  draggingShape: Shape | null,
  setDraggingShape: React.Dispatch<React.SetStateAction<Shape | null>>,
  textRef?: React.MutableRefObject<null | HTMLInputElement>
) => {

  if (tool == '') return;
  if (!startX.current || !startY.current) return;
  setTool('select');
  setDrawing(false);
  setWriting(false);
  if (tool === 'select' && !draggingShape) return;
  if (tool === 'text') {
    textRef?.current?.blur();
    return;
  }

  const { offsetX, offsetY } = e.nativeEvent;

  let shape: Shape = {
    type: tool,
    startX: startX.current,
    startY: startY.current,
    endX: offsetX,
    endY: offsetY,
  };

  if (tool === 'select' && draggingShape) {
    shape = {
      type: draggingShape.type,
      startX: offsetX,
      startY: offsetY,
      endX: offsetX + draggingShape.endX - draggingShape.startX,
      endY: offsetY + draggingShape.endY - draggingShape.startY,
    };
  }

  contextRef.current?.closePath();
  setShapes((prev) => {
    return [...prev, shape];
  });
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
