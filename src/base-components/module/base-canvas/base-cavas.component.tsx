import React, {
  MouseEventHandler,
  TouchEventHandler,
  PointerEventHandler,
} from 'react';
import styled from 'styled-components';

type BaseCanvasProps = {
  width?: number;
  height?: number;
  onMouseDown?: MouseEventHandler;
  onMouseMove?: MouseEventHandler;
  onMouseUp?: MouseEventHandler;
  onTouchStart?: TouchEventHandler;
  onTouchMove?: TouchEventHandler;
  onTouchEnd?: TouchEventHandler;
  onPointerDown?: PointerEventHandler;
  onPointerMove?: PointerEventHandler;
  onPointerUp?: PointerEventHandler;
};

const BaseCanvas = React.forwardRef<HTMLCanvasElement, BaseCanvasProps>(
  (props, ref) => {
    return (
      <Canvas ref={ref} {...props}>
        해당 브라우저가 캔버스를 지원하지 않습니다.
      </Canvas>
    );
  },
);

const Canvas = styled.canvas`
  touch-action: none;
`;

export { BaseCanvas };
