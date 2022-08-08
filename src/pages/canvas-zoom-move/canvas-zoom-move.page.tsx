import React, {
  useMemo,
  useEffect,
  useState,
  useRef,
  useCallback,
  PointerEvent as ReactPointerEvent,
} from 'react';

import styled from 'styled-components';

// modules
import { NamedLazy } from '@/core/modules';

// utils
import { utils } from '@/lib/utils';

//hooks
import { useConditionEffect } from '@/lib/hooks';
// components
import { ToolWrap, Color, LineWidth, Zoom } from '@/components';

// base-components
const { BaseCanvas } = NamedLazy(() => import('@/base-components'));

type pointType = { x: number; y: number };

const ZOOM_PERCENT_DIGIT = 200;
const ZOOM_MIN = 0.1;
const ZOOM_MAX = 4;

const CanvasZoomMovePage: React.FC = () => {
  // element
  const containerElRef = useRef<HTMLDivElement>(null);
  const canvasElRef = useRef<HTMLCanvasElement>(null);

  // object
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const pixelRatioRef = useRef<number>(utils.context.pixelRatio());
  const pointsRef: any = useRef({
    down: [],
    move: [],
  });
  const distanceRef = useRef({
    down: 0,
    move: 0,
    up: ZOOM_PERCENT_DIGIT,
  });
  const centerPosRef = useRef({
    down: { x: 0, y: 0 },
    move: { x: 0, y: 0 },
    up: { x: 0, y: 0 },
  });

  // variable
  const [keyDown, setKeyDown] = useState<string[]>([]);
  const [isDown, setIsDown] = useState<boolean>(false);
  const [zoom, setZoom] = useState<number>(1);
  const [translate, setTranslate] = useState<pointType>({ x: 0, y: 0 });

  useEffect(() => {
    addEvent();
    init();

    return () => {
      removeEvent();
    };
  }, []);

  const handleWindow = (event: KeyboardEvent) => {
    event.preventDefault();
    const downKey = event.key;
    if (event.type === 'keydown') {
      setKeyDown(prev => {
        const temp = [...prev];
        const findIndex = temp.findIndex(item => item === downKey);
        if (findIndex !== -1) {
          temp.splice(findIndex, 1);
        }
        temp.push(downKey);
        return temp;
      });
    } else if (event.type === 'keyup') {
      setKeyDown(prev => {
        const temp = [...prev];
        const findIndex = temp.findIndex(item => item === downKey);
        if (findIndex !== -1) {
          temp.splice(findIndex, 1);
        }
        return temp;
      });
    }
  };

  const addEvent = () => {
    window.addEventListener('keydown', handleWindow);
    window.addEventListener('keyup', handleWindow);
  };

  const removeEvent = () => {
    window.removeEventListener('keydown', handleWindow);
    window.removeEventListener('keyup', handleWindow);
  };

  const init = () => {
    if (!canvasElRef.current || !canvasElRef.current || !containerElRef.current)
      return;

    const containerRect = containerElRef.current.getBoundingClientRect();

    canvasElRef.current.width = containerRect.width * pixelRatioRef.current;
    canvasElRef.current.height = containerRect.height * pixelRatioRef.current;
    canvasElRef.current.style.width = `${containerRect.width}px`;
    canvasElRef.current.style.height = `${containerRect.height}px`;

    const getContext = canvasElRef.current.getContext('2d');
    if (!getContext) return;
    getContext.scale(pixelRatioRef.current, pixelRatioRef.current);
    contextRef.current = getContext;

    drawCanvas();
  };

  const drawCanvas = () => {
    if (!contextRef.current || !canvasElRef.current) return;
    const canvasWidth = 420;
    const canvasHeight = 420;
    utils.draw.rect(contextRef.current, {
      x: canvasElRef.current.width / 2 - canvasWidth / 2,
      y: canvasElRef.current.height / 2 - canvasHeight / 2,
      width: canvasWidth,
      height: canvasHeight,
      fillStyle: '#ffffff',
    });
  };

  const getCenter = (p1: pointType, p2: pointType) => {
    return {
      x: (p1.x + p2.x) / 2,
      y: (p1.y + p2.y) / 2,
    };
  };

  const getDistance = (p1: pointType, p2: pointType) => {
    return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
  };

  const multiPointer = (targetPoints: any, pointEvent: PointerEvent) => {
    const findIndex = targetPoints.findIndex(
      (item: any) => item.pointerId === pointEvent.pointerId,
    );

    if (findIndex === -1) {
      targetPoints.push(pointEvent);
    } else {
      targetPoints[findIndex] = pointEvent;
    }
  };

  const onDown = ({ nativeEvent }: ReactPointerEvent) => {
    if (!contextRef.current) return;
    setIsDown(true);

    multiPointer(pointsRef.current.down, nativeEvent);

    const [touch1] = pointsRef.current.down;
    const p1 = {
      x: touch1.layerX,
      y: touch1.layerY,
    };
    centerPosRef.current.down = p1;

    if (pointsRef.current.down.length >= 2) {
      const [touch1, touch2] = pointsRef.current.down;
      const p1 = {
        x: touch1.offsetX,
        y: touch1.offsetY,
      };
      const p2 = {
        x: touch2.offsetX,
        y: touch2.offsetY,
      };
      const center = getCenter(p1, p2);
      const distance = getDistance(p1, p2);
      centerPosRef.current.down = center;
      distanceRef.current.down = distance;
    }
  };

  const onMove = ({ nativeEvent }: ReactPointerEvent) => {
    if (!isDown || !contextRef.current || !canvasElRef.current) return;

    multiPointer(pointsRef.current.move, nativeEvent);

    if (keyDown.some(item => item === ' ')) {
      const [touch1] = pointsRef.current.move;
      const p1 = {
        x: touch1.layerX,
        y: touch1.layerY,
      };
      centerPosRef.current.move = p1;
      const diffCenter = {
        x: p1.x - centerPosRef.current.down.x + centerPosRef.current.up.x,
        y: p1.y - centerPosRef.current.down.y + centerPosRef.current.up.y,
      };
      setTranslate(prev =>
        diffCenter.x !== prev.x || diffCenter.y !== prev.y ? diffCenter : prev,
      );

      return;
    }

    if (pointsRef.current.move.length >= 2) {
      const [touch1, touch2] = pointsRef.current.move;
      const p1 = {
        x: touch1.offsetX,
        y: touch1.offsetY,
      };
      const p2 = {
        x: touch2.offsetX,
        y: touch2.offsetY,
      };
      const center = getCenter(p1, p2);
      const distance = getDistance(p1, p2);
      const diffCenter = {
        x: center.x - centerPosRef.current.down.x + centerPosRef.current.up.x,
        y: center.y - centerPosRef.current.down.y + centerPosRef.current.up.y,
      };
      const diffDistance =
        distance - distanceRef.current.down + distanceRef.current.up;

      centerPosRef.current.move = diffCenter;
      setTranslate(prev =>
        diffCenter.x !== prev.x || diffCenter.y !== prev.y ? diffCenter : prev,
      );

      const newZoom = diffDistance / ZOOM_PERCENT_DIGIT;
      setZoom(prev =>
        setZoomMinMax(prev, newZoom, () => {
          distanceRef.current.move = diffDistance;
        }),
      );
    }
  };

  const setZoomMinMax = (
    prevValue: number,
    newValue: number,
    isValid?: () => void,
  ) => {
    if (ZOOM_MIN <= newValue && newValue <= ZOOM_MAX) {
      typeof isValid === 'function' && isValid();
      return toFixed(newValue);
    } else {
      return prevValue;
    }
  };

  const toFixed = (num: number) => {
    return parseFloat(num.toFixed(3));
  };

  const onUp = () => {
    setIsDown(false);
    centerPosRef.current.up = centerPosRef.current.move;
    distanceRef.current.up = distanceRef.current.move;
    pointsRef.current.down = [];
    pointsRef.current.move = [];
  };

  useConditionEffect(
    () => {
      redraw({
        translate: translate,
        zoomState: zoom,
      });
    },
    [translate, zoom],
    { componentDidMountCondition: false },
  );

  const redraw = ({
    translate,
    zoomState = 1,
  }: {
    translate: pointType;
    zoomState: number;
  }) => {
    if (!contextRef.current || !canvasElRef.current) return;
    contextRef.current.beginPath();
    contextRef.current.clearRect(
      0,
      0,
      canvasElRef.current.width * pixelRatioRef.current,
      canvasElRef.current.height * pixelRatioRef.current,
    );
    utils.method.setTransform(contextRef.current, {
      scale: {
        h: zoomState * pixelRatioRef.current,
        v: zoomState * pixelRatioRef.current,
      },
      move: {
        h: translate.x * pixelRatioRef.current,
        v: translate.y * pixelRatioRef.current,
      },
    });
    drawCanvas();
  };

  const handleClickZoom = useCallback((value: string) => {
    const digit = 0.1;
    if (value === '+') {
      setZoom(prev =>
        setZoomMinMax(prev, prev + digit, () => {
          distanceRef.current.move = toFixed(prev + digit) * ZOOM_PERCENT_DIGIT;
        }),
      );
    } else if (value === '-') {
      setZoom(prev =>
        setZoomMinMax(prev, prev - digit, () => {
          distanceRef.current.move = toFixed(prev - digit) * ZOOM_PERCENT_DIGIT;
        }),
      );
    }
  }, []);

  return (
    <Container>
      <ToolWrap
        modules={useMemo(
          () => [<Zoom zoom={zoom} onClickZoom={handleClickZoom} />],
          [zoom],
        )}
      />
      <CanvasWrap ref={containerElRef}>
        <BaseCanvas
          ref={canvasElRef}
          onPointerDown={onDown}
          onPointerMove={onMove}
          onPointerUp={onUp}
        />
      </CanvasWrap>
    </Container>
  );
};
const Container = styled.div`
  width: auto;
  height: auto;
`;
const CanvasWrap = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: auto;
  height: auto;
  font-size: 0;
  inset: 120px 0 0 0;
  background: #cccccc;
  overflow: hidden;
`;

export { CanvasZoomMovePage };
