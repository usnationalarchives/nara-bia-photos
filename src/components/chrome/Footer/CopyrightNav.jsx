import React from 'react';
import styled, { css } from 'styled-components';

// styles
import { fl_allStates, fl_attention } from '#styles/frontline';

const Menu = styled.ul`
  display: flex;
  margin-top: 30px;

  @media all and ${props => props.theme.breakpoints.medium} {
    margin-top: 0;
  }
`;

const MenuItem = styled.li`
  font-size: 0.8rem;
  position: relative;
  padding-right: 25px;

  &:after {
    position: absolute;
    top: 2px;
    right: 13px;
    background-color: ${props => props.theme.colors.white};
    content: '';
    display: inline-block;
    height: 14px;
    width: 1px;
  }

  &:last-child:after {
    display: none;
  }
`;

const MenuLink = styled.a`
  ${fl_allStates(css`
    color: ${props => props.theme.colors.white};
    text-decoration: none;
  `)}

  ${fl_attention(css`
    text-decoration: underline;
  `)}
`;

const Item = ({ href, ...props }) => {
  return (
    <MenuItem>
      <MenuLink href={href}>{props.children}</MenuLink>
    </MenuItem>
  );
};

const FooterNav = () => {
  return (
    <Menu>
      <Item href="#">Help</Item>
      <Item href="#">Contact Us</Item>
      <Item href="#">Privacy Policy</Item>
    </Menu>
  );
};

export default FooterNav;
