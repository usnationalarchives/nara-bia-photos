import styled, { css } from 'styled-components';
import { fl_visuallyHidden, fl_static, fl_attention } from '#styles/frontline';
import { buttonReset } from '#styles/mixins';
import { colors } from '#styles/theme';
import tinycolor from 'tinycolor2';

export const H1 = styled.h1`
  font-weight: bold;
  font-size: 2rem;
  line-height: 1.18;

  @media ${props => props.theme.breakpoints.medium} {
    font-size: 3rem;
    line-height: 1.2;
  }
`;

export const H2 = styled.h2`
  font-weight: bold;
  font-size: 1.25rem;
  line-height: 1.3;

  @media ${props => props.theme.breakpoints.medium} {
    font-size: 2rem;
    line-height: 1.18;
  }

  a {
    ${fl_static(css`
      text-decoration: none;
      color: inherit;
    `)}
    ${fl_attention(css`
      text-decoration: underline;
      color: inherit;
    `)}
  }
`;

export const H3 = styled.h3`
  font-weight: bold;
  font-size: 1rem;
  line-height: 1.625;

  @media ${props => props.theme.breakpoints.medium} {
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

  @media ${props => props.theme.breakpoints.medium} {
    font-size: 1.375rem;
    line-height: 1.6;
  }
`;

export const Label = styled.p`
  font-size: 0.9rem;
  font-weight: bold;
  line-height: 1.2;
  text-transform: uppercase;
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

    p {
      margin-bottom: 1em;

      &:empty {
        display: none !important;
      }
    }

    h2 {
      font-weight: bold;
      font-size: 1.25rem;
      line-height: 1.3;

      @media ${props => props.theme.breakpoints.medium} {
        font-size: 2rem;
        line-height: 1.18;
      }
    }
    h3 {
      font-weight: bold;
      font-size: 1.25rem;
      line-height: 1.3;

      @media ${props => props.theme.breakpoints.medium} {
        font-size: 1.375rem;
        line-height: 1.18;
      }
    }
    h4 {
      font-weight: bold;
      font-size: 1rem;
      line-height: 1.25;
    }
    h5 {
      font-weight: bold;
      font-size: 0.9375rem;
      line-height: 1.33;
    }
    h6 {
      font-weight: normal;
      font-size: 0.8125rem;
      line-height: 1.23;
      text-transform: uppercase;
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      margin-bottom: 1rem;
      margin-top: 2em;

      &:first-child {
        margin-top: 0;
      }
    }

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
      margin: 2em 0;
    }

    // Lists
    //---------------------------------
    ol,
    ul {
      margin-bottom: 1em;
      overflow: hidden; // Prevent custom bullets from overlapping floated elements
      padding-left: fs-rem(30px);

      ul,
      ol {
        margin-bottom: 0;
      }

      li {
        margin-top: 0.5em;

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
          margin-top: 0.5em;
        }

        & > p:last-child {
          margin-bottom: 0;
        }
      }
    }

    ul,
    ol ul {
      list-style: disc;

      ul {
        list-style: circle;
      }
    }

    ol,
    ul ol {
      list-style: decimal;

      ol {
        list-style: lower-alpha;

        ol {
          list-style: lower-roman;
        }
      }
    }

    blockquote {
      font-size: 1.25em;
      font-weight: bold;
      margin: 1.5em auto;
      max-width: 500px;

      & > p:not(:last-child) {
        margin-bottom: 1em;
      }
    }

    table {
      td,
      th {
        font-size: 1em;
      }
    }

    dl {
    }
  }

  a:not([class="btn"]){
    ${fl_static(css`
      color: ${props => props.theme.colors.blue};
    `)}    
    ${fl_static(css`
      text-decoration: underline;
    `)}
  }

  b,
  strong {
    font-weight: bold;
  }

  sup {
    font-size: 0.8em;
    left: -1px;
  }

  small {
    display: inline-block;
  }

  .btn {


    ${buttonReset}
    border-radius: 23px;
    border: 1px solid #fff;
    display: inline-block;
    font-size: 0.75rem;
    font-weight: bold;
    line-height: 1rem;
    padding: 16px 22px;
    text-decoration: none;
    text-transform: uppercase;

    background-color: ${props => props.theme.colors.green};
    color: #fff;

      &:focus,
      &:hover {
        background-color: ${props => tinycolor(props.theme.colors.green).darken(10).toString()};
      }

  }
}
`;
