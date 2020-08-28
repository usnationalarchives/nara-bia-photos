import { css } from 'styled-components';
import * as frontline from '#styles/frontline';

const RCSlider = css`
  .rc-slider {
    &-handle {
      &:active,
      &:hover {
        background-color: ${props => props.theme.colors.blue};
      }
    }
  }
`;

export default RCSlider;
