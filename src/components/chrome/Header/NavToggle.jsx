import React from "react";
import styled, { css } from "styled-components";

// styles
import { fl_burger, fl_burgerToCross } from "#styles/frontline";
import { buttonReset } from "#styles/mixins";

const Root = styled.button`
  ${buttonReset}

  font-size: 0.6rem;
  font-weight: bold;
  line-height: 2;
  outline: none;
  text-align: center;
  text-transform: uppercase;
  width: 30px;

  @media all and ${(props) => props.theme.breakpoints.medium} {
    display: none;
  }
`;

const Burger = styled.div`
  ${fl_burger({
    color: "#fff",
    gutter: 5,
    height: 3,
    transitionDuration: 250,
    width: 30,
  })}

  ${(props) =>
    props.navOpen &&
    css`
      ${fl_burgerToCross({
        color: "#fff",
        burgerGutter: 5,
        burgerHeight: 3,
      })}
    `}
`;

const NavToggle = ({ navOpen, setNavOpen }) => {
  const toggleNav = () => {
    setNavOpen(!navOpen);
  };

  return (
    <Root onClick={toggleNav}>
      <Burger navOpen={navOpen} />
      {!navOpen && "Menu"}
      {navOpen && "Close"}
    </Root>
  );
};

export default NavToggle;
