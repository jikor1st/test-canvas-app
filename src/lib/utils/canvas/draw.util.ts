type RectOptionsProps = {
  x: number;
  y: number;
  width: number;
  height: number;
  fillStyle?: string;
  strokeStyle?: string;
  lineWidth?: number;
};
function rect(
  context: CanvasRenderingContext2D,
  {
    x,
    y,
    width,
    height,
    fillStyle,
    strokeStyle,
    lineWidth = 1,
  }: RectOptionsProps,
) {
  context.save();
  context.beginPath();
  context.rect(x, y, width, height);
  if (fillStyle) {
    context.fillStyle = fillStyle;
    context.fill();
  }
  if (strokeStyle) {
    context.lineWidth = lineWidth;
    context.strokeStyle = strokeStyle;
    context.stroke();
  }
  context.restore();
}

type CircleOptionsProps = {
  x: number;
  y: number;
  radius: number;
  startAngle?: number;
  endAngle?: number;
  fillStyle?: string;
  strokeStyle?: string;
  lineWidth?: number;
};
function circle(
  context: CanvasRenderingContext2D,
  {
    x,
    y,
    radius,
    startAngle = 0,
    endAngle = 2 * Math.PI,
    fillStyle,
    strokeStyle,
    lineWidth = 1,
  }: CircleOptionsProps,
) {
  context.save();
  context.beginPath();
  context.arc(x, y, radius, startAngle, endAngle);
  if (fillStyle) {
    context.fillStyle = fillStyle;
    context.fill();
  }
  if (strokeStyle) {
    context.lineWidth = lineWidth;
    context.strokeStyle = strokeStyle;
    context.stroke();
  }
  context.restore();
}

const draw = { rect, circle };

export { draw };
