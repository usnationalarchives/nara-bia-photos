import React from 'react';
import styled, { css } from 'styled-components';
import ExplorePromo from './ExplorePromo';

const ExploreNativeAmericansStyled = styled(ExplorePromo)`
  grid-column-start: 1;
  grid-column-end: 4;
  grid-row-start: 14;
  grid-row-end: 16;
  z-index: 2;

  @media all and (min-width: 400px) {
    grid-row-start: 12;
    grid-row-end: 14;
  }

  @media all and (min-width: 460px) {
    grid-row-start: 11;
    grid-row-end: 13;
  }
  @media all and (min-width: 550px) {
    grid-row-start: 10;
    grid-row-end: 12;
  }

  @media all and ${props => props.theme.breakpoints.medium} {
    grid-row-start: 9;
    grid-row-end: 11;
  }

  @media all and ${props => props.theme.breakpoints.full} {
    ${props =>
      props.$columns === 4 &&
      css`
        grid-column-start: 1;
        grid-column-end: 3;
        grid-row-start: 7;
        grid-row-end: 9;
      `}

    ${props =>
      props.$columns === 5 &&
      css`
        grid-column-start: 1;
        grid-column-end: 4;
        grid-row-start: 8;
        grid-row-end: 10;
      `}

    ${props =>
      props.$columns === 6 &&
      css`
        grid-column-start: 2;
        grid-column-end: 5;
        grid-row-start: 8;
        grid-row-end: 10;
      `}

    ${props =>
      props.$columns === 7 &&
      css`
        grid-column-start: 2;
        grid-column-end: 5;
        grid-row-start: 9;
        grid-row-end: 11;
      `}
  }

  @media all and (min-width: 1200px) {
    ${props =>
      props.$columns === 4 &&
      css`
        grid-column-start: 1;
        grid-column-end: 3;
        grid-row-start: 6;
        grid-row-end: 7;
      `}

    ${props =>
      props.$columns === 5 &&
      css`
        grid-column-start: 2;
        grid-column-end: 4;
        grid-row-start: 6;
        grid-row-end: 7;
      `}

    ${props =>
      props.$columns === 6 &&
      css`
        grid-column-start: 2;
        grid-column-end: 4;
        grid-row-start: 7;
        grid-row-end: 9;
      `}

    ${props =>
      props.$columns === 7 &&
      css`
        grid-column-start: 2;
        grid-column-end: 5;
        grid-row-start: 8;
        grid-row-end: 10;
      `}
  }
`;

export default ExploreNativeAmericansStyled;
