'use client';
import Buttons from '@/components/Buttons';
import { useEffect, useRef, useState } from 'react';
import { drawConfig } from '@/utils/drawConfig';
import { Gloria_Hallelujah } from 'next/font/google';
import {
  mouseUpHandler,
  mouseMoveHandler,
  mouseDownHandler,
  textFocusOutHandler,
  textOnFocusHandler,
} from '@/utils/handlers';
import { Shape } from '@/types/alltypes';
import HeaderTools from '@/components/HeaderTools';

const ifFont = Gloria_Hallelujah({
  weight: '400',
  subsets: ['latin'],
});

export default function Home() {
  const cnv = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<null | CanvasRenderingContext2D>(null);
  const textRef = useRef<null | HTMLInputElement>(null);
  const startX = useRef<null | number>(null);
  const startY = useRef<null | number>(null);
  const [tool, setTool] = useState('');
  const [drawing, setDrawing] = useState(false);
  const [shapes, setShapes] = useState<Shape[]>([]);
  const [selectedShape, setSelectedShape] = useState<number>(-1);
  const [writing, setWriting] = useState(false);
  const [draggingShape, setDraggingShape] = useState<Shape | null>(null);

  useEffect(() => {
    drawConfig(cnv, contextRef);
  }, []);

  return (
    <div className={``}>
      <div className="bg-yellow-800">
        <HeaderTools tool={tool} setTool={setTool} />
        {writing && (
          <div className={`${ifFont.className} font-bold`}>
            <input
              onBlur={() =>
                textFocusOutHandler(
                  contextRef,
                  textRef,
                  startX,
                  startY,
                  setShapes
                )
              }
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
              className={`absolute text-black border-2`}
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
              selectedShape,
              setSelectedShape,
              draggingShape,
              setDraggingShape,
              shapes,
              cnv,
              textRef
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
              setSelectedShape,
              selectedShape,
              setShapes,
              draggingShape,
              setDraggingShape,
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
              shapes,
              selectedShape,
              setShapes,
              setSelectedShape,
              draggingShape,
              setDraggingShape
            )
          }
          width={1450}
          height={1000}
          className="bg-white mx-auto overflow-hidden rounded border border-black"
          ref={cnv}
        ></canvas>
      </div>
    </div>
  );
}
