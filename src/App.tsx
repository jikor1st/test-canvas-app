import React, { Suspense } from 'react';
import './reset.css';

// routers
import { Routes, Route } from 'react-router-dom';

// meta-components
import { ErrorBoundary } from '@/meta-components';

// containers
import { NavigationContainer } from '@/containers';

// constants
import { ROUTES } from '@/core/constants';

function App() {
  return (
    <>
      <NavigationContainer />
      <ErrorBoundary>
        <Suspense fallback={<div>Page Loading...</div>}>
          <Routes>
            {ROUTES.map(({ path, element }) => (
              <Route
                path={path}
                element={React.createElement(element)}
                key={path}
              />
            ))}
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </>
  );
}

export default App;
