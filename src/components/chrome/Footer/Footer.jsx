import React from "react";
import styled from "styled-components";

import * as Layout from "#components/shared/Layout";

const Root = styled.div`
  background-color: ${(props) => props.theme.colors.darkGrey};
  color: ${(props) => props.theme.colors.white};
  padding: 2rem 0;
`;

const Footer = () => {
  return (
    <Root id="footer">
      <Layout.Padding>Footer</Layout.Padding>
    </Root>
  );
};

export default Footer;
