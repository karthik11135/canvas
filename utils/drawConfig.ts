
export const drawConfig = (
  cnv: React.RefObject<HTMLCanvasElement>,
  contextRef: React.MutableRefObject<CanvasRenderingContext2D | null>
) => {
  const canvas = cnv.current;
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  ctx.translate(0.5, 0.5);
  contextRef.current = ctx;
  ctx.lineWidth = 3;
  ctx.lineCap = 'round';
  ctx.font = `16px san-serif`;
  ctx.lineJoin = 'miter';
  ctx.miterLimit = 200;
};
