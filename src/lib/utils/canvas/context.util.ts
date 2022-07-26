type ObjectXYType = { x: number; y: number };
type ContextDotOptionsType = { x: number; y: number; radius: number };
type ContextLineWithQuadrationOptionsType = {
  points: ObjectXYType[];
};

function pixelRatio(): number {
  return window.devicePixelRatio > 1 ? 2 : 1;
}

function objectXY(x: number, y: number): ObjectXYType {
  return { x: x, y: y };
}

function drawDot(
  context: CanvasRenderingContext2D,
  { x, y, radius }: ContextDotOptionsType,
): void {
  context.beginPath();
  context.arc(x, y, radius, 0, Math.PI * 2, !0);
  context.fill();
  context.closePath();
}

function drawLineCurve(
  context: CanvasRenderingContext2D,
  { points }: ContextLineWithQuadrationOptionsType,
): void {
  context.beginPath();
  context.moveTo(points[0].x, points[0].y);

  for (let i = 1, len = points.length; i < len - 2; i++) {
    const cpx = points[i].x;
    const cpy = points[i].y;
    const x = (cpx + points[i + 1].x) / 2;
    const y = (cpy + points[i + 1].y) / 2;

    context.quadraticCurveTo(cpx, cpy, x, y);
  }

  context.stroke();
}

const contextUtils = {
  pixelRatio,
  objectXY,
  drawDot,
  drawLineCurve,
};

export { contextUtils };
export type {};
