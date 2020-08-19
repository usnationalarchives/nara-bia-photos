import { css } from 'styled-components';
import * as frontline from '#styles/frontline';

const BackgroundStyles = css`
  .bg {
    /* Default background color */
    &-default {
      background-color: $bg-default;
    }

    /* Fill parent with <img> (polyfilled by background-picture.js) */
    &-image {
      display: block;
      position: relative;

      &-source {
        ${frontline.fl_absoluteFill}
        object-fit: cover;
      }
    }
  }
`;

export default BackgroundStyles;
