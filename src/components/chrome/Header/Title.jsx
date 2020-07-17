import React from "react";
import styled from "styled-components";

const Root = styled.div`
  border-left: 1px solid rgba(255, 255, 255, 0.5);
  margin-left: 1rem;
  padding-left: 1rem;
`;

const Line1 = styled.p`
  text-transform: uppercase;
  font-size: 0.8rem;
  font-weight: 200;
`;

const Line2 = styled.p`
  font-size: 1.25rem;
  font-weight: bold;
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
