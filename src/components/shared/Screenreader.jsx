import React from "react";
import styled from "styled-components";

// styles
import { fl_visuallyHidden } from "#styles/frontline";

const Root = styled.span`
  ${fl_visuallyHidden}
`;

const Screenreader = ({ children }) => {
  return <Root>{children}</Root>;
};

export default Screenreader;
