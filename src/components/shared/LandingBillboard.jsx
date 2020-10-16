import React from 'react';
import styled from 'styled-components';
import * as frontline from '#styles/frontline';

// assets
import bannerImage from '#assets/images/banner-state-landing.png';
import bannerImage2x from '#assets/images/banner-state-landing@2x.png';

// components
import {H1 as Heading1, H2, H3, H4, H5, H6, Intro as StyledIntro, Label, Screenreader, Rich} from '#components/shared/Text';
import {Padding, Wrapper, Center} from '#components/shared/Layout';
import PopoverInfo from '#components/shared/PopoverInfo';
import BackgroundImage from '#components/shared/BackgroundImage';

// const BackgroundImageStyle = styled.div`
//   display: block;
//   position: relative;
//   ${frontline.fl_aspectRatio(16 / 9)}
// `;

const Root = styled.div`
  background-color: ${props => props.theme.colors.blue};
  /* padding: 2rem 0; */
`;

const Title = styled(Heading1)`
  color: ${props => props.theme.colors.white};
  margin-bottom: 1rem;
`;

const Intro = styled(StyledIntro)`
  color: ${props => props.theme.colors.white};
  max-width: 530px;
`;

const LandingBillboardLayout = styled.div`
  & .desktopImage {
    ${frontline.fl_aspectRatio(16 / 9)}
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

          > *:first-child {
            flex: 2;
            max-width: calc(${props => props.theme.layout.maxWidth} / 2);
          }
        }
      }
      &--secondary {
        margin-left: -${props => props.theme.layout.minPadding};
        margin-right: -${props => props.theme.layout.minPadding};

        @media all and ${props => props.theme.breakpoints.medium} {
          margin: 0;
          display: flex;
          justify-content: flex-end;
        }
      }
    }
  }

  @media all and ${props => props.theme.breakpoints.medium} {
    display: flex;
    align-items: stretch;
    flex-direction: row;
    min-height: 360px;

    > * {
      flex: 1 0 50%;
    }
  }
`;

const Billboard = ({ title, intro, introHelp, ...props }) => {
  return (
    <Root>
      <Padding>
        <Wrapper wide>
          <LandingBillboardLayout>
            <div className="layout-col--primary">
              <div>
                <Title>{title}</Title>
                {intro && (
                  <Intro>
                    {intro}
                    {introHelp && <PopoverInfo content={introHelp} />}
                  </Intro>
                )}
                {props.children}
              </div>
            </div>
            <div className="layout-col--secondary">
              <BackgroundImage className="desktopImage">
                <img
                  alt=""
                  aria-hidden="true"
                  role="presentation"
                  srcSet={`${bannerImage} 1x, ${bannerImage2x} 2x`}
                  src={bannerImage}
                ></img>
              </BackgroundImage>
            </div>
          </LandingBillboardLayout>
        </Wrapper>
      </Padding>
    </Root>
  );
};

export default Billboard;
