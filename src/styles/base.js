import { css, createGlobalStyle } from 'styled-components';
import * as frontline from '#styles/frontline';

import BackgroundStyles from '#styles/helpers/background';
import RCSlider from '#styles/lib/rc-slider';
import ReactTabsStyles from '#styles/lib/react-tabs';
import ReactResponsiveModalStyles from '#styles/lib/react-responsive-modal';
import CarouselStyles from '#styles/lib/carousel';
import AddThis from '#styles/lib/add-this';

import 'react-responsive-modal/styles.css';

const BaseStyles = createGlobalStyle`
  html {
    background-color: ${props => props.theme.colors.white};
    color: ${props => props.theme.colors.darkGrey};
    font-family: ${props => props.theme.font.family};
    /* scroll-behavior: smooth; */

    @media screen and (prefers-reduced-motion: reduce){
      scroll-behavior: auto;
    }
  }

  body {
    overflow-x: hidden;
  }

  [data-whatinput='mouse'],
  [data-whatinput='touch'] {
    $:focus {
      outline: none
    }
  }

  .rsm-geography:focus {
    outline: none;
  }

  /* text {
    font-size: 10px;
  } */

  ${BackgroundStyles}
  ${CarouselStyles}
  ${RCSlider}
  ${ReactTabsStyles}
  ${ReactResponsiveModalStyles}
  ${AddThis}


  .screenreader {
    ${frontline.fl_visuallyHidden}
  }

  .tip {
      z-index: 1001 !important;
  }

  .result_link {
    ${frontline.fl_static(css`
      color: ${props => props.theme.colors.darkGrey};
      text-decoration: none;
    `)}

    ${frontline.fl_attention(css`
      color: ${props => props.theme.colors.darkGrey};
      text-decoration: underline;
    `)}
  }

  .skip-links {
    a {
      background-color: #000;
      color: #fff;
      display: inline-block;
      font-size: 16px;
      position: absolute;
      padding: 8px 15px;
      line-height: 1.4;
      right: 20px;
      top: -200px; // Must be larger than the element's height
      z-index: -1;

      &:focus {
        top: 2px;
        z-index: 9999;
      }
    }
  }

  .js-no-scroll,
  .js-no-scroll body {
    overflow: hidden;
    touch-action: none;
  }

  /* Create class to allow scrolling on certain elements, like modal windows */
  .allow-scroll { touch-action: auto !important; }

  @media print {
    * {
      background: transparent !important;
      box-shadow: none !important;
      color: #000 !important; // Black prints faster: http://h5bp.com/s
      filter: none !important;
      text-shadow: none !important;
      transition: none !important;
    }

    html {
      font-size: percentage(13px / 16px);// [2]
    }

    svg {
      fill: #000 !important;
    }

    img {
      max-width: 100% !important;
    }

    p,
    h2,
    h3 {
      orphans: 2;
      widows: 2;
    }

    h2,
    h3 {
      page-break-after: avoid;
    }

    a {
      ${frontline.fl_static(`
        color: ${props => props.theme.colors.blue}
      `)}

      &:visited {
        color: 'purple';
      }
    }

    @page { margin: 0.75in 0.75in 1in; }
  }

`;

export default BaseStyles;
