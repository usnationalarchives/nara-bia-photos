import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { fl_aspectRatio, fl_absoluteFill } from '#styles/frontline';
import tinycolor from 'tinycolor2';
import BackgroundImage from '#components/shared/BackgroundImage';

const ImageSquareStyled = styled(BackgroundImage)`
  ${fl_aspectRatio(1 / 1)}
  background-color: ${props => tinycolor('#fff').darken(props.bkg).toString()};
  /* width: 20%; */
  position: relative;

  width: ${props => `${props.size}vw`};
`;

const ImageStyled = styled.img`
  /* ${fl_absoluteFill} */
`;

const ImageSquare = ({ image, bkg, className, size }) => {
  return (
    <ImageSquareStyled size={size} bkg={bkg} className={className}>
      <img srcSet={`${image} 1x`} />
    </ImageSquareStyled>
  );
};

// ImageSquare.proptypes = {};

export default ImageSquare;
