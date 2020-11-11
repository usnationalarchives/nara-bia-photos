import React from 'react';
import styled, { css } from 'styled-components';
import ExplorePromo from './ExplorePromo';

const ExploreTribalNationsStyled = styled(ExplorePromo)`
grid-column-start: 1;
grid-column-end: 4;
grid-row-start: 6;
grid-row-end: auto;
/* min-height: 20vw; */
z-index: 2;

@media all and ${props => props.theme.breakpoints.medium} {
  grid-row-start: 5;
  grid-row-end: 7;
}

@media all and ${props => props.theme.breakpoints.full} {
  ${props =>
    props.$columns === 4 &&
    css`
      grid-column-start: 3;
      grid-column-end: col-end;
      grid-row-start: 4;
      grid-row-end: 6;
    `}

  ${props =>
    props.$columns === 5 &&
    css`
      grid-column-start: 3;
      grid-column-end: 6;
      grid-row-start: 5;
      grid-row-end: 7;
    `}

  ${props =>
    props.$columns === 6 &&
    css`
      grid-column-start: 3;
      grid-column-end: 6;
      grid-row-start: 5;
      grid-row-end: 7;
    `}

  ${props =>
    props.$columns === 7 &&
    css`
      grid-column-start: 4;
      grid-column-end: 7;
      grid-row-start: 6;
      grid-row-end: 8;
    `}
  }
}

@media all and (min-width: 1200px) {

  ${props =>
    props.$columns === 4 &&
    css`
      grid-column-start: 3;
      grid-column-end: col-end;
      grid-row-start: 4;
      grid-row-end: 5;
    `}

  ${props =>
    props.$columns === 5 &&
    css`
      grid-column-start: 3;
      grid-column-end: 5;
      grid-row-start: 4;
      grid-row-end: 5;
    `}

  ${props =>
    props.$columns === 6 &&
    css`
      grid-column-start: 4;
      grid-column-end: 6;
      grid-row-start: 4;
      grid-row-end: 6;
    `}

  ${props =>
    props.$columns === 7 &&
    css`
      grid-column-start: 4;
      grid-column-end: 7;
      grid-row-start: 5;
      grid-row-end: 7;
    `}
  }
`;

export default ExploreTribalNationsStyled;
