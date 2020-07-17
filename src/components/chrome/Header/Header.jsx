import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fl_allStates } from "#styles/frontline";
import { useLocation } from "react-router-dom";

// components
import Logo from "./Logo";
import Nav from "./Nav";
import Title from "./Title";
import NavToggle from "./NavToggle";

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

const Header = ({ ...props }) => {
  const location = useLocation();
  const [navOpen, setNavOpen] = useState(false);

  // collapse the mobile navigation when following a link
  useEffect(() => {
    setNavOpen(false);
  }, [location]);

  return (
    <Root id="header">
      <Inner>
        <TitleLink to="/">
          <LogoTitle>
            <Logo />
            <Title />
          </LogoTitle>
        </TitleLink>

        <NavToggle navOpen={navOpen} setNavOpen={setNavOpen} />
      </Inner>

      <Nav navOpen={navOpen} />
    </Root>
  );
};

export default Header;
