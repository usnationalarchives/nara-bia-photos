import styled, { css } from "styled-components";

export const Padding = styled.div`
  width: 100%;
  padding-left: ${(props) => props.theme.layout.minPadding};
  padding-right: ${(props) => props.theme.layout.minPadding};

  @media all and ${(props) => props.theme.breakpoints.medium} {
    padding-left: ${(props) => props.theme.layout.maxPadding};
    padding-right: ${(props) => props.theme.layout.maxPadding};
  }

  @media print {
    padding-left: 0;
    padding-right: 0;
  }
`;

export const Wrapper = styled.div`
  margin-left: auto;
  margin-right: auto;
  max-width: ${(props) => props.theme.layout.maxWidth};

  &:after {
    clear: both;
    content: "";
    display: table;
  }

  ${(props) =>
    props.wide &&
    css`
      max-width: ${(props) => props.theme.layout.maxWidthWide} !important;
    `};

  ${(props) =>
    props.medium &&
    css`
      max-width: ${(props) => props.theme.layout.maxWidthMedium} !important;
    `};

  ${(props) =>
    props.narrow &&
    css`
      max-width: ${(props) => props.theme.layout.maxWidthNarrow} !important;
    `};

  @media print {
    max-width: none !important;
  }
`;
