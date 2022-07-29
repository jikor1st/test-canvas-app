import { ChangeEventHandler } from 'react';

import styled from 'styled-components';

type ColorWithToolsContainerProps = {
  onChangeColor?: ChangeEventHandler;
  onChangeRange?: ChangeEventHandler;
  color: string;
  lineWidth: number;
};
const ColorWidthToolsContainer: React.FC<ColorWithToolsContainerProps> = ({
  onChangeColor,
  onChangeRange,
  color,
  lineWidth,
}) => {
  return (
    <Container>
      <InputWrap>
        <InputTitle>컬러 : {color}</InputTitle>
        <ColorPalette onChange={onChangeColor} />
      </InputWrap>
      <InputWrap>
        <InputTitle>두께 : {lineWidth}px</InputTitle>
        <RangeSlider onChange={onChangeRange} value={lineWidth} />
      </InputWrap>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  column-gap: 80px;
  justify-content: flex-end;
  height: 50px;
  padding: 0 20px;
  border-bottom: 1px solid #cccccc;
`;
const InputWrap = styled.div`
  display: flex;
  align-items: center;
  column-gap: 10px;
`;
const InputTitle = styled.p`
  font-size: 17px;
`;

const ColorPalette = styled.input.attrs(() => ({
  type: 'color',
}))``;

const RangeSlider = styled.input.attrs(() => ({
  type: 'range',
}))``;

export { ColorWidthToolsContainer };
