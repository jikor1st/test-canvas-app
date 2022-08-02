import { ChangeEventHandler, MouseEventHandler } from 'react';

import styled from 'styled-components';

type ColorWithToolsContainerProps = {
  onChangeColor?: ChangeEventHandler;
  onChangeRange?: ChangeEventHandler;
  onClickSave?: MouseEventHandler;
  color: string;
  lineWidth: number;
};
const ColorWidthToolsContainer: React.FC<ColorWithToolsContainerProps> = ({
  onChangeColor,
  onChangeRange,
  onClickSave,
  color,
  lineWidth,
}) => {
  return (
    <Container>
      <ColGroups>
        <Title>컬러 : {color}</Title>
        <ColorPalette onChange={onChangeColor} />
      </ColGroups>
      <ColGroups>
        <Title>두께 : {lineWidth}px</Title>
        <RangeSlider onChange={onChangeRange} value={lineWidth} />
      </ColGroups>
      <ColGroups>
        <Button onClick={onClickSave}>이미지 저장</Button>
      </ColGroups>
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
const ColGroups = styled.div`
  display: flex;
  align-items: center;
  column-gap: 10px;
`;
const Title = styled.p`
  font-size: 17px;
`;

const ColorPalette = styled.input.attrs(() => ({
  type: 'color',
}))``;

const RangeSlider = styled.input.attrs(() => ({
  type: 'range',
}))``;

const Button = styled.button``;

export { ColorWidthToolsContainer };
