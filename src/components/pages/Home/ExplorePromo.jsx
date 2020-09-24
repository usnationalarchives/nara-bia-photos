import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

// components
import * as Text from '#components/shared/Text';
import Toggle from '#components/shared/Toggle';

const ExplorePromoStyled = styled.div`
  background-color: ${props => props.theme.colors.blue};
  color: ${props => props.theme.colors.white};
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px;
  /* min-height: 20vw; */

  ${props =>
    props.scheme === 'yellow' &&
    css`
      background-color: ${props.theme.colors.yellow};
      color: ${props => props.theme.colors.black};
    `}
  ${props =>
    props.scheme === 'green' &&
    css`
      background-color: ${props.theme.colors.green};
    `};

  @media all and ${props => props.theme.breakpoints.medium} {
    padding: 50px 50px 30px 50px;
  }

  > * {
    margin-top: 15px;

    &:first-child {
      margin-top: 0;
    }
  }

  div > * {
    margin-top: 15px;

    &:first-child {
      margin-top: 0;
    }
  }
`;

const ExplorePromo = ({ title, text, scheme, className }) => {
  return (
    <ExplorePromoStyled className={className} scheme={scheme}>
      <div>
        <Text.H2>{title}</Text.H2>
        <p>{text}</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Toggle style={{ marginTop: '30px' }} outline scheme={scheme === 'yellow' ? 'light' : 'dark'}></Toggle>
      </div>
    </ExplorePromoStyled>
  );
};

ExplorePromo.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string,
  scheme: PropTypes.string,
};

export default ExplorePromo;
