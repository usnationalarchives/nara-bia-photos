import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const Link = styled(NavLink)`
  color: ${(props) => props.theme.colors.white};
  font-size: 1.5rem;
  text-decoration: none;
  text-transform: uppercase;

  &[aria-current],
  &:active,
  &:focus,
  &:hover {
    color: ${(props) => props.theme.colors.yellow};
  }
`;

const Menu = styled.ul``;

const MenuItem = styled.li`
  display: inline;
  margin-right: 1.25rem;
`;

const Item = (props) => {
  return (
    <MenuItem>
      <Link to={props.to} exact>
        {props.children}
      </Link>
    </MenuItem>
  );
};

const Nav = () => {
  return (
    <Menu>
      <Item to="/">Home</Item>
      <Item to="/about">About</Item>
      <Item to="/search">Search</Item>
      <Item to="/prototype">Prototype</Item>
    </Menu>
  );
};

export default Nav;
