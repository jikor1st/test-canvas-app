import React from 'react';
import styled from 'styled-components';
type ZoomProps = {
  zoom: number;
  onClickZoom: (value: string) => void;
};

const Zoom: React.FC<ZoomProps> = React.memo(({ zoom, onClickZoom }) => {
  return (
    <Container>
      <ZoomButton onClick={() => onClickZoom('+')}>+</ZoomButton>
      <ZoomText>{parseFloat((zoom * 100).toFixed(1))}%</ZoomText>
      <ZoomButton onClick={() => onClickZoom('-')}>-</ZoomButton>
    </Container>
  );
});

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const ZoomText = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 80px;
  overflow: hidden;
`;
const ZoomButton = styled.button``;

export { Zoom };
