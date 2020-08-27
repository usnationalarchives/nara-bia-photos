import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

// styles
import { fl_absoluteFill } from '#styles/frontline';

const StyledLink = styled(Link)`
  &:before {
    content: '';
    ${fl_absoluteFill}
    z-index: 900
  }
`;

const CoverLink = props => {
  return <StyledLink {...props}>{props.children}</StyledLink>;
};

export default CoverLink;
