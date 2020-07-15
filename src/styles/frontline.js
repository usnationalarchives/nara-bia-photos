import { css } from "styled-components";

export const fl_clearfix = css`
  &:after {
    clear: both;
    content: "";
    display: table;
  }
`;

export const fl_visuallyHidden = css`
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;

export const fl_hideText = css`
  font-size: 0;
  overflow: hidden;
  text-indent: 110%; // > 100% prevents issue with inline-block elements
  white-space: nowrap;
`;

export const fl_AbsoluteFill = css`
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
`;

export const fl_printHide = css`
  @media print {
    display: none !important;
  }
`;

export const fl_attention = (content) => {
  return css`
    &:hover,
    &:focus,
    &:active {
      ${content}
    }
  `;
};

export const fl_static = (content) => {
  return css`
    &,
    &:link,
    &:visited {
      ${content}
    }
  `;
};

export const fl_allStates = (content) => {
  return css`
    &,
    &:link,
    &:visited,
    &:focus,
    &:hover,
    &:active {
      ${content}
    }
  `;
};
