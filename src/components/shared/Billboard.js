import React, { useEffect } from 'react';
import styled from 'styled-components';
import * as frontline from '#styles/frontline';

// assets
import bannerImage from '#assets/images/banner-state-landing.png';
import bannerImage2x from '#assets/images/banner-state-landing@2x.png';

// components
import * as Text from '#components/shared/Text';
import * as Layout from '#components/shared/Layout';
import PopoverInfo from '#components/shared/PopoverInfo';
import BackgroundImage from '#components/shared/BackgroundImage';
import ContentWarning from '#components/shared/ContentWarning';

const BackgroundImageStyle = styled.div`
  display: block;
  position: relative;
  ${frontline.fl_aspectRatio(1 / 1)}
`;

const Root = styled.div`
  background-color: ${props => props.theme.colors.blue};
  padding: 1.5rem 0;

  @media all and ${props => props.theme.breakpoints.medium} {
    padding: 3rem 0;
  }
`;

const Title = styled(Text.H2)`
  color: ${props => props.theme.colors.white};
  margin-bottom: 1rem;
`;

const Intro = styled(Text.Intro)`
  color: ${props => props.theme.colors.white};
  max-width: 530px;
  flex: 2 1 auto;
`;

const IntroWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
`;

const LandingBillboardLayout = styled.div`
  & .desktopImage {
    ${frontline.fl_aspectRatio(1 / 1)}
    margin: 0 auto;
    max-width: 400px;
    width: 100%;
  }

  & .layout {
    &-col {
      &--primary {
        > *:first-child {
          padding: 30px 20px 30px 0;
        }

        @media all and ${props => props.theme.breakpoints.medium} {
          align-items: center;
          display: flex;
          justify-content: flex-end;
          flex: 0 0 55%;
        }
      }
      &--secondary {
        margin-left: -${props => props.theme.layout.minPadding};
        margin-right: -${props => props.theme.layout.minPadding};

        @media all and ${props => props.theme.breakpoints.medium} {
          margin: 0;
          display: flex;
          justify-content: flex-end;
          flex: 0 0 35%;
        }
      }
    }
    &-content {
      > * {
        margin-top: 15px;

        &:first-child {
          margin-top: 0;
        }
      }
    }
  }

  @media all and ${props => props.theme.breakpoints.medium} {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: ${props => {
      return props.alignment === 'left' ? 'row' : 'row-reverse';
    }};
    min-height: 360px;
  }
`;

const SuperTitle = styled.span`
  color: #fff;
  display: block;
  font-size: 0.875rem;
  text-transform: uppercase;
`;

const Billboard = ({ alignment, title, imageUrl, intro, introIcon, introHelp, superTitle, ...props }) => {
  return (
    <Root>
      <Layout.Padding>
        <Layout.Wrapper>
          <LandingBillboardLayout alignment={alignment}>
            <div className="layout-col--primary">
              <div className="layout-content">
                {!!superTitle && <SuperTitle>{superTitle}</SuperTitle>}
                <Title>{title}</Title>
                <IntroWrapper>
                  {!!introIcon && introIcon === 'warning' && (
                    <ContentWarning style={{ flex: '0 0 100px', paddingRight: '20px' }} />
                  )}
                  {!!intro && (
                    <Intro>
                      {intro}
                      {introHelp && <PopoverInfo content={introHelp} />}
                    </Intro>
                  )}
                </IntroWrapper>
                {props.children}
              </div>
            </div>
            <div className="layout-col--secondary">
              <BackgroundImage className="desktopImage">
                <img srcSet={`${imageUrl} 1x, ${imageUrl} 2x`} src={imageUrl}></img>
              </BackgroundImage>
            </div>
          </LandingBillboardLayout>
        </Layout.Wrapper>
      </Layout.Padding>
    </Root>
  );
};

export default Billboard;
