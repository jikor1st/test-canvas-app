import React, {
  MouseEventHandler,
  TouchEventHandler,
  PointerEventHandler,
} from 'react';
import styled from 'styled-components';

type BaseCanvasProps = {
  width?: number;
  height?: number;
  fullWidth?: boolean;
  fullHeight?: boolean;
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
    const { fullWidth = false, fullHeight = false } = props;
    return (
      <Canvas
        ref={ref}
        {...props}
        fullWidth={fullWidth}
        fullHeight={fullHeight}
      >
        해당 브라우저가 캔버스를 지원하지 않습니다.
      </Canvas>
    );
  },
);

const Canvas = styled.canvas<{ fullWidth: boolean; fullHeight: boolean }>`
  ${({ fullWidth }) => fullWidth && `width:100%;`}
  ${({ fullHeight }) => fullHeight && `height:100%;`}
  touch-action: none;
`;

export { BaseCanvas };
