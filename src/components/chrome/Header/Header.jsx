import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";
import { fl_allStates, fl_burger, fl_burgerToCross } from "#styles/frontline";

// components
import Logo from "./Logo";
import Nav from "./Nav";
import Title from "./Title";

// styles
import { buttonReset } from "#styles/mixins";

const Root = styled.div`
  background-color: ${(props) => props.theme.colors.darkGrey};
  color: ${(props) => props.theme.colors.white};
  position: relative;

  @media all and ${(props) => props.theme.breakpoints.medium} {
    display: flex;
    align-items: center;
  }
`;

const Inner = styled.div`
  background-color: ${(props) => props.theme.colors.darkGrey};
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  position: relative;
  width: 100%;
  z-index: ${(props) => props.theme.zIndex.header};
`;

const TitleLink = styled(Link)`
  ${fl_allStates} {
    color: ${(props) => props.theme.colors.white};
    text-decoration: none;
  }
`;

const LogoTitle = styled.div`
  display: flex;
  align-items: center;
`;

const NavToggle = styled.button`
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

const Header = () => {
  const [navOpen, setNavOpen] = useState(false);

  const toggleNav = () => {
    setNavOpen(!navOpen);
  };

  return (
    <Root id="header">
      <Inner>
        <TitleLink to="/">
          <LogoTitle>
            <Logo />
            <Title />
          </LogoTitle>
        </TitleLink>

        <NavToggle onClick={toggleNav}>
          <Burger navOpen={navOpen} />
          {!navOpen && "Menu"}
          {navOpen && "Close"}
        </NavToggle>
      </Inner>

      <Nav navOpen={navOpen} />
    </Root>
  );
};

export default Header;
