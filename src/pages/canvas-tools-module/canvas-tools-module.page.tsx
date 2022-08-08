import React, {
  useMemo,
  useEffect,
  useState,
  useLayoutEffect,
  useRef,
  useCallback,
  PointerEvent as ReactPointerEvent,
} from 'react';

import styled from 'styled-components';

import PolyfillResizeObserver from 'resize-observer-polyfill';

// modules
import { NamedLazy } from '@/core/modules';

// utils
import { utils } from '@/lib/utils';

//hooks
import {
  useConditionEffect,
  useResizeObserver,
  useDevicePixelRatio,
  useCanvasLayer,
} from '@/lib/hooks';
// components
import { ToolBar, ToolWrap, Color, LineWidth, Zoom } from '@/components';

// base-components
const { BaseCanvas } = NamedLazy(() => import('@/base-components'));

type pointType = { x: number; y: number };

const ZOOM_PERCENT_DIGIT = 200;
const ZOOM_MIN = 0.1;
const ZOOM_MAX = 4;

// const TOOL_BAR = {
//   top:
// }

const CanvasToolsModulePage: React.FC = () => {
  // canvas variable
  const containerElRef = useRef<HTMLDivElement>(null);
  const canvasElRef = useRef<HTMLCanvasElement>(null);
  const containerResizeObserverRef = useRef<ResizeObserver | null>(null);

  const [isPointerDown, setIsPointerDown] = useState<boolean>(false);
  const [zoom, setZoom] = useState(1);

  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const pixelRatio = useRef<number>(utils.method.pixelRatio());

  // canvas settings
  useEffect(() => {
    ininitialize();
    initialResizeObserver();
    return () => {
      if (!containerResizeObserverRef.current || !containerElRef.current)
        return;
      containerResizeObserverRef.current.unobserve(containerElRef.current);
      containerResizeObserverRef.current.disconnect();
    };
  }, []);
  const ininitialize = useCallback(() => {
    if (!containerElRef.current || !canvasElRef.current) return;
    const { offsetWidth, offsetHeight } = containerElRef.current;
    canvasSetSize(offsetWidth, offsetHeight);
    if (!canvasElRef.current) return;
    const getContext = canvasElRef.current.getContext('2d');
    if (!getContext) return;
    contextRef.current = getContext;
    canvasSetContext(contextRef.current);
  }, [containerElRef.current, canvasElRef.current]);

  const canvasSetSize = (width: number, height: number) => {
    if (!canvasElRef.current) return;
    canvasElRef.current.width = width * pixelRatio.current;
    canvasElRef.current.height = height * pixelRatio.current;
    canvasElRef.current.style.width = `${width}px`;
    canvasElRef.current.style.height = `${height}px`;
  };
  const canvasSetContext = useCallback(
    (context: CanvasRenderingContext2D) => {
      context.scale(pixelRatio.current, pixelRatio.current);
    },
    [containerElRef.current, canvasElRef.current],
  );
  useDevicePixelRatio(pixelRatioValue => {
    pixelRatio.current = pixelRatioValue;
  });

  const onContainerElResize = ({
    width,
    height,
  }: {
    width: number;
    height: number;
  }) => {
    canvasSetSize(width, height);
    if (contextRef.current) canvasSetContext(contextRef.current);
    draw();
  };

  const initialResizeObserver = () => {
    if (!containerElRef.current) return;
    const handleResizeObserver = (entries: ResizeObserverEntry[]) => {
      for (let entry of entries) {
        const { inlineSize, blockSize } = Array.isArray(entry.contentBoxSize)
          ? entry.contentBoxSize[0]
          : (entry.contentBoxSize as ResizeObserverSize[]);
        onContainerElResize({
          width: inlineSize,
          height: blockSize,
        });
      }
    };
    containerResizeObserverRef.current = window.ResizeObserver
      ? new ResizeObserver(handleResizeObserver)
      : new PolyfillResizeObserver(handleResizeObserver);
    if (containerResizeObserverRef.current)
      containerResizeObserverRef.current.observe(containerElRef.current);
  };

  // canvas method
  const draw = () => {
    if (!contextRef.current) return;
    const polygon = [
      { x: 200, y: 50 },
      { x: 300, y: 200 },
      { x: 100, y: 200 },
    ];
    utils.draw.polygon(contextRef.current, {
      polygons: polygon,
      fillStyle: '#ff0000',
      strokeStyle: '#000000',
      lineWidth: 10,
    });
  };

  const tttt = () => {
    if (!contextRef.current) return;
    const polygon = [
      { x: 200, y: 400 },
      { x: 300, y: 550 },
      { x: 100, y: 550 },
    ];
    utils.draw.polygon(contextRef.current, {
      polygons: polygon,
      fillStyle: '#ff0000',
      strokeStyle: '#000000',
      lineWidth: 10,
    });
  };

  // canvas handler
  const handlePointerDown = () => {
    setIsPointerDown(true);
  };
  const handlePointerMove = () => {
    if (!isPointerDown) return;
    // logic
  };
  const handlePointerUp = () => {
    setIsPointerDown(false);
  };

  return (
    <Container>
      <ToolBar
        width={'100%'}
        height={'50px'}
        modules={[
          <Zoom zoom={zoom} onClickZoom={() => {}} />,
          <button
            onClick={() => {
              tttt();
            }}
          >
            추가
          </button>,
        ]}
      />
      <FullScreen>
        <CanvasContainer ref={containerElRef}>
          <BaseCanvas
            ref={canvasElRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
          />
        </CanvasContainer>
      </FullScreen>
    </Container>
  );
};
const Container = styled.div`
  position: relative;
  display: flex;
  flex-flow: column;
  width: 100%;
  height: 100vh;
  user-select: none;
`;
const FullScreen = styled.div`
  position: relative;
  flex: 1 1 auto;
`;
const CanvasContainer = styled.div`
  position: absolute;
  width: auto;
  height: auto;
  inset: 0;
  overflow: hidden;
  background: #cccccc;
  font-size: 0;
`;

export { CanvasToolsModulePage };
