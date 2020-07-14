import React from "react";
import styled from "styled-components";

const Padding = styled.div`
  width: 100%;
  padding-left: 10px;
  padding-right: 10px;

  @media all and (min-width: 320px) {
    padding-left: 15px;
    padding-right: 15px;
  }

  @media all and (min-width: 400px) {
    padding-left: 20px;
    padding-right: 20px;
  }

  @media all and (min-width: 600px) {
    padding-left: 30px;
    padding-right: 30px;
  }

  @media print {
    padding-left: 0;
    padding-right: 0;
  }
`;

export default (props) => {
  const { children: children, ...rest } = props;
  return <Padding {...rest}>{children}</Padding>;
};
