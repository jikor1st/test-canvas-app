import React, { ReactNode } from 'react';

import styled, { css } from 'styled-components';

import { PAGE_LAYOUTS_ELEMENT_INFO } from '../../constatns';

type MainProps = {
  page: ReactNode;
};

const Main: React.FC<MainProps> = ({ page }) => {
  return (
    <Container styleSet={{ height: PAGE_LAYOUTS_ELEMENT_INFO.header.height }}>
      {page}
    </Container>
  );
};

const Container = styled.main`
  ${({ styleSet }: { styleSet: { height: number } }) =>
    css`
      height: calc(100vh - ${styleSet.height}px);
    `}
  width: 100%;
`;

export { Main };
