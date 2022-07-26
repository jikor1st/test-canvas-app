import {
  useEffect,
  useState,
  useRef,
  MouseEvent,
  TouchEvent,
  PointerEvent,
  Suspense,
} from 'react';
import PolyfillResizeObserver from 'resize-observer-polyfill';
import styled from 'styled-components';

// modules
import { lazily } from 'react-lazily';

// utils
import { utils } from '@/lib/utils';

// base-components
const { BaseCanvas } = lazily(() => import('@/base-components'));

type pointType = { x: number; y: number };

const CanvasResizeDrawPage = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D>();
  const canvasInformRef = useRef({
    width: 0,
    height: 0,
    pixelRatio: utils.context.pixelRatio(),
  });
  const pptsRef = useRef<pointType[]>([]);

  const ContainerResizeObserverRef = useRef<ResizeObserver>();

  const [isDown, setIsDown] = useState<boolean>(false);

  useEffect(() => {
    init();
    initObserver();

    return () => {
      if (!ContainerResizeObserverRef.current || !containerRef.current) return;
      ContainerResizeObserverRef.current.unobserve(containerRef.current);
      ContainerResizeObserverRef.current.disconnect();
    };
  }, []);

  const canvasSizeSetting = (width: number, height: number) => {
    if (!canvasRef.current) return;

    const resultWidth = width * canvasInformRef.current.pixelRatio;
    const resultHeight = height * canvasInformRef.current.pixelRatio;
    canvasRef.current.width = resultWidth;
    canvasRef.current.height = resultHeight;
    canvasInformRef.current.width = resultWidth;
    canvasInformRef.current.height = resultHeight;
  };

  const canvasContextSetting = (context: CanvasRenderingContext2D) => {
    if (!context) return;
    context.scale(
      canvasInformRef.current.pixelRatio,
      canvasInformRef.current.pixelRatio,
    );
    context.lineCap = 'round';
    context.strokeStyle = 'black';
    context.lineWidth = 3;
    contextRef.current = context;
  };

  const init = () => {
    if (!canvasRef.current || !containerRef.current) return;
    const { clientWidth, clientHeight } = containerRef.current;
    canvasSizeSetting(clientWidth, clientHeight);
    const getContext = canvasRef.current.getContext('2d');
    if (!getContext) return;
    canvasContextSetting(getContext);
  };

  const initObserver = () => {
    if (!containerRef.current) return;
    ContainerResizeObserverRef.current = window.ResizeObserver
      ? new ResizeObserver(entries => {
          for (let entry of entries) {
            if (entry.contentBoxSize) {
              const contentBoxSize = Array.isArray(entry.contentBoxSize)
                ? entry.contentBoxSize[0]
                : entry.contentBoxSize;
              if (contextRef.current) {
                canvasInformRef.current.pixelRatio = utils.context.pixelRatio();
                const temp = contextRef.current.getImageData(
                  0,
                  0,
                  canvasInformRef.current.width,
                  canvasInformRef.current.height,
                );
                canvasSizeSetting(
                  contentBoxSize.inlineSize,
                  contentBoxSize.blockSize,
                );
                canvasContextSetting(contextRef.current);
                contextRef.current.putImageData(temp, 0, 0);
              }
            }
          }
        })
      : new PolyfillResizeObserver(entries => {});
    ContainerResizeObserverRef.current.observe(containerRef.current);
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
  position: relative;
`;

export { CanvasResizeDrawPage };
