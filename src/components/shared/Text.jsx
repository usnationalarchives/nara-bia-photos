import styled from "styled-components";
import { fl_visuallyHidden } from "#styles/frontline";

export const H1 = styled.h1`
  font-weight: bold;
  font-size: 2rem;
  line-height: 1.18;

  @media ${(props) => props.theme.breakpoints.medium} {
    font-size: 3rem;
    line-height: 1.2;
  }
`;

export const H2 = styled.h2`
  font-weight: bold;
  font-size: 1.25rem;
  line-height: 1.3;

  @media ${(props) => props.theme.breakpoints.medium} {
    font-size: 2rem;
    line-height: 1.18;
  }
`;

export const H3 = styled.h3`
  font-weight: bold;
  font-size: 1rem;
  line-height: 1.625;

  @media ${(props) => props.theme.breakpoints.medium} {
    font-size: 1.375rem;
    line-height: 1.18;
  }
`;

export const H4 = styled.h4`
  font-weight: bold;
  font-size: 1rem;
  line-height: 1.25;
`;

export const H5 = styled.h5`
  font-weight: bold;
  font-size: 0.9375rem;
  line-height: 1.33;
`;

export const H6 = styled.h6`
  font-weight: normal;
  font-size: 0.8125rem;
  line-height: 1.23;
  text-transform: uppercase;
`;

export const Intro = styled.p`
  font-weight: 200;
  font-size: 1.125rem;
  line-height: 1.55;

  @media ${(props) => props.theme.breakpoints.medium} {
    font-size: 1.375rem;
    line-height: 1.6;
  }
`;

export const Screenreader = styled.span`
  ${fl_visuallyHidden}
`;

export const Rich = styled.div`
  font-size: 1rem;
  line-height: 1.625;

  & > {
    div {
      margin-bottom: 2em;
      margin-top: 2em;

      &:first-child {
        margin-top: 0;
      }

      &:last-child {
        margin-bottom: 0;
      }
    }

    *:first-child {
      margin-top: 0;
    }

    *:last-child {
      margin-bottom: 0;
    }

    // Links will always be within a child of the richtext class,
    // so select all children other than divs, which are only used for shortcode components.
    *:not(div) {
      // Exclude links with “btn” class to avoid conflicts with button styles
      a:not(.btn) {
        @include link-richtext;
      }
    }

    // Paragraphs
    //---------------------------------
    p {
      margin-bottom: 1em;

      // Hide any empty paragraphs inadvertantly created in the rich text editor
      &:empty {
        display: none !important;
      }
    }

    // Headings
    //---------------------------------
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      // NOTE: Margins may need to be defined separately for each heading, depends on design system.
      margin-bottom: 1rem;
      margin-top: 2em;
      // Optional: Apply “optimizeLegibility” if it makes a difference (not all fonts are affected)
      // text-rendering: optimizeLegibility;

      // “optimizeLegibility” was buggy on old versions of webOS.
      // Since we don’t have an easy way of testing on modern
      // smart TVs and refrigerators that use webOS to see if
      // it’s still an issue, assume it is and disable.
      // https://github.com/scottjehl/Device-Bugs/issues/10
      // .ua-webos & {
      //   text-rendering: auto;
      // }

      &:first-child {
        margin-top: 0;
      }
    }

    // Adjust margins when headings are adjacent (optional)
    // Note: We shouldn’t have to list every possible combination since headings should be in order.
    h2 + h2,
    h3 + h3,
    h4 + h4,
    h5 + h5,
    h6 + h6,
    h1 + h2,
    h2 + h3,
    h3 + h4,
    h4 + h5,
    h5 + h6 {
      margin-top: 1em;
    }

    // Horz rule
    //---------------------------------
    hr {
      @include hr-default;
      margin: 2em 0;
    }

    // Lists
    //---------------------------------
    ol,
    ul {
      $list-margin: 1em;
      $list-item-margin: 0.5em;
      margin-bottom: $list-margin;
      overflow: hidden; // Prevent custom bullets from overlapping floated elements
      padding-left: fs-rem(30px);

      @include fs-min-width(480px) {
        padding-left: fs-rem(45px);
      }

      ul,
      ol {
        margin-bottom: 0;
      }

      li {
        margin-top: $list-item-margin;

        ol {
          padding-left: fs-rem(27px);
        }

        ul {
          padding-left: fs-rem(20px);
        }

        &:first-child {
          margin-top: 0;
        }

        li:first-child {
          margin-top: $list-item-margin;
        }

        & > p:last-child {
          margin-bottom: 0;
        }
      } // end li
    } // end ol/ul

    // Unordered list bullet styles
    ul,
    ol ul {
      list-style: disc;

      // 2nd level and below
      ul {
        list-style: circle;
      }
    } // end ul

    // Ordered list bullet styles
    ol,
    ul ol {
      list-style: decimal;

      // 2nd level
      ol {
        list-style: lower-alpha;

        // 3rd level and below
        ol {
          list-style: lower-roman;
        }
      }
    } // end ol

    // Blockquotes
    //---------------------------------
    blockquote {
      font-size: 1.25em;
      font-weight: bold;
      margin: 1.5em auto;
      max-width: 500px;

      & > p:not(:last-child) {
        margin-bottom: 1em;
      }
    } // end blockquote

    // Tables
    //---------------------------------
    table {
      @include table-styles;

      td,
      th {
        font-size: 1em;
      }
    }

    // Add top margin to consecutive tables
    @at-root .js-tablewrap + .js-tablewrap {
      margin-top: fs-em(50px);
    }

    // Definition lists
    //---------------------------------
    dl {
    }
  } // end children

  // These inline elements won’t be direct children, so style them normally.
  // Most shortcode components won't use these tags, and if they do we can override them.
  b,
  strong {
    font-weight: bold;
  }

  sup {
    font-size: 0.8em;
    left: -1px;
  }

  code,
  kbd,
  pre,
  samp {
    font-family: $monospace;
  }

  // Set to “inline-block” to allow line-height to adjust
  small {
    display: inline-block;
  }
`;
