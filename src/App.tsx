import React from 'react';
import './reset.css';

// routers
import { Routes, Route } from 'react-router-dom';

// pages
import { CanvasStarterPage } from '@/pages';

function App() {
  return (
    <>
      <Routes>
        <Route path="canvas-starter" element={<CanvasStarterPage />} />
      </Routes>
    </>
  );
}

export default App;
