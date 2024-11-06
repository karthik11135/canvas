export interface Shape {
  type: string;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  text?: string;
  selected?: boolean;
}

export interface TypeText {
  startX: number;
  startY: number;
  text: string;
}

export interface drawShapeProps {
  ctx: CanvasRenderingContext2D | null;
  startX: number;
  startY: number;
  offSetX: number;
  offSetY: number;
  textStr?: string;
  dotted?: boolean;
}

export interface dragginShapeType {
  ctx: CanvasRenderingContext2D | null;
  startX: number;
  startY: number;
  offSetX: number;
  offSetY: number;
}
