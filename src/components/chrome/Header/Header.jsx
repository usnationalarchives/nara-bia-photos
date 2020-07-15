import React from "react";
import styled from "styled-components";

import * as Layout from "#components/shared/Layout";

import Nav from "./Nav";

const Root = styled.div`
  background-color: ${(props) => props.theme.colors.darkGrey};
  color: ${(props) => props.theme.colors.white};
  padding: 2rem 0;
`;

const Header = () => {
  return (
    <Root id="header">
      <Layout.Padding>
        <Nav />
      </Layout.Padding>
    </Root>
  );
};

export default Header;
