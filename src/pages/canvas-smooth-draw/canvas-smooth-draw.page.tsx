import { useEffect, useState, useRef, MouseEvent, Suspense } from 'react';
import styled from 'styled-components';

// modules
import { lazily } from 'react-lazily';

// utils
import { contextDot } from '@/lib/utils';

// base-components
const { BaseCanvas } = lazily(() => import('@/base-components'));

const pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;
type pointType = { x: number; y: number };

const CanvasSmoothDrawPage = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D>();
  const canvasInformRef = useRef({ width: 0, height: 0 });
  const pptsRef = useRef<pointType[]>([]);

  const [isDown, setIsDown] = useState<boolean>(false);

  useEffect(() => {
    initCanvas();
  }, []);

  const canvasSizeSetting = (
    canvasElement: HTMLCanvasElement,
    target: Window | HTMLElement,
  ) => {
    let width = 0;
    let height = 0;
    if (target === window) {
      const { innerWidth, innerHeight } = target as Window;
      width = innerWidth;
      height = innerHeight;
    } else {
      const { clientWidth, clientHeight } = target as HTMLElement;
      width = clientWidth;
      height = clientHeight;
    }

    const resultWidth = width * pixelRatio;
    const resultHeight = height * pixelRatio;
    canvasElement.width = resultWidth;
    canvasElement.height = resultHeight;
    canvasInformRef.current = { width: resultWidth, height: resultHeight };
  };
  const canvasContextSetting = (canvasElement: HTMLCanvasElement) => {
    const getContext = canvasElement.getContext('2d');

    if (!getContext) return;

    getContext.scale(pixelRatio, pixelRatio);
    getContext.lineCap = 'round';
    getContext.strokeStyle = 'black';
    getContext.lineWidth = 3;
    contextRef.current = getContext;
  };

  const initCanvas = () => {
    if (!canvasRef.current || !containerRef.current) return;
    const canvasEl = canvasRef.current;
    const containerEl = containerRef.current;
    canvasSizeSetting(canvasEl, containerEl);
    canvasContextSetting(canvasEl);
  };

  const handleMouseDown = ({ nativeEvent }: MouseEvent) => {
    if (!contextRef.current) return;
    setIsDown(true);

    const { offsetX, offsetY } = nativeEvent;

    contextDot(contextRef.current, {
      x: offsetX,
      y: offsetY,
      radius: contextRef.current.lineWidth / 2,
    });

    pptsRef.current.push({ x: offsetX, y: offsetY });
  };

  const handleMouseMove = ({ nativeEvent }: MouseEvent) => {
    if (!isDown || !contextRef.current) return;

    const { offsetX, offsetY } = nativeEvent;

    const ppts = pptsRef.current;
    ppts.push({ x: offsetX, y: offsetY });

    contextRef.current.beginPath();
    contextRef.current.moveTo(ppts[0].x, ppts[0].y);

    for (let i = 1; i < ppts.length - 2; i++) {
      const c = (ppts[i].x + ppts[i + 1].x) / 2;
      const d = (ppts[i].y + ppts[i + 1].y) / 2;

      contextRef.current.quadraticCurveTo(ppts[i].x, ppts[i].y, c, d);
    }

    contextRef.current.stroke();
  };

  const handleMouseUp = () => {
    setIsDown(false);
    pptsRef.current = [];
  };

  return (
    <Container>
      <CanvasWrap ref={containerRef}>
        <Suspense fallback={<div>캔버스 불러오는중...</div>}>
          <BaseCanvas
            ref={canvasRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
          />
        </Suspense>
      </CanvasWrap>
    </Container>
  );
};
const Container = styled.div`
  width: 100%;
  height: 100%;
`;
const CanvasWrap = styled.div`
  width: 100%;
  height: 100%;
`;

export { CanvasSmoothDrawPage };
