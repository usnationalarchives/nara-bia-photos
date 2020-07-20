import React from "react";
import styled from "styled-components";

//config
import content from "#config/content";

//components
import * as Layout from "#components/shared/Layout";
import { ButtonLink } from "#components/shared/Button";
import Logo from "./Logo";
import FooterNav from "./FooterNav";
import Copyright from "./Copyright";

const Root = styled.div`
  background-color: ${(props) => props.theme.colors.darkGrey};
  color: ${(props) => props.theme.colors.white};
  padding: 2rem 0;

  @media all and ${(props) => props.theme.breakpoints.medium} {
    padding: 3rem 0 5rem;
  }
`;

const Summary = styled.p`
  font-size: 0.8rem;
  margin-bottom: 30px;
`;

const Main = styled.div`
  @media all and ${(props) => props.theme.breakpoints.medium} {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

const Branding = styled.div`
  margin-bottom: 30px;
  text-align: center;

  @media all and ${(props) => props.theme.breakpoints.medium} {
    text-align: left;
    margin-bottom: 0;
    margin-right: 40px;
  }
`;
const Help = styled.div`
  @media all and ${(props) => props.theme.breakpoints.medium} {
    max-width: 380px;
  }
`;

const Footer = () => {
  return (
    <Root id="footer">
      <Layout.Padding>
        <Layout.Wrapper>
          <Main>
            <Branding>
              <Logo />
            </Branding>

            <FooterNav />

            <Help>
              <Summary>{content.footer.summary}</Summary>
              <ButtonLink href="#">Ask on History Hub</ButtonLink>
            </Help>
          </Main>

          <Copyright />
        </Layout.Wrapper>
      </Layout.Padding>
    </Root>
  );
};

export default Footer;
