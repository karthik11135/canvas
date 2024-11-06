import { Gloria_Hallelujah } from 'next/font/google';

const roboto = Gloria_Hallelujah({
  weight: '400',
  subsets: ['latin'],
});

export const drawConfig = (
  cnv: React.RefObject<HTMLCanvasElement>,
  contextRef: React.MutableRefObject<CanvasRenderingContext2D | null>
) => {
  const canvas = cnv.current;
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  canvas.style.width = window.innerWidth + "px";
  canvas.style.height = window.innerHeight + "px";

  var scale = window.devicePixelRatio; 
  canvas.width =  window.innerWidth * scale;
  canvas.height = window.innerHeight * scale;

  ctx.scale(scale, scale);
  ctx.translate(0.5, 0.5);
  contextRef.current = ctx;
  ctx.lineWidth = 3;
  ctx.lineCap = 'round';
  ctx.font = `bold 16px ${roboto.style.fontFamily}`;
  ctx.textBaseline = 'middle';
  ctx.lineJoin = 'miter';
  ctx.miterLimit = 200;
};
