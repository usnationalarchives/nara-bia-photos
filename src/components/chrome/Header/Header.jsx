import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fl_allStates } from "#styles/frontline";

import * as Layout from "#components/shared/Layout";

import Logo from "./Logo";
import Nav from "./Nav";
import Title from "./Title";

const Root = styled.div`
  background-color: ${(props) => props.theme.colors.darkGrey};
  color: ${(props) => props.theme.colors.white};
  padding: 0.9rem 0;
`;

const Inner = styled.div`
  display: flex;
  flex-direction: column;

  @media all and ${(props) => props.theme.breakpoints.medium} {
    align-items: center;
    justify-content: space-between;
    flex-direction: row;
  }
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

const Header = () => {
  return (
    <Root id="header">
      <Layout.Padding>
        <Inner>
          <TitleLink to="/">
            <LogoTitle>
              <Logo />
              <Title />
            </LogoTitle>
          </TitleLink>
          <Nav />
        </Inner>
      </Layout.Padding>
    </Root>
  );
};

export default Header;
