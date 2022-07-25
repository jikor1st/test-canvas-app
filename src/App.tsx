import React, { Suspense } from 'react';
import './reset.css';

// routers
import { Routes, Route } from 'react-router-dom';

// modules
import { lazily } from 'react-lazily';

// meta-components
import { ErrorBoundary } from '@/meta-components';

// pages
const { CanvasStarterPage, Test } = lazily(() => import('@/pages'));

function App() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<div>Page Loading...</div>}>
        <Routes>
          <Route path="test" element={<Test />} />
          <Route path="canvas-starter" element={<CanvasStarterPage />} />
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
