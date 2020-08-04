import React from 'react';
import styled from 'styled-components';

// components
import CopyrightNav from './CopyrightNav';

// config
import content from '#config/content';

const Root = styled.div`
  border-top: 1px solid rgba(255, 255, 255, 0.4);
  margin-top: 30px;
  padding-top: 30px;

  @media all and ${props => props.theme.breakpoints.medium} {
    display: flex;
    justify-content: space-between;
    margin-top: 50px;
    padding-top: 50px;
  }
`;

const Text = styled.p`
  font-size: 0.8rem;
`;

const Copyright = () => {
  return (
    <Root>
      <Text>{content.footer.copyright}</Text>
      <CopyrightNav />
    </Root>
  );
};

export default Copyright;
