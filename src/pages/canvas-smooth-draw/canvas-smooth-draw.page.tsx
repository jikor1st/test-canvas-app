import { useEffect, useState, useRef, PointerEvent, Suspense } from 'react';
import styled from 'styled-components';

// modules
import { lazily } from 'react-lazily';

// utils
import { utils } from '@/lib/utils';

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
      const { offsetWidth, offsetHeight } = target as HTMLElement;
      width = offsetWidth;
      height = offsetHeight;
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

  const handlePointerDown = ({ nativeEvent }: PointerEvent) => {
    if (!contextRef.current) return;
    setIsDown(true);

    const { offsetX, offsetY } = nativeEvent;

    utils.context.drawDot(contextRef.current, {
      x: offsetX,
      y: offsetY,
      radius: contextRef.current.lineWidth / 2,
    });

    pptsRef.current.push({ x: offsetX, y: offsetY });
  };

  const handlePointerMove = ({ nativeEvent }: PointerEvent) => {
    if (!isDown || !contextRef.current) return;

    const { offsetX, offsetY } = nativeEvent;

    const ppts = pptsRef.current;
    ppts.push({ x: offsetX, y: offsetY });

    utils.context.drawLineCurve(contextRef.current, { points: ppts });
  };

  const handlePointerUp = () => {
    setIsDown(false);
    pptsRef.current = [];
  };

  return (
    <Container>
      <CanvasWrap ref={containerRef}>
        <Suspense fallback={<div>캔버스 불러오는중...</div>}>
          <BaseCanvas
            ref={canvasRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
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
  font-size: 0;
`;

export { CanvasSmoothDrawPage };
