import React, { Fragment, useState, useRef, useEffect } from 'react';

import { Label } from '#components/shared/Text';
import styled, { css } from 'styled-components';
import { ReactComponent as CaretIcon } from '#assets/icons/caret.svg';
import { colors } from '#styles/theme';

const CheckboxList = styled.div`
  border: solid 1px ${(props) => props.theme.colors.mediumGrey};
  border-radius: 5px;
  background-color: #eeefee;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
  padding: 10px 18px;
  position: absolute;
  max-height: 90vh;
  overflow-y: scroll;
  width: 280px;
  top: 50%;
  z-index: ${(props) => props.theme.zIndex.skipLinks};

  @media all and ${(props) => props.theme.breakpoints.medium} {
    max-height: 400px;
  }

  &[aria-hidden='true'] {
    display: none;
  }

  li {
    margin: 8px 0;
  }
`;

const DropDownCaret = styled(CaretIcon)`
  display: block;
  margin: 0 auto;
  transform: rotate(180deg);
`;

const Fieldset = styled.fieldset`
  position: relative;
  margin-bottom: 1.25rem;

  @media all and ${(props) => props.theme.breakpoints.medium} {
    margin-bottom: 1.25rem;
  }
`;

const SelectToggle = styled.button`
  background-color: #fff;
  border: solid 1px ${(props) => props.theme.colors.mediumGrey};
  border-radius: 23px;
  display: flex;
  font-size: 0.75rem;
  padding: 14px 22px;
  text-decoration: none;
  text-align: left;
  text-transform: uppercase;
  width: 100%;

  &:focus {
    outline: none;
    border: solid 1px ${(props) => props.theme.colors.darkGrey};
  }

  .grow {
    flex: 1 auto;

    &:first-child {
      margin-right: 10px;
    }
  }

  .shrink {
    flex: 0 0 auto;
  }
`;

const Filter = ({ filter, isActive, toggle, id }) => {
  const { label, active, dispatch, dimension, all, permitted } = filter;
  const checkboxListRef = useRef(null);

  const toggleFilter = (id) => {
    if (!!isActive) {
      toggle(false);
    } else {
      checkboxListRef.current.scrollTop = 0;
      toggle(id);
    }
  };

  // Scroll the checkbox dropdown back to to top when rendering
  useEffect(() => {
    if (isActive) {
      checkboxListRef.current.scrollTop = 0;
    }
  }, [isActive]);

  const allItems =
    all ||
    dimension
      .group()
      .all()
      .filter((i) => i.key && permitted.includes(i.key));

  return (
    <div>
      <Fieldset>
        <legend style={{ marginBottom: '1.25rem' }}>
          <Label>{label}</Label>
        </legend>

        <div style={{ position: 'relative' }}>
          <SelectToggle
            aria-label={`Select ${label}`}
            aria-pressed={isActive}
            onClick={() => toggleFilter(id)}
          >
            <span className="grow">Select {label}</span>
            <span className="shrink">
              <CaretIcon width="10" fill={colors.blue}></CaretIcon>
            </span>
          </SelectToggle>
          <CheckboxList
            ref={checkboxListRef}
            aria-hidden={!isActive}
            aria-labelledby="sections-heading"
          >
            <DropDownCaret width="10" fill="#999"></DropDownCaret>
            <ul>
              {allItems.map((item, i) => (
                <li key={i}>
                  <input
                    checked={active.includes(item.key)}
                    value={item.key}
                    type="checkbox"
                    name={`${label}[${i}]`}
                    id={`${label}[${i}]`}
                    onChange={(e) => {
                      const value = e.target.value;
                      const checked = e.target.checked;

                      dispatch({
                        type: checked ? 'add' : 'remove',
                        value: value,
                      });
                    }}
                  />{' '}
                  <label htmlFor={`${label}[${i}]`}>
                    {item.key}
                    {filter.totals && <Fragment>({item.value})</Fragment>}
                  </label>
                </li>
              ))}
            </ul>
          </CheckboxList>
        </div>
      </Fieldset>
    </div>
  );
};

export default Filter;
