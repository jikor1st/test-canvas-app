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
function setTransform(
  context: CanvasRenderingContext2D,
  { scale, skew, move }: SetTransformOptionsProps,
) {
  context.setTransform(
    scale?.h ?? 1,
    skew?.h ?? 0,
    skew?.v ?? 0,
    scale?.v ?? 1,
    move?.h ?? 0,
    move?.v ?? 0,
  );
}

const methodUtils = { setTransform };

export { methodUtils };
