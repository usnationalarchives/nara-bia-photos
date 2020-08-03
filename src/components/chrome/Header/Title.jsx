import React from "react";
import styled from "styled-components";

const Root = styled.div`
  border-left: 1px solid rgba(255, 255, 255, 0.5);
  margin-left: 0.5rem;
  padding-left: 0.5rem;

  @media all and ${(props) => props.theme.breakpoints.medium} {
    margin-left: 1rem;
    padding-left: 1rem;
  }
`;

const Line1 = styled.p`
  text-transform: uppercase;
  font-size: 0.65rem;
  font-weight: 200;

  @media all and ${(props) => props.theme.breakpoints.large} {
    font-size: 0.8rem;
  }
`;

const Line2 = styled.p`
  font-size: 0.85rem;
  font-weight: bold;

  @media all and ${(props) => props.theme.breakpoints.large} {
    font-size: 1.25rem;
  }
`;

const Title = () => {
  return (
    <Root>
      <Line1>Bureau of Indian Affairs</Line1>
      <Line2>Photography Finding Aid</Line2>
    </Root>
  );
};

export default Title;
