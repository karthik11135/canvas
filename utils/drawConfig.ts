
import {Gloria_Hallelujah} from 'next/font/google'

const ifFont = Gloria_Hallelujah({
  weight: "400", 
  subsets: ['latin']
})

export const drawConfig = (
  cnv: React.RefObject<HTMLCanvasElement>,
  contextRef: React.MutableRefObject<CanvasRenderingContext2D | null>
) => {
  const canvas = cnv.current;
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  console.log(ctx);
  ctx.translate(0.5, 0.5);
  contextRef.current = ctx;
  ctx.lineWidth = 3;
  ctx.lineCap = 'round';
  ctx.font = `16px san-serif`;
  ctx.lineJoin = 'miter';
  ctx.miterLimit = 200;
};
