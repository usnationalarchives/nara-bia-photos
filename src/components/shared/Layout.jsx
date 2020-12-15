import styled, { css } from 'styled-components';
import { fl_clearfix } from '#styles/frontline';

export const Padding = styled.div`
  width: 100%;
  padding-left: ${props => props.theme.layout.minPadding};
  padding-right: ${props => props.theme.layout.minPadding};

  @media all and ${props => props.theme.breakpoints.medium} {
    padding-left: ${props => props.theme.layout.maxPadding};
    padding-right: ${props => props.theme.layout.maxPadding};
  }

  @media print {
    padding-left: 0;
    padding-right: 0;
  }
`;

export const Strata = styled.div`
  margin-top: 2rem;
  margin-bottom: 2rem;

  @media all and ${props => props.theme.breakpoints.tablet} {
    margin-top: 5rem;
    margin-bottom: 5rem;
  }
`;

export const Wrapper = styled.div`
  ${fl_clearfix}

  margin-left: auto;
  margin-right: auto;
  max-width: ${props => props.theme.layout.maxWidth};

  ${props =>
    props.full &&
    css`
      max-width: ${props => props.theme.layout.maxWidthFull} !important;
    `};

  ${props =>
    props.wide &&
    css`
      max-width: ${props => props.theme.layout.maxWidthWide} !important;
    `};

  ${props =>
    props.medium &&
    css`
      max-width: ${props => props.theme.layout.maxWidthMedium} !important;
    `};

  ${props =>
    props.large &&
    css`
      max-width: ${props => props.theme.layout.maxWidthLarge} !important;
    `};

  ${props =>
    props.narrow &&
    css`
      max-width: ${props => props.theme.layout.maxWidthNarrow} !important;
    `};

  @media print {
    max-width: none !important;
  }

  &:focus {
    outline: none;
  }
`;

export const Center = styled.div`
  text-align: center;
`;
