import { css } from 'styled-components';
import * as frontline from '#styles/frontline';
import tinycolor from 'tinycolor2';

const ReactResponsiveModalStyles = css`
  .react-responsive-modal {
    &-closeButton {
      fill: #fff;
      top: 10px;
      right: 10px;
    }
    &-modal {
      background: transparent;
      box-shadow: none;
      max-width: 100%;
      margin: 0;
      padding: 5px;
      width: 100%;
    }
    &-overlay {
      padding: 0;
      background: ${props => tinycolor(props.theme.colors.darkGrey).setAlpha(0.96).toRgbString()};
      &--light {
        background: ${props => tinycolor(props.theme.colors.white).setAlpha(0.96).toRgbString()};
      }
    }
  }
`;

export default ReactResponsiveModalStyles;
