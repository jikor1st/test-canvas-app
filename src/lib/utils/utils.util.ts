import { contextUtils, draw, methodUtils } from './canvas';
import { eventUtils } from './event';
const utils = {
  context: { ...contextUtils },
  draw: draw,
  event: eventUtils,
  method: methodUtils,
};

export { utils };
