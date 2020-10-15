import React from 'react';
import styled, { css } from 'styled-components';
import { NavLink } from 'react-router-dom';
import { ReactComponent as SearchIcon } from '#assets/icons/search.svg';
import Screenreader from '#components/shared/Screenreader';

const Link = styled(NavLink)`
  color: ${props => props.theme.colors.white};
  font-size: 1rem;
  text-decoration: none;
  text-transform: uppercase;
  transition: all 200ms ease-in-out;

  &[aria-current],
  &:active,
  &:focus,
  &:hover {
    color: ${props => props.theme.colors.yellow};

    svg {
      fill: ${props => props.theme.colors.yellow};
    }
  }

  @media all and ${props => props.theme.breakpoints.large} {
    font-size: 1.15rem;
  }
`;

const Menu = styled.ul`
  background-color: ${props => props.theme.colors.darkGrey};
  display: flex;
  flex-direction: column;
  left: 0;
  padding: 15px;
  position: absolute;
  right: 0;
  top: 100%;
  transform: translateY(-100%);
  transition-timing-function: cubic-bezier('0.215, 0.610, 0.355, 1.000');
  transition: transform 300ms;
  width: 100%;
  z-index: 0;

  ${props =>
    props.navOpen &&
    css`
      transform: none;
    `};

  @media all and ${props => props.theme.breakpoints.medium} {
    flex-direction: row;
    padding: 0;
    position: static;
    right: auto;
    top: auto;
    transform: none !important;
    width: auto;
    z-index: ${props => props.theme.zIndex.header};
  }
`;

const MenuItem = styled.li`
  margin-bottom: 1rem;
  white-space: nowrap;

  &:last-child {
    margin: 0;
  }

  svg {
    fill: ${props => props.theme.colors.white};
    height: 18px;
    transition: all 200ms ease-in-out;
    width: 18px;
  }

  @media all and ${props => props.theme.breakpoints.medium} {
    display: inline;
    margin-bottom: 0;
    margin-right: 2rem;
  }
`;

const Root = styled.div`
  @media all and ${props => props.theme.breakpoints.medium} {
    padding-right: 1rem;
  }
`;

const Item = props => {
  return (
    <MenuItem>
      <Link to={props.to} exact>
        {props.children}
      </Link>
    </MenuItem>
  );
};

const Nav = ({ navOpen }) => {
  return (
    <Root role="navigation" aria-label="Primary">
      <Menu navOpen={navOpen} id="nav">
        <Item to="/tribal-nations">Tribal Nations</Item>
        <Item to="/topics">Topics</Item>
        <Item to="/states">States</Item>
        <Item to="/about">About</Item>
        <Item to="/search">
          <Screenreader>Search</Screenreader>
          <SearchIcon />
        </Item>
      </Menu>
    </Root>
  );
};

export default Nav;
