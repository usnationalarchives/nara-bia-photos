import React from 'react';
import styled from 'styled-components';

const Root = styled.div`
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.15);
  position: relative;
`;

const Card = ({ ...props }) => {
  return <Root>{props.children}</Root>;
};

export default Card;
