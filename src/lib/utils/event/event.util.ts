import { TouchEvent, Touch } from 'react';

function touches({ nativeEvent }: TouchEvent) {
  // return nativeEvent.touches as Touch;
}

// const eventPosition = e => {
//   const x = typeof e.offsetX !== 'undefined' ? e.offsetX : e.layerX;
//   const y = typeof e.offsetY !== 'undefined' ? e.offsetY : e.layerY;
//   return { x: x ?? 0, y: y ?? 0 };
// };

const eventUtils = {
  touches,
};

export { eventUtils };
