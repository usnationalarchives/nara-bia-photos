import React from 'react';
import styled from 'styled-components';
import * as frontline from '#styles/frontline';

// components
import * as Text from '#components/shared/Text';
import * as Layout from '#components/shared/Layout';
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

const Title = styled(Text.H1)`
  color: ${props => props.theme.colors.white};
  margin-bottom: 1rem;
`;

const Intro = styled(Text.Intro)`
  color: ${props => props.theme.colors.white};
  max-width: 530px;
`;

const ImagePopupStyled = styled(PopoverInfo)`
  position: absolute;
  right: 0;
  bottom: 0;
  z-index: 2;
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
        position: relative;
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

const LandingBillboard = ({ bannerImage, bannerImage2x, title, intro, introHelp, imagePopup, ...props }) => {
  return (
    <Root>
      <Layout.Padding>
        <Layout.Wrapper wide>
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
              {!!imagePopup && (
                <>
                  <ImagePopupStyled
                    content={imagePopup}
                    toggleText={'Image Details'}
                    contentLocation={{}}
                    position={'top'}
                  />
                </>
              )}
              <BackgroundImage className="desktopImage bg-image--contain">
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
        </Layout.Wrapper>
      </Layout.Padding>
    </Root>
  );
};

export default LandingBillboard;
