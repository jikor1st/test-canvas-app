// modules
import React from 'react';
import { lazily } from 'react-lazily';

// pages
const {
  IndexPage,
  CanvasBasicDrawPage,
  CanvasSmoothDrawPage,
  CanvasResizeDrawPage,
} = lazily(() => import('@/pages'));

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
