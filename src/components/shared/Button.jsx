import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { buttonReset } from '#styles/mixins';
import tinycolor from 'tinycolor2';

export const buttonStyles = css`
  ${buttonReset}
  border-radius: 23px;
  border: 1px solid ${props => props.theme.colors.white};
  display: inline-block;
  font-size: 0.75rem;
  font-weight: bold;
  line-height: 1rem;
  padding: 16px 22px;
  text-decoration: none;
  text-transform: uppercase;

  // > * {
  //   position: relative;
  //   line-height: 1;
  //   vertical-align: middle;
  // }

  svg:last-child {
    margin-left: 5px;
  }

  &:focus {
    outline: none;
  }
`;

export const ButtonLink = styled.a`
  ${buttonStyles}
`;

/**
 * Button Component
 */
const ButtonBase = ({ className, onClick, disabled, style, children }) => {
  return (
    <button className={className} onClick={onClick} disabled={disabled} style={style}>
      {children}
    </button>
  );
};

ButtonBase.propTypes = {
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  style: PropTypes.object,
  children: PropTypes.node,
};

const Button = styled(ButtonBase)`
  ${buttonStyles}

  ${props =>
    props.outline &&
    css`
      background: transparent;
      border: solid 1px;
      border-color: ${props.theme.colors.mediumGrey};
      color: ${props.theme.colors.darkGrey};
      font-weight: normal;
      padding: 11px 20px;
      text-transform: none;

      &:focus,
      &:hover {
        border-color: ${props => props.theme.colors.white};
        color: ${props => props.theme.colors.darkGrey};
      }
    `}

  ${props =>
    props.scheme === 'green' &&
    css`
      background-color: ${props => props.theme.colors.green};
      border-color: ${props => props.theme.colors.green};
      color: #fff;

      &:focus,
      &:hover {
        background-color: ${props => tinycolor(props.theme.colors.green).darken(10).toString()};
      }

      ${props =>
        props.outline &&
        css`
          background: transparent;
          color: ${props.theme.colors.green}
          border-color: ${props.theme.colors.green};
        `}
    `};

  ${props =>
    props.scheme === 'blue' &&
    css`
      background-color: ${props => props.theme.colors.blue};
      color: #fff;

      &:focus,
      &:hover {
        background-color: ${props => tinycolor(props.theme.colors.blue).darken(10).toString()};
      }

      ${props =>
        props.outline &&
        css`
          color: ${props.theme.colors.blue};
          background: transparent;
          border-color: ${props.theme.colors.blue};
        `}
    `};

  ${props =>
    props.scheme === 'white' &&
    css`
      background-color: ${props => props.theme.colors.white};
      color: #fff;

      &:focus,
      &:hover {
        background-color: ${props => tinycolor(props.theme.colors.white).darken(10).toString()};
      }

      ${props =>
        props.outline &&
        css`
          color: ${props.theme.colors.white};
          background: transparent;
          border-color: ${props.theme.colors.white};
        `}
    `};

  ${props =>
    props.disabled === 'true' &&
    css`
      background-color: ${props => props.theme.colors.mediumGrey};

      &:focus,
      &:hover {
        background-color: ${props => tinycolor(props.theme.colors.mediumGrey).darken(3).toString()};};
      }

        ${props =>
          props.outline &&
          css`
            background: transparent;
            border-color: ${props.theme.colors.mediumGrey};
          `}

    `};
`;

export default Button;
