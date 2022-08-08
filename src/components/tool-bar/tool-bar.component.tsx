import React from 'react';
import styled, { css } from 'styled-components';

type ToolBarProps = {
  modules?: React.ReactNode[];
  width?: string;
  height?: string;
};
const ToolBar: React.FC<ToolBarProps> = React.memo(
  ({ modules, width = '0px', height = '0px' }) => {
    return (
      <Tool width={width} height={height}>
        <Module>{React.Children.toArray(modules)}</Module>
      </Tool>
    );
  },
);

const Tool = styled.div<{ width: string; height: string }>`
  display: flex;
  align-items: center;
  position: relative;
  background: #ffffff;
  z-index: 1;
  ${({ width, height }) =>
    css`
      width: ${width};
      height: ${height};
    `}
  overflow: hidden;
`;
const Module = styled.div`
  display: flex;
  align-items: center;
  column-gap: 10px;
`;

export { ToolBar };
