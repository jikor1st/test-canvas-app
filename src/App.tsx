import React, { Suspense } from 'react';
import './reset.css';
import './initial-style.css';

// routers
import { Routes, Route } from 'react-router-dom';

// meta-components
import { ErrorBoundary } from '@/meta-components';

// containers
import { PageLayoutsContainer, NavigationContainer } from '@/containers';

// constants
import { ROUTES } from '@/core/constants';

function App() {
  return (
    <>
      <ErrorBoundary>
        <Routes>
          {ROUTES.map(({ path, element }) => (
            <Route
              path={path}
              element={
                <PageLayoutsContainer page={React.createElement(element)} />
              }
              key={path}
            />
          ))}
        </Routes>
      </ErrorBoundary>
    </>
  );
}

export default App;
