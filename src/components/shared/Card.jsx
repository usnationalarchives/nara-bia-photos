import React from 'react';
import styled from 'styled-components';

const Root = styled.div`
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: stretch;
  flex-direction: column;
  position: relative;
  width: 100%;
`;

const Card = ({ ...props }) => {
  return <Root>{props.children}</Root>;
};

export default Card;
