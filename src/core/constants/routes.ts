// modules
import React from 'react';
import { lazily } from 'react-lazily';

// pages
const { CanvasBasicDrawPage, CanvasSmoothDrawPage } = lazily(
  () => import('@/pages'),
);

type RoutesItemType = {
  path: string;
  element: React.FC;
  nav: string;
};

const ROUTES: RoutesItemType[] = [
  { path: 'canvas-basic-draw', element: CanvasBasicDrawPage, nav: '기본' },
  {
    path: 'canvas-smooth-draw',
    element: CanvasSmoothDrawPage,
    nav: '부드러운',
  },
];

export { ROUTES };
