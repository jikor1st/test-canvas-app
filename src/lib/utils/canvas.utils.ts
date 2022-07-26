function contextDot(
  context: CanvasRenderingContext2D,
  { x, y, radius }: { x: number; y: number; radius: number },
): void {
  context.beginPath();
  context.arc(x, y, radius, 0, Math.PI * 2, !0);
  context.fill();
  context.closePath();
}

export { contextDot };
