import React, { useEffect, useState, useRef } from 'react';
import styled, { css } from 'styled-components';
import * as frontline from '#styles/frontline';
import { useLocation } from 'react-router-dom';
import Popover from 'react-tiny-popover';

// styles
import { buttonReset } from '#styles/mixins';

// components
import * as Text from '#components/shared/Text';
import * as Layout from '#components/shared/Layout';
import PopoverInfo from '#components/shared/PopoverInfo';
import BackgroundImage from '#components/shared/BackgroundImage';
import ContentWarning from '#components/shared/ContentWarning';
import PopoverNav from '#components/shared/PopoverNav';

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

const Title = styled(Text.H2)`
  color: ${props => props.theme.colors.white};
  margin-bottom: 1rem;
`;

const TitleButton = styled.button`
  ${buttonReset}
  display: inline;
  text-align: left;
  line-height: inherit;

  [data-whatinput='mouse'] & {
    outline: none;
  }

  &:after {
    /* don't alphabetize these border properties, the order is important */
    border: 8px solid white;
    border-bottom-color: transparent;
    border-left-color: transparent;
    border-right-color: transparent;

    content: '';
    display: inline-block;
    height: 16px;
    margin-left: 1rem;
    width: 16px;
  }
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

  .layout-col--secondary a {
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

const TribeBillboard = ({
  alignment,
  title,
  imageUrl,
  intro,
  introIcon,
  introHelp,
  items,
  superTitle,
  slugPrefix,
  ...props
}) => {
  const popoverEl = useRef();
  const [navOpen, setNavOpen] = useState(false);
  const location = useLocation();

  // collapse the mobile navigation when following a link
  useEffect(() => {
    setNavOpen(false);
  }, [location]);

  return (
    <Root>
      <Layout.Padding>
        <Layout.Wrapper>
          <TribeBillboardLayout alignment={alignment}>
            <div className="layout-col--primary">
              <div className="layout-content">
                {!!superTitle && <SuperTitle>{superTitle}</SuperTitle>}
                <Popover
                  isOpen={navOpen}
                  disableReposition
                  onClickOutside={() => setNavOpen(false)}
                  contentLocation={{ top: 60, left: 0 }}
                  content={
                    <PopoverNav
                      items={items}
                      slugPrefix={slugPrefix}
                      ariaText={`There ${items.length !== 1 ? 'are' : 'is'} ${
                        items.length
                      } other Tribal Nations to Explore`}
                    />
                  }
                  contentDestination={popoverEl.current}
                  containerStyle={{ overflow: 'visible', zIndex: '100' }}
                >
                  <div style={{ position: 'relative' }}>
                    <Title as="h1">
                      <TitleButton
                        aria-pressed={navOpen}
                        onClick={() => setNavOpen(!navOpen)}
                        aria-label={`${title}. Select a new state`}
                      >
                        {title}
                      </TitleButton>
                    </Title>
                    <div ref={popoverEl} aria-live="polite"></div>
                  </div>
                </Popover>
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
        </Layout.Wrapper>
      </Layout.Padding>
    </Root>
  );
};

export default TribeBillboard;
