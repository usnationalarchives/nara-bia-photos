import React from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

import * as Text from '#components/shared/Text';

// config
import content from '#config/content';

// styles
import { fl_attention, fl_static } from '#styles/frontline';

import { ReactComponent as StateIcon } from '#assets/svgs/home-state.svg';
import { ReactComponent as TopicIcon } from '#assets/svgs/home-topic.svg';
import { ReactComponent as TribalNationIcon } from '#assets/svgs/home-tribal-nation.svg';

const { title, text, cta } = content.home.intro;

const IntroStyled = styled.div`
  background-color: ${props => props.theme.colors.blue};
  color: ${props => props.theme.colors.white};
  padding: 25px;
  display: flex;
  align-items: center;
  transition: height 0.3s ease, width 0.3s ease;

  @media all and ${props => props.theme.breakpoints.medium} {
    /* padding: 35px 60px; */
    padding: 20px;
  }

  > * {
    margin-top: 25px;

    &:first-child {
      margin-top: 0;
    }
  }

  > a {
    display: block;
    text-transform: uppercase;

    ${fl_static(css`
      color: #fff;
      text-decoration: underline;
    `)}
  }
`;

const IntroContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  > * {
    margin-top: 19px;

    &:first-child {
      margin-top: 0;
    }
  }
`;

const LinkStyled = styled(Link)`
  font-size: 13px;
  font-weight: bold;
  text-transform: uppercase;
  ${fl_static(css`
    color: #fff;
  `)}
`;

const SectionLinks = styled.div`
  display: flex;
  align-items: space-between;
  flex-direction: row;
  flex-wrap: nowrap;
`;

const SectionLink = styled(Link)`
  align-items: center;
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  text-align: center;
  width: 100%;

  @media all and ${props => props.theme.breakpoints.medium} {
    margin-top: 20px;
  }

  ${fl_static(css`
    color: ${props => props.theme.colors.white};
    text-decoration: none;
  `)}
  ${fl_attention(css`
    color: ${props => props.theme.colors.white};
    text-decoration: underline;
  `)}

  > *:first-child {
    flex: 0 0 60px;
    margin: 0 auto;
    text-align: center;

    @media all and ${props => props.theme.breakpoints.medium} {
      flex: 0 0 80px;
    }
  }

  > *:last-child {
    flex: 1 0 auto;

    @media all and ${props => props.theme.breakpoints.medium} {
      margin-left: 0;
    }
  }

  svg {
    fill: #fff;
    &.small {
      width: 55px;
      @media all and ${props => props.theme.breakpoints.medium} {
        width: 70px;
      }
    }
    &.large {
      width: 80px;
      @media all and ${props => props.theme.breakpoints.medium} {
        width: 96px;
      }
    }
  }
`;

const Intro = ({ className }) => {
  return (
    <IntroStyled className={className}>
      <IntroContent style={{ maxWidth: '500px', margin: '0 auto' }}>
        <Text.H2>{title}</Text.H2>
        <p>{text}</p>
        <LinkStyled to="/about">{cta}</LinkStyled>
        <p
          style={{
            borderTop: 'solid 1px #fff',
            textTransform: 'uppercase',
            fontSize: '13px',
            marginTop: '25px',
            paddingTop: '25px',
          }}
          aria-label="Explore photographs by"
        >
          Explore photographs by
        </p>

        <SectionLinks>
          <SectionLink to="/tribal-nations">
            <span>
              <TribalNationIcon className="small" width={81} fill="currrentColor" />
            </span>
            <span aria-label="Tribal Nation">Tribal Nation</span>
          </SectionLink>
          <SectionLink to="/topics">
            <span>
              <TopicIcon className="small" width={81} fill="currrentColor" />
            </span>
            <span aria-label="Topic">Topic</span>
          </SectionLink>
          <SectionLink to="/states">
            <span>
              <StateIcon className="large" width={120} fill="currrentColor" />
            </span>
            <span aria-label="State">State</span>
          </SectionLink>
        </SectionLinks>
      </IntroContent>
    </IntroStyled>
  );
};

export default Intro;
