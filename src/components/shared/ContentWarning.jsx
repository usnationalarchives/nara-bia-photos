import React, { useEffect } from 'react';
import styled from 'styled-components';
import * as frontline from '#styles/frontline';

// assets
import { ReactComponent as Warning } from '#assets/icons/warning.svg';

const Root = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;
const Text = styled.span`
  color: #fff;
  font-size: 0.75rem;
  margin-top: 6px;
  text-transform: uppercase;
`;

const ContentWarning = ({ style }) => {
  return (
    <Root style={style}>
      <span>
        <Warning width={20} fill="#fff" />
      </span>
      <Text>Content Warning</Text>
    </Root>
  );
};

export default ContentWarning;
