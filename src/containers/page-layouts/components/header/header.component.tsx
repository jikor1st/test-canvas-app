import { NavLink } from 'react-router-dom';
import styled, { css } from 'styled-components';

// constants
import { ROUTES } from '@/core/constants';
import { PAGE_LAYOUTS_ELEMENT_INFO } from '../../constatns';

const Header = () => {
  return (
    <HeaderWrap styleSet={{ height: PAGE_LAYOUTS_ELEMENT_INFO.header.height }}>
      <Container>
        <NavWrap>
          {ROUTES.map(({ path, nav }) => (
            <NavLink
              to={`/${path}`}
              style={{ textDecoration: 'none' }}
              key={path}
            >
              {({ isActive }) => <NavItem isActive={isActive}>{nav}</NavItem>}
            </NavLink>
          ))}
        </NavWrap>
      </Container>
    </HeaderWrap>
  );
};

const HeaderWrap = styled.header`
  display: flex;
  align-items: center;
  ${({ styleSet }: { styleSet: { height: number } }) =>
    css`
      height: ${styleSet.height}px;
    `}
  padding: 0 20px;
  border-bottom: 1px solid #cccccc;
`;

const Container = styled.nav``;
const NavWrap = styled.ul`
  display: flex;
  column-gap: 20px;
`;
const NavItem = styled.span`
  display: block;
  padding: 5px 7px;
  border-radius: 5px;
  cursor: pointer;
  ${({ isActive }: { isActive: boolean }) =>
    isActive
      ? css`
          border: 1px solid transparent;
          background: #1650bd;
          color: #ffffff;
        `
      : css`
          border: 1px solid #646464;
        `}
`;

export { Header };
