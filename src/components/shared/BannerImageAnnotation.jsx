import React from 'react';
import styled, { css } from 'styled-components';

import { fl_static, fl_attention } from '#styles/frontline';

const BannerImageAnnotation = styled.ul`
  list-style: none;

  .uppercase {
    text-transform: uppercase;
  }

  li {
    margin-top: 15px;

    &:first-child {
      margin-top: 0;
    }
  }

  span {
    display: block;
  }

  a {
    ${fl_static(css`
      color: ${props => props.theme.colors.blue};
    `)}
    ${fl_attention(css`
      text-decoration: underline;
    `)}
  }
`;

export default BannerImageAnnotation;
