import React from "react";
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";

// styles
import { fl_allStates, fl_attention } from "#styles/frontline";

const Menu = styled.ul`
  margin-bottom: 30px;
  text-align: center;

  @media all and ${(props) => props.theme.breakpoints.medium} {
    align-self: flex-end;
    text-align: left;
    margin-bottom: 0;
    display: flex;
    flex-wrap: wrap;
  }
`;

const MenuItem = styled.li`
  font-size: 1.15rem;
  margin-top: 15px;
  text-transform: uppercase;

  @media all and ${(props) => props.theme.breakpoints.medium} {
    width: 50%;
    padding-right: 30px;
  }

  @media all and ${(props) => props.theme.breakpoints.large} {
    width: auto;
  }
`;

const MenuLink = styled(Link)`
  ${fl_allStates(css`
    color: ${(props) => props.theme.colors.white};
    text-decoration: none;
  `)}

  ${fl_attention(css`
    color: ${(props) => props.theme.colors.yellow};
  `)}
`;

const Item = ({ to, ...props }) => {
  return (
    <MenuItem>
      <MenuLink to={to}>{props.children}</MenuLink>
    </MenuItem>
  );
};

const FooterNav = () => {
  return (
    <Menu>
      <Item to="/tribal-nations">Tribal Nations</Item>
      <Item to="/topics">Topics</Item>
      <Item to="/states">States</Item>
      <Item to="/about">About</Item>
    </Menu>
  );
};

export default FooterNav;
