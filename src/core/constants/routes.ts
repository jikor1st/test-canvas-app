// modules
import React from 'react';
import { NamedLazy } from '@/core/modules';

// pages
const {
  IndexPage,
  CanvasBasicDrawPage,
  CanvasSmoothDrawPage,
  CanvasResizeDrawPage,
  CanvasOptimizedDrawPage,
  CanvasColorWidthDrawPage,
  CanvasZoomDrawPage,
} = NamedLazy(() => import('@/pages'), 350);

type RoutesItemType = {
  path: string;
  element: React.FC;
  nav: string;
};

const ROUTES: RoutesItemType[] = [
  {
    path: '',
    element: IndexPage,
    nav: '홈',
  },
  {
    path: 'canvas-color-width-draw',
    element: CanvasColorWidthDrawPage,
    nav: '컬러와 넓이',
  },
  {
    path: 'canvas-optimized-draw',
    element: CanvasOptimizedDrawPage,
    nav: '최적화',
  },
  {
    path: 'canvas-zoom-draw',
    element: CanvasZoomDrawPage,
    nav: '확대축소',
  },
  // { path: 'canvas-basic-draw', element: CanvasBasicDrawPage, nav: '기본' },
  // {
  //   path: 'canvas-smooth-draw',
  //   element: CanvasSmoothDrawPage,
  //   nav: '부드러운',
  // },
  // {
  //   path: 'canvas-resize-draw',
  //   element: CanvasResizeDrawPage,
  //   nav: '가변적인',
  // },
];

export { ROUTES };
