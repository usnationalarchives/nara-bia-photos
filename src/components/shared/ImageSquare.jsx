import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { fl_aspectRatio, fl_absoluteFill, fl_attention } from '#styles/frontline';
import tinycolor from 'tinycolor2';
import BackgroundImage from '#components/shared/BackgroundImage';

const ImageSquareStyled = styled(BackgroundImage)`
  ${fl_aspectRatio(1 / 1)}
  background-color: ${props => tinycolor('#fff').darken(props.bkg).toString()};
  /* width: 20%; */
  position: relative;
  width: 33.3333333vw;

  @media all and ${props => props.theme.breakpoints.full} {
    width: ${props => `${props.size}vw`};
  }
`;

const Wrapper = styled.div`
  position: relative;

  ${fl_attention(css`
    cursor: pointer;
    &:before {
      opacity: 1;
      visibility: visible;
    }
  `)}

  &:before {
    ${fl_absoluteFill}
    background-color: rgba(0,0,0,.5);
    border-bottom: 6px solid ${props => props.theme.colors.yellow}; 
    content '';
    opacity: 0;
    transition: opacity .7s ease, border .7s ease;
    visibility: hidden;
    z-index: 1;
  }
`;

const ImageSquare = ({ image, bkg, className, size, onClick }) => {
  return (
    <Wrapper onClick={onClick}>
      <ImageSquareStyled size={size} bkg={bkg} className={className}>
        <img srcSet={`${image} 1x`} />
      </ImageSquareStyled>
    </Wrapper>
  );
};

// ImageSquare.proptypes = {};

export default ImageSquare;
