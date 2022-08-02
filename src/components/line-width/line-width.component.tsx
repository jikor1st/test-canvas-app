import React, { ChangeEventHandler } from 'react';
import styled from 'styled-components';
type LineWidthProps = {
  lineWidth: number;
  onChangeLineWidth?: ChangeEventHandler;
};

const LineWidth: React.FC<LineWidthProps> = React.memo(
  ({ lineWidth, onChangeLineWidth }) => {
    return (
      <Container>
        <LineWidthRange onChange={onChangeLineWidth} value={lineWidth} />
        {lineWidth}
      </Container>
    );
  },
);

const Container = styled.div`
  display: flex;
  align-items: center;
  column-gap: 8px;
`;

const LineWidthRange = styled.input.attrs(() => ({
  type: 'range',
}))``;

export { LineWidth };
