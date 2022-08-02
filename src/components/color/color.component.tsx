import { ChangeEventHandler } from 'react';
import styled from 'styled-components';
type ColorProps = {
  color?: string;
  onChangeColor?: ChangeEventHandler;
};
const Color: React.FC<ColorProps> = ({ color, onChangeColor }) => {
  return (
    <Container>
      <ColorPalette onChange={onChangeColor} value={color} />
    </Container>
  );
};

const Container = styled.div``;

const ColorPalette = styled.input.attrs(() => ({
  type: 'color',
}))``;

export { Color };
