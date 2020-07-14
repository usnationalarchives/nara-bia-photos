import React from "react";
import styled, { css } from "styled-components";

const layoutMaxWidth = "960px";
const layoutMaxWidthWide = "1120px";
const layoutMaxWidthNarrow = "620px";
const layoutMaxWidthMedium = "800px";

const Wrapper = styled.div`
  margin-left: auto;
  margin-right: auto;
  max-width: ${layoutMaxWidth};

  @media print {
    max-width: none;
  }

  &:after {
    clear: both;
    content: "";
    display: table;
  }

  @media all and (min-width: 1300px) {
    max-width: 1200px;
  }

  ${(props) =>
    props.wide &&
    css`
      max-width: ${layoutMaxWidthWide} !important;
    `};

  ${(props) =>
    props.medium &&
    css`
      max-width: ${layoutMaxWidthMedium} !important;
    `};

  ${(props) =>
    props.narrow &&
    css`
      max-width: ${layoutMaxWidthNarrow} !important;
    `};

  @media print {
    max-width: none !important;
  }
`;

export default (props) => {
  const { children: children, ...rest } = props;
  return <Wrapper {...rest}>{children}</Wrapper>;
};
