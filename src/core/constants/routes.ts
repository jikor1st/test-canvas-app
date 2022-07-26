// modules
import React from 'react';
// import { lazily } from 'react-lazily';
import { NamedLazy } from '@/core/modules';

// pages
const {
  IndexPage,
  CanvasBasicDrawPage,
  CanvasSmoothDrawPage,
  CanvasResizeDrawPage,
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
  { path: 'canvas-basic-draw', element: CanvasBasicDrawPage, nav: '기본' },
  {
    path: 'canvas-smooth-draw',
    element: CanvasSmoothDrawPage,
    nav: '부드러운',
  },
  {
    path: 'canvas-resize-draw',
    element: CanvasResizeDrawPage,
    nav: '가변적인',
  },
];

export { ROUTES };
