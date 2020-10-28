import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { fl_aspectRatio, fl_absoluteFill, fl_attention } from '#styles/frontline';
import tinycolor from 'tinycolor2';
import BackgroundImage from '#components/shared/BackgroundImage';

const ImageSquareStyled = styled(BackgroundImage)`
  ${fl_aspectRatio(1 / 1)}
  background-color: ${props => tinycolor('#fff').darken(props.bkg).toString()};
  position: relative;
  width: 100%;
`;

const Wrapper = styled.div`
  position: relative;
  width: 33.33333333%;
  overflow: hidden;

  ${fl_attention(css`
    cursor: pointer;
    &:before {
      opacity: 1;
      visibility: visible;
    }

    &:after {
      transform: translateY(0);
    }
  `)}

  @media all and ${props => props.theme.breakpoints.full} {
    width: ${props => `${props.size}%`};
  }

  &:before {
    ${fl_absoluteFill}
    background-color: rgba(0,0,0,.5);
    content: '';
    opacity: 0;
    transition: opacity 0.4s ease, border 0.7s ease;
    visibility: hidden;
    z-index: 1;
  }

  &:after {
    bottom: 0;
    background-color: ${props => tinycolor(props.theme.colors.yellow).darken(25).toString()};
    content: '';
    height: 10px;
    left: 0;
    position: absolute;
    width: 100%;
    transform: translateY(100%);
    transition: transform 0.4s ease;
    z-index: 2;
  }
`;

const ImageSquare = ({ image, bkg, className, size, onClick, alt = '' }) => {
  return (
    <Wrapper onClick={onClick} size={size}>
      <ImageSquareStyled size={size} bkg={bkg} className={className}>
        <img srcSet={`${image} 1x`} alt={alt} />
      </ImageSquareStyled>
    </Wrapper>
  );
};

ImageSquare.propTypes = {
  image: PropTypes.string,
  bkg: PropTypes.string,
  className: PropTypes.string,
  size: PropTypes.number,
  onClick: PropTypes.func,
  alt: PropTypes.string,
};

export default ImageSquare;
