import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { fl_allStates, fl_static, fl_attention } from '#styles/frontline';

import { ReactComponent as ExternalIcon } from '#assets/icons/external-link.svg';

const LinkStyled = styled.a`
  align-items: center;
  display: flex;
  flex: 0 0 auto;
  text-transform: uppercase;
  font-size: 14px;

  ${fl_static(css`
    color: ${props => props.theme.colors.blue};
  `)}
`;

const ExternalLink = ({ href, children }) => {
  return (
    <LinkStyled href={href}>
      {children}
      <ExternalIcon style={{ marginLeft: '12px' }} width={15} fill="currentColor" />
    </LinkStyled>
  );
};

export default ExternalLink;
