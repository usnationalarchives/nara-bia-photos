import React, { useEffect } from 'react';
import styled, { css } from 'styled-components';
import * as frontline from '#styles/frontline';

// assets
import bannerImage from '#assets/images/banner-state-landing.png';
import bannerImage2x from '#assets/images/banner-state-landing@2x.png';

// components
import {H1, H2, H3, H4, H5, H6, Intro as StyledIntro, Label, Screenreader, Rich} from '#components/shared/Text';
import {Padding, Wrapper, Center} from '#components/shared/Layout';
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
    /* padding: 3rem 0; */
  }
`;

const Title = styled(H2)`
  color: ${props => props.theme.colors.white};
  margin-bottom: 1rem;
`;

const Intro = styled(StyledIntro)`
  color: ${props => props.theme.colors.white};
  max-width: 530px;
  flex: 2 1 auto;
`;

const IntroWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
`;

const TribeBillboardLayout = styled.div`
  & .desktopImage {
    ${frontline.fl_aspectRatio(1 / 1)}
    margin: 0 auto;
    max-width: 400px;
    width: 100%;
  }

  & .layout {
    &-col {
      &--primary {
        /* > *:first-child {
          padding: 30px 20px 30px 0;
        } */

        @media all and ${props => props.theme.breakpoints.medium} {
          align-items: center;
          display: flex;
          justify-content: flex-start;
          flex: 0 0 55%;
        }
      }
      &--secondary {
        align-items: center;
        display: flex;
        flex-direction: row-reverse;
        justify-content: space-between;
        margin-top: 20px;

        > *:first-child {
          flex: 0 0 100px;
          margin-left: 20px;

          @media all and ${props => props.theme.breakpoints.medium} {
            margin-left: 0;
          }
        }

        @media all and ${props => props.theme.breakpoints.medium} {
          border-left: 1px solid rgba(216, 216, 216, 0.3);
          display: block;
          flex: 0 0 35%;
          margin: 0;
          padding: 0 0 0 40px;
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

  a {
    ${frontline.fl_static(css`
      color: #fff;
      text-decoration: underline;
    `)}
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
  font-weight: bold;
  text-transform: uppercase;
`;

const TribeBillboard = ({ alignment, title, imageUrl, intro, introIcon, introHelp, superTitle, ...props }) => {
  return (
    <Root>
      <Padding>
        <Wrapper>
          <TribeBillboardLayout alignment={alignment}>
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
              </div>
            </div>
            <div className="layout-col--secondary">{props.children}</div>
          </TribeBillboardLayout>
        </Wrapper>
      </Padding>
    </Root>
  );
};

export default TribeBillboard;
