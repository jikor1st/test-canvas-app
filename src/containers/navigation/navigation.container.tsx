import { NavLink } from 'react-router-dom';
import styled, { css } from 'styled-components';

// constants
import { ROUTES } from '@/core/constants';

const NavigationContainer = () => {
  return (
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
  );
};

const Container = styled.div`
  padding: 20px;
`;
const NavWrap = styled.ul`
  display: flex;
  column-gap: 20px;
`;
const NavItem = styled.span`
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

export { NavigationContainer };
