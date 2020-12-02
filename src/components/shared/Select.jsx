import React from 'react';
import styled, { css } from 'styled-components';

const SelectWrapper = styled.div`
  background-color: #fff;
  border-radius: 23px;
  display: inline-block;
  position: relative;

  ${props =>
    props.transparent &&
    css`
      background-color: transparent;
    `}

  &:after {
    /* don't reorder these border properties */
    border: 6px solid ${props => props.theme.colors.blue};

    ${props =>
      props.transparent &&
      css`
        border: 6px solid ${props => props.theme.colors.white};
      `}

    border-bottom-color: transparent;
    border-left-color: transparent;
    border-right-color: transparent;

    border-radius: 2px;
    content: '';
    display: block;
    height: 12px;
    overflow: hidden;
    position: absolute;
    right: 18px;
    top: 20px;
    width: 12px;
    z-index: 1;
  }
`;

const SelectMenu = styled.select`
  appearance: none;
  background-color: transparent;
  border: solid 1px ${props => props.theme.colors.mediumGrey};
  border-radius: 23px;
  font-size: 0.75rem;
  padding: 14px 40px 14px 22px;
  position: relative;
  text-decoration: none;
  text-align: left;
  text-transform: uppercase;
  z-index: 2;
  width: 100%;

  ${props =>
    props.transparent &&
    css`
      background-color: transparent;
    `}

  option {
    color: ${props => props.theme.colors.black};
    font-size: 1rem;
    text-transform: none;
  }

  &:focus {
    outline: none;
    border: solid 1px ${props => props.theme.colors.blue};

    ${props =>
      props.transparent &&
      css`
        border-color: #000;
      `}
  }

  ${props =>
    props.transparent &&
    css`
      background-color: transparent;
      border-color: ${props => props.theme.colors.white};
      color: ${props => props.theme.colors.white};
    `}
`;

const Select = ({ style, className, transparent, ...rest }) => {
  return (
    <SelectWrapper style={style} className={className} transparent={transparent}>
      <SelectMenu {...rest} transparent={transparent}>
        {rest.children}
      </SelectMenu>
    </SelectWrapper>
  );
};

export default Select;
