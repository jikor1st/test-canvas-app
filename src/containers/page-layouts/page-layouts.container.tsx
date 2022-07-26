import { ReactNode } from 'react';

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
      <Main page={page} />
    </PageContainer>
  );
};

const PageContainer = styled.div`
  min-width: 360px;
`;

export { PageLayoutsContainer };
