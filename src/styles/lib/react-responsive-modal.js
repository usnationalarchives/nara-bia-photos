import { css } from 'styled-components';
import * as frontline from '#styles/frontline';
import tinycolor from 'tinycolor2';

const ReactResponsiveModalStyles = css`
  .react-responsive-modal {
    &-modal {
      background: transparent;
      box-shadow: none;
    }
    &-overlay {
      background: ${props => tinycolor(props.theme.colors.darkGrey).setAlpha(0.96).toRgbString()};
    }
  }
`;

export default ReactResponsiveModalStyles;
