import React, { MouseEvent } from 'react';

type BaseCanvasProps = {
  width?: string | number;
  height?: string | number;
  onMouseDown?: (e: MouseEvent) => void;
  onMouseMove?: (e: MouseEvent) => void;
  onMouseUp?: (e: MouseEvent) => void;
};

const BaseCanvas = React.forwardRef<HTMLCanvasElement, BaseCanvasProps>(
  (props, ref) => {
    return <canvas ref={ref} {...props} />;
  },
);

export { BaseCanvas };
