'use client';
import Buttons from '@/utils/Buttons';
import { useEffect, useRef, useState } from 'react';
import { drawConfig } from '@/utils/drawConfig';

import { Gloria_Hallelujah } from 'next/font/google';

import {
  mouseUpHandler,
  mouseMoveHandler,
  mouseDownHandler,
  textFocusOutHandler,
  textOnFocusHandler
} from '@/utils/handlers';

export interface Shape {
  type: string;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  text?: string;
}

export interface TypeText {
  startX: number;
  startY: number;
  text: string;
}

const ifFont = Gloria_Hallelujah({
  weight: '400',
  subsets: ['latin'],
});

export default function Home() {
  const cnv = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<null | CanvasRenderingContext2D>(null);
  const [tool, setTool] = useState('');
  const [drawing, setDrawing] = useState(false);
  const [shapes, setShapes] = useState<Shape[]>([]);
  const [writing, setWriting] = useState(false);
  const textRef = useRef<null | HTMLInputElement>(null);
  const startX = useRef<null | number>(null);
  const startY = useRef<null | number>(null);

  console.log(shapes)

  useEffect(() => {
    drawConfig(cnv, contextRef);
  }, []);

  return (
    <div className={`flex h-screen text-center items-center justify-center`}>
      <div>
        <h1>Canvas</h1>
        <Buttons tool={tool} setTool={setTool} />
        {writing && (
          <div className={`${ifFont.className} font-bold`}>
            <input
              onBlur={() => textFocusOutHandler(contextRef, textRef, startX, startY, setShapes)}
              onFocus={textOnFocusHandler}
              ref={textRef}
              style={{
                top:
                  Number(startY.current) +
                  Number(cnv.current?.getBoundingClientRect().top) -
                  10,
                left:
                  Number(startX.current) +
                  Number(cnv.current?.getBoundingClientRect().left),
              }}
              className={`absolute text-black border-2 `}
            ></input>
          </div>
        )}
        <canvas
          onMouseUp={(e) =>
            mouseUpHandler(
              e,
              contextRef,
              setDrawing,
              startX,
              startY,
              tool,
              setShapes,
              setTool,
              setWriting,
              textRef, 
            )
          }
          onMouseDown={(e) =>
            mouseDownHandler(
              e,
              cnv,
              startX,
              startY,
              contextRef,
              tool,
              setDrawing,
              shapes,
              setWriting,
              textRef
            )
          }
          onMouseMove={(e) =>
            mouseMoveHandler(
              e,
              drawing,
              tool,
              cnv,
              startX,
              startY,
              contextRef,
              shapes
            )
          }
          width={1000}
          height={800}
          className="bg-white overflow-hidden rounded border border-black"
          ref={cnv}
        ></canvas>
      </div>
    </div>
  );
}
