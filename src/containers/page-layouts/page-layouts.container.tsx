import { ReactNode, Suspense } from 'react';

import { Header, Main } from './components';
type PageLayoutsContainerProps = {
  page?: ReactNode;
};
const PageLayoutsContainer: React.FC<PageLayoutsContainerProps> = ({
  page,
}) => {
  return (
    <>
      <Header />
      <Suspense fallback={<div>Page Loading....</div>}>
        <Main page={page} />
      </Suspense>
    </>
  );
};

export { PageLayoutsContainer };
