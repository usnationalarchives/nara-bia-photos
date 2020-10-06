import { css } from 'styled-components';
import * as frontline from '#styles/frontline';

const CarouselStyles = css`
  .carousel {
    position: relative;

    &__image {
      height: auto !important;
      width: auto !important;
    }
  }

  .slider_sliderAnimation {
    transition: transform 0.5s !important;
    transition-timing-function: cubic-bezier(0.645, 0.045, 0.355, 1) !important;
    will-change: tranform !important;
  }
`;

export default CarouselStyles;
