import React, { ReactNode, Suspense } from 'react';

import styled, { css, keyframes } from 'styled-components';

import { PAGE_LAYOUTS_ELEMENT_INFO } from '../../constatns';

type MainProps = {
  page: ReactNode;
};

const Main: React.FC<MainProps> = ({ page }) => {
  return (
    <Container styleSet={{ height: PAGE_LAYOUTS_ELEMENT_INFO.header.height }}>
      <Suspense fallback={<LoadingPage />}>{page}</Suspense>
    </Container>
  );
};

const LoadingPage = () => {
  return (
    <LoadingContainer>
      <LoadingBox>
        <LoadingIndicator />
      </LoadingBox>
    </LoadingContainer>
  );
};

const Container = styled.main`
  ${({ styleSet }: { styleSet: { height: number } }) =>
    css`
      height: calc(100vh - ${styleSet.height}px);
    `}
  width: 100%;
`;

const LoadingContainer = styled.div`
  width: 100%;
  height: 100%;
  background: #bfc0c2;
  position: relative;
`;

const Spin = keyframes`
  to { transform: rotate(360deg); }
`;
const LoadingBox = styled.div`
  position: absolute;
  left: 50%;
  top: 35%;
  transform: translate(-50%, -50%);
`;
const LoadingIndicator = styled.div`
  display: inline-block;
  width: 50px;
  height: 50px;
  border: 3px solid rgba(255, 255, 255, 0.4);
  border-radius: 50%;
  border-top-color: #fff;
  animation: ${Spin} 1s ease-in-out infinite;
`;
export { Main };
