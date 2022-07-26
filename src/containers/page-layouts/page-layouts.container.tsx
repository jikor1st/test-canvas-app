import { ReactNode, Suspense } from 'react';

import { Header, Main } from './components';

import styled from 'styled-components';
type PageLayoutsContainerProps = {
  page?: ReactNode;
};
const PageLayoutsContainer: React.FC<PageLayoutsContainerProps> = ({
  page,
}) => {
  return (
    <PageContainer>
      <Header />
      <Suspense fallback={<div>Page Loading....</div>}>
        <Main page={page} />
      </Suspense>
    </PageContainer>
  );
};

const PageContainer = styled.div`
  min-width: 360px;
`;

export { PageLayoutsContainer };
