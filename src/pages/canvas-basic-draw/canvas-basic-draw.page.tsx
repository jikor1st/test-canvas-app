import { useEffect, useState, useRef, PointerEvent } from 'react';

// modules
import { lazily } from 'react-lazily';

// base-components
const { BaseCanvas } = lazily(() => import('@/base-components'));

const pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;

const CanvasBasicDrawPage = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);

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
    canvasElement.width = width * pixelRatio;
    canvasElement.height = height * pixelRatio;
  };
  const canvasContextSetting = (canvasElement: HTMLCanvasElement) => {
    const getContext = canvasElement.getContext('2d');

    if (!getContext) return;
    getContext.scale(pixelRatio, pixelRatio);
    getContext.lineCap = 'round';
    getContext.strokeStyle = 'black';
    getContext.lineWidth = 5;
    contextRef.current = getContext;
  };

  const initCanvas = () => {
    if (!canvasRef.current) return;
    const canvasEl = canvasRef.current;
    canvasSizeSetting(canvasEl, window);
    canvasContextSetting(canvasEl);
  };

  const handlePointerDown = ({ nativeEvent }: PointerEvent) => {
    setIsDown(true);

    const context = contextRef.current;
    if (!context) return;

    const { offsetX, offsetY } = nativeEvent;

    context.beginPath();
    context.moveTo(offsetX, offsetY);
  };

  const handlePointerMove = ({ nativeEvent }: PointerEvent) => {
    if (!isDown) return;

    const context = contextRef.current;
    if (!context) return;

    const { offsetX, offsetY } = nativeEvent;
    context.lineTo(offsetX, offsetY);
    context.stroke();
  };

  const handlePointerUp = () => {
    setIsDown(false);
    const context = contextRef.current;
    if (!context) return;
    context.closePath();
  };

  return (
    <div>
      <BaseCanvas
        ref={canvasRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      />
    </div>
  );
};

export { CanvasBasicDrawPage };
