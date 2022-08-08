function pixelRatio(): number {
  return window.devicePixelRatio > 1 ? 2 : 1;
}

type SetTransformOptionsProps = {
  scale?: {
    h?: number;
    v?: number;
  };
  skew?: {
    h?: number;
    v?: number;
  };
  move?: {
    h?: number;
    v?: number;
  };
};
function transform(
  context: CanvasRenderingContext2D,
  transformOptions?: SetTransformOptionsProps,
) {
  const { scale, skew, move } = transformOptions ?? {};
  context.transform(
    scale?.h ?? 1,
    skew?.h ?? 0,
    skew?.v ?? 0,
    scale?.v ?? 1,
    move?.h ?? 0,
    move?.v ?? 0,
  );
}
function setTransform(
  context: CanvasRenderingContext2D,
  transformOptions?: SetTransformOptionsProps,
) {
  const { scale, skew, move } = transformOptions ?? {};
  context.setTransform(
    scale?.h ?? 1,
    skew?.h ?? 0,
    skew?.v ?? 0,
    scale?.v ?? 1,
    move?.h ?? 0,
    move?.v ?? 0,
  );
}

const methodUtils = { pixelRatio, transform, setTransform };

export { methodUtils };
