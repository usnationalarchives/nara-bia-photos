import { css } from 'styled-components';
import * as frontline from '#styles/frontline';

const RCSlider = css`
  .rc-slider {
    &-handle {
      &:hover {
        background-color: ${props => props.theme.colors.blue};
        cursor: grab;
      }
      &:active {
        cursor: grab !important;
        cursor: grabbing !important;
        cursor: -moz-grabbing !important;
        cursor: -webkit-grabbing !important;
      }
    }
  }
`;

export default RCSlider;
