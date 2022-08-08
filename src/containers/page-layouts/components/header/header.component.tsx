import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styled, { css } from 'styled-components';

// constants
import { ROUTES } from '@/core/constants';
import { PAGE_LAYOUTS_ELEMENT_INFO } from '../../constatns';

const Header = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOnClickNavBtn = () => {
    setIsOpen(prev => !prev);
  };
  return (
    <>
      <HeaderWrap
        styleSet={{
          height: PAGE_LAYOUTS_ELEMENT_INFO.header.height,
          translate: {
            y: isOpen ? 0 : PAGE_LAYOUTS_ELEMENT_INFO.header.height,
          },
        }}
      >
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
      <HeaderHamburger onClick={handleOnClickNavBtn}>N</HeaderHamburger>
    </>
  );
};

const HeaderHamburger = styled.button`
  position: fixed;
  bottom: 16px;
  right: 16px;
  z-index: 100;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 0;
  background: #222222;
  color: #ffffff;
  cursor: pointer;
`;

const HeaderWrap = styled.header`
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  ${({
    styleSet,
  }: {
    styleSet: { height: number; translate: { y: number } };
  }) =>
    css`
      height: ${styleSet.height}px;
      transform: translate(0, ${styleSet.translate.y}px);
    `}
  transition:transform 0.3s ease-in-out;
  padding: 0 20px;
  padding-right: 100px;
  border-bottom: 1px solid #cccccc;
  z-index: 10;
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
