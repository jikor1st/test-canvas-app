import { useEffect, useState, useRef, PointerEvent } from 'react';

// modules
import { NamedLazy } from '@/core/modules';

// base-components
const { BaseCanvas } = NamedLazy(() => import('@/base-components'));

const CanvasBasicDrawPage: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);

  const canvasInformRef = useRef({
    width: 0,
    height: 0,
    pixelRatio: window.devicePixelRatio > 1 ? 2 : 1,
  });

  const [isDown, setIsDown] = useState<boolean>(false);

  useEffect(() => {
    init();
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
    if (!canvasRef.current) return;
    const { innerWidth, innerHeight } = window;
    canvasSizeSetting(innerWidth, innerHeight);
    const getContext = canvasRef.current.getContext('2d');
    if (!getContext) return;
    canvasContextSetting(getContext);
  };

  const handlePointerDown = ({ nativeEvent }: PointerEvent) => {
    setIsDown(true);
    if (!contextRef.current) return;

    const { offsetX, offsetY } = nativeEvent;

    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
  };

  const handlePointerMove = ({ nativeEvent }: PointerEvent) => {
    if (!isDown || !contextRef.current) return;

    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
  };

  const handlePointerUp = () => {
    setIsDown(false);
    if (!contextRef.current) return;
    contextRef.current.closePath();
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
