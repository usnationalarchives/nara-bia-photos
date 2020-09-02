import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { buttonReset } from '#styles/mixins';

import { ReactComponent as CloseIcon } from '#assets/icons/close.svg';
import { ReactComponent as PlusIcon } from '#assets/icons/plus.svg';

export const toggleStyles = css`
  ${buttonReset}
  align-items: center;
  border-radius: 23px;
  border: 1px solid ${props => props.theme.colors.black};
  display: inline-flex;
  font-size: 0.75rem;
  font-weight: bold;
  line-height: 1rem;
  padding: 4px 4px 4px 17px;
  text-decoration: none;
  text-transform: uppercase;

  // > * {
  //   position: relative;
  //   line-height: 1;
  //   vertical-align: middle;
  // }

  &:focus {
    outline: none;
  }
`;

const Text = styled.span`
  color: #000;
`;

const Icon = styled.span`
  align-items: center;
  background-color: #000;
  border-radius: 36px;
  color: #fff;
  display: flex;
  height: 36px;
  justify-content: center;
  text-align: center;
  margin-left: 12px;
  width: 36px;
`;

/**
 * Toggle Component
 */
const ToggleBase = ({ className, onClick, disabled, style, children }) => {
  const [active, setActive] = useState(false);

  function handleClick() {
    setActive(!active);
    onClick();
  }

  return (
    <button className={className} onClick={handleClick} disabled={disabled} style={style}>
      <Text>{!active ? 'Show full title' : 'Collapse'}</Text>
      <Icon>
        <span>
          {active && <CloseIcon width="11" fill="currentColor" />}
          {!active && <PlusIcon width="13" fill="currentColor" />}
        </span>
      </Icon>
    </button>
  );
};

ToggleBase.propTypes = {
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  style: PropTypes.object,
  children: PropTypes.node,
};

const Toggle = styled(ToggleBase)`
  ${toggleStyles}
`;

export default Toggle;
