type StylesOptions = {
  fillStyle?: string;
  strokeStyle?: string;
  lineWidth?: number;
};
type RectOptionsProps = StylesOptions & {
  x: number;
  y: number;
  width: number;
  height: number;
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
}

type CircleOptionsProps = StylesOptions & {
  x: number;
  y: number;
  radius: number;
  startAngle?: number;
  endAngle?: number;
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
}
type PolygonOptionsProps = StylesOptions & {
  polygons: { x: number; y: number }[];
};
function polygon(
  context: CanvasRenderingContext2D,
  { polygons, fillStyle, strokeStyle, lineWidth = 1 }: PolygonOptionsProps,
) {
  if (polygons?.length >= 3) {
    const { x: startX, y: startY } = polygons[0];
    context.beginPath();
    context.moveTo(startX, startY);
    for (let i = 1, len = polygons.length; i < len; i++) {
      const polygonItem = polygons[i];
      context.lineTo(polygonItem.x, polygonItem.y);
    }
    context.closePath();

    if (fillStyle) {
      context.fillStyle = fillStyle;
      context.fill();
    }
    if (strokeStyle) {
      context.lineWidth = lineWidth;
      context.strokeStyle = strokeStyle;
      context.stroke();
    }
  } else {
    throw new Error('꼭지점이 3개 미만입니다.');
  }
}

const draw = { rect, circle, polygon };

export { draw };
