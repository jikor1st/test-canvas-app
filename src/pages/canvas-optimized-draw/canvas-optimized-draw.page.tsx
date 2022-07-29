import { useEffect, useState, useRef, PointerEvent } from 'react';
import PolyfillResizeObserver from 'resize-observer-polyfill';
import styled from 'styled-components';

// modules
import { NamedLazy } from '@/core/modules';

// utils
import { utils } from '@/lib/utils';

// base-components
const { BaseCanvas } = NamedLazy(() => import('@/base-components'));

type pointType = { x: number; y: number };

const CanvasOptimizedDrawPage: React.FC = () => {
  // element
  const containerElRef = useRef<HTMLDivElement>(null);
  const canvasElRef = useRef<HTMLCanvasElement>(null);

  // object
  const contextRef = useRef<CanvasRenderingContext2D>();
  const informRef = useRef({
    stageWidth: 0,
    stageHeight: 0,
    pixelRatio: utils.context.pixelRatio(),
  });

  // variable
  const startPointRef = useRef({ x: 0, y: 0 });
  const movePointsRef = useRef<pointType[]>([]);
  const [isDown, setIsDown] = useState<boolean>(false);

  useEffect(() => {
    init();

    return () => {};
  }, []);

  const canvasSizeSetting = (width: number, height: number) => {
    if (!canvasElRef.current) return;

    const resultWidth = width * informRef.current.pixelRatio;
    const resultHeight = height * informRef.current.pixelRatio;
    canvasElRef.current.width = resultWidth;
    canvasElRef.current.height = resultHeight;
    informRef.current.stageWidth = resultWidth;
    informRef.current.stageHeight = resultHeight;
  };

  const init = () => {
    if (!canvasElRef.current || !canvasElRef.current) return;
    const { clientWidth, clientHeight } = canvasElRef.current;
    canvasSizeSetting(clientWidth, clientHeight);
    const getContext = canvasElRef.current.getContext('2d');
    if (!getContext) return;
    getContext.scale(
      informRef.current.pixelRatio,
      informRef.current.pixelRatio,
    );
    getContext.lineCap = 'round';
    getContext.strokeStyle = 'black';
    getContext.lineWidth = 10;
    contextRef.current = getContext;
  };

  const handlePointerDown = ({ nativeEvent }: PointerEvent) => {
    setIsDown(true);
    if (!contextRef.current) return;

    const { offsetX, offsetY } = nativeEvent;

    utils.context.drawDot(contextRef.current, {
      x: offsetX,
      y: offsetY,
      radius: contextRef.current.lineWidth / 2,
    });

    movePointsRef.current.push({ x: offsetX, y: offsetY });
    startPointRef.current = { x: offsetX, y: offsetY };
  };

  const handlePointerMove = ({ nativeEvent }: PointerEvent) => {
    if (!isDown || !contextRef.current) return;
    const { offsetX, offsetY } = nativeEvent;

    movePointsRef.current.push({ x: offsetX, y: offsetY });

    if (movePointsRef.current.length > 3) {
      const { context, endPoint } = utils.context.drawLineQuadraticWithPoints(
        contextRef.current,
        {
          startPoint: startPointRef.current,
          movePoints: movePointsRef.current,
        },
      );
      contextRef.current = context;
      startPointRef.current = endPoint;
    }
  };

  const handlePointerUp = () => {
    if (!isDown || !contextRef.current) return;
    if (movePointsRef.current.length > 3) {
      const { context } = utils.context.drawLineQuadraticWithPoints(
        contextRef.current,
        {
          startPoint: startPointRef.current,
          movePoints: movePointsRef.current,
        },
      );
      contextRef.current = context;
    }
    setIsDown(false);
    movePointsRef.current = [];
    startPointRef.current = { x: 0, y: 0 };
  };

  return (
    <Container>
      <CanvasWrap ref={containerElRef}>
        <BaseCanvas
          ref={canvasElRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
        />
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
  position: relative;
`;

export { CanvasOptimizedDrawPage };
