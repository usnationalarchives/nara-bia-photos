import React from 'react';
import styled, { css } from 'styled-components';
import Intro from './Intro';

const IntroStyled = styled(Intro)`
  /* min-height: 40vw; */
  grid-column-start: 1;
  grid-column-end: 4;
  grid-row-start: 1;
  grid-row-end: 7;
  z-index: 2;

  @media all and (min-width: 400px) {
    grid-row-end: 6;
  }

  @media all and (min-width: 460px) {
    grid-row-end: 5;
  }
  @media all and (min-width: 550px) {
    grid-row-end: 4;
  }

  @media all and ${props => props.theme.breakpoints.medium} {
    grid-row-end: 3;
  }

  @media all and ${props => props.theme.breakpoints.full} {
    ${props =>
      props.$columns === 4 &&
      css`
        grid-column-start: 2;
        grid-column-end: 4;
        grid-row-start: 1;
        grid-row-end: 3;
      `}

    ${props =>
      props.$columns === 5 &&
      css`
        grid-column-start: 2;
        grid-column-end: 5;
        grid-row-start: 1;
        grid-row-end: 4;
      `}

    ${props =>
      props.$columns === 6 &&
      css`
        grid-column-start: 2;
        grid-column-end: 6;
        grid-row-start: 1;
        grid-row-end: 4;
      `}

    ${props =>
      props.$columns === 7 &&
      css`
        grid-column-start: 2;
        grid-column-end: 6;
        grid-row-start: [row-start];
        grid-row-end: 5;
      `}
  }

  @media all and (min-width: 1200px) {
    ${props =>
      props.$columns === 4 &&
      css`
        grid-column-start: 2;
        grid-column-end: 4;
        grid-row-start: 1;
        grid-row-end: 3;
      `}

    ${props =>
      props.$columns === 5 &&
      css`
        grid-column-start: 2;
        grid-column-end: 4;
        grid-row-start: 1;
        grid-row-end: 3;
      `}

    ${props =>
      props.$columns === 6 &&
      css`
        grid-column-start: 2;
        grid-column-end: 5;
        grid-row-start: 1;
        grid-row-end: 3;
      `}

    ${props =>
      props.$columns === 7 &&
      css`
        grid-column-start: 2;
        grid-column-end: 5;
        grid-row-start: [row-start];
        grid-row-end: 4;
      `}
  }
`;

export default IntroStyled;
