import React from 'react';
import styled from 'styled-components';

type ToolWrapProps = {
  modules?: React.ReactNode[];
};
const ToolWrap: React.FC<ToolWrapProps> = React.memo(({ modules }) => {
  return (
    <Container>
      <Tools>{React.Children.toArray(modules)}</Tools>
    </Container>
  );
});

const Container = styled.div`
  display: flex;
  align-items: center;
  column-gap: 80px;
  height: 50px;
  padding: 0 20px;
  border-bottom: 1px solid #cccccc;
`;
const Tools = styled.div`
  display: flex;
  align-items: center;
  column-gap: 10px;
`;
const ColGroup = styled.div``;

export { ToolWrap };
