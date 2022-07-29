type ObjectXYType = { x: number; y: number };

function pixelRatio(): number {
  return window.devicePixelRatio > 1 ? 2 : 1;
}

function objectXY(x: number, y: number): ObjectXYType {
  return { x: x, y: y };
}

type ContextDotOptionsType = { x: number; y: number; radius: number };
function drawDot(
  context: CanvasRenderingContext2D,
  { x, y, radius }: ContextDotOptionsType,
): { context: CanvasRenderingContext2D } {
  context.beginPath();
  context.arc(x, y, radius, 0, Math.PI * 2, !0);
  context.fill();
  context.closePath();

  return { context };
}

type ContextLineWithQuadrationOptionsType = {
  points: ObjectXYType[];
};
// version 1
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

type QuadraticWithPointsOptionsType = {
  startPoint: ObjectXYType;
  movePoints: ObjectXYType[];
};

// version 2
function drawLineQuadraticWithPoints(
  context: CanvasRenderingContext2D,
  { startPoint, movePoints }: QuadraticWithPointsOptionsType,
): { context: CanvasRenderingContext2D; endPoint: ObjectXYType } {
  const lastTwoPoints = movePoints.slice(-2);
  const controlPoint = lastTwoPoints[0];
  const endPoint = {
    x: (lastTwoPoints[0].x + lastTwoPoints[1].x) / 2,
    y: (lastTwoPoints[0].y + lastTwoPoints[1].y) / 2,
  };

  context.beginPath();
  context.moveTo(startPoint.x, startPoint.y);
  context.quadraticCurveTo(
    controlPoint.x,
    controlPoint.y,
    endPoint.x,
    endPoint.y,
  );
  context.stroke();
  context.closePath();

  return { context, endPoint };
}

const contextUtils = {
  pixelRatio,
  objectXY,
  drawDot,
  drawLineCurve,
  drawLineQuadraticWithPoints,
};

export { contextUtils };
export type {};
