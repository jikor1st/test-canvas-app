import { useEffect, useState, useRef, MouseEvent, Suspense } from 'react';

// modules
import { lazily } from 'react-lazily';

// base-components
const { BaseCanvas } = lazily(() => import('@/base-components'));

const pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;
type pointType = { x: number; y: number };

const CanvasSmoothDrawPage = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
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
    if (!canvasRef.current) return;
    const canvasEl = canvasRef.current;
    canvasSizeSetting(canvasEl, window);
    canvasContextSetting(canvasEl);
  };

  const handleMouseDown = ({ nativeEvent }: MouseEvent) => {
    setIsDown(true);

    const { offsetX, offsetY } = nativeEvent;

    const ppts = pptsRef.current;
    const points: pointType = { x: offsetX, y: offsetY };
    ppts.push(points);
  };

  const handleMouseMove = ({ nativeEvent }: MouseEvent) => {
    if (!isDown) return;

    if (!contextRef.current) return;

    const { offsetX, offsetY } = nativeEvent;

    const ppts = pptsRef.current;
    const points: pointType = { x: offsetX, y: offsetY };
    ppts.push(points);

    if (ppts.length < 3) {
      let pptsFirst = ppts[0];
      contextRef.current.beginPath();
      contextRef.current.arc(
        pptsFirst.x,
        pptsFirst.y,
        contextRef.current.lineWidth / 2,
        0,
        Math.PI * 2,
        !0,
      );
      contextRef.current.fill();
      contextRef.current.closePath();

      return;
    }

    contextRef.current.beginPath();
    contextRef.current.moveTo(ppts[0].x, ppts[0].y);

    for (var i = 1; i < ppts.length - 2; i++) {
      var c = (ppts[i].x + ppts[i + 1].x) / 2;
      var d = (ppts[i].y + ppts[i + 1].y) / 2;

      contextRef.current.quadraticCurveTo(ppts[i].x, ppts[i].y, c, d);
    }

    contextRef.current.quadraticCurveTo(
      ppts[i].x,
      ppts[i].y,
      ppts[i + 1].x,
      ppts[i + 1].y,
    );

    contextRef.current.stroke();
  };

  const handleMouseUp = () => {
    setIsDown(false);
    if (!contextRef.current) return;

    pptsRef.current = [];
  };

  return (
    <div>
      <Suspense fallback={<div>캔버스 불러오는중...</div>}>
        <BaseCanvas
          ref={canvasRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        />
      </Suspense>
    </div>
  );
};

export { CanvasSmoothDrawPage };
