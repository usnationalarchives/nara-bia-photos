import React from 'react';
import styled from 'styled-components';

const Root = styled.div`
  background-color: ${props => props.theme.colors.lightGrey};
  border-radius: 5px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.15);
  color: ${props => props.theme.colors.darkGrey};
  font-size: 0.8rem;
  max-height: 500px;
  overflow-y: auto;
  padding: 0.5rem 1rem;
  width: 300px;
`;

const PopoverInfo = ({ ...props }) => {
  return <Root {...props}>{props.children}</Root>;
};

export default PopoverInfo;
