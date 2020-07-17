import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const Link = styled(NavLink)`
  color: ${(props) => props.theme.colors.white};
  font-size: 1.15rem;
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
  margin-right: 2rem;

  &:last-child {
    margin: 0;
  }
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
      <Item to="/topics">Topics</Item>
      <Item to="/states">States</Item>
      <Item to="/about">About</Item>
      <Item to="/search">Search</Item>
    </Menu>
  );
};

export default Nav;
