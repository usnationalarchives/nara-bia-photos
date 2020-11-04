import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

// styles
import { buttonReset } from '#styles/mixins';

const Root = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
`;

const CurrentPage = styled.div`
  align-items: center;
  display: flex;
  font-size: 0.8rem;
  margin-left: 10px;
  margin-right: 10px;

  @media all and ${props => props.theme.breakpoints.medium} {
    font-size: 1rem;
    margin-left: 40px;
    margin-right: 40px;
  }
`;

const Button = styled.button`
  ${buttonReset}

  color: ${props => props.theme.colors.blue};
  font-size: 0.8rem;
  font-weight: bold;
  text-transform: uppercase;
  white-space: nowrap;

  [data-whatinput='mouse'] & {
    outline: none;
  }

  @media all and ${props => props.theme.breakpoints.medium} {
    font-size: 1rem;
  }

  ${props =>
    props.next &&
    css`
      &:after {
        border: 6px solid ${props => props.theme.colors.blue};
        border-bottom-color: transparent;
        border-right-color: transparent;
        border-top-color: transparent;

        border-radius: 2px;
        content: '';
        display: inline-block;
        height: 12px;
        overflow: hidden;
        margin-left: 12px;
      }
    `}

  ${props =>
    props.prev &&
    css`
      &:before {
        border: 6px solid ${props => props.theme.colors.blue};
        border-bottom-color: transparent;
        border-left-color: transparent;
        border-top-color: transparent;

        border-radius: 2px;
        content: '';
        display: inline-block;
        height: 12px;
        overflow: hidden;
        margin-right: 12px;
      }
    `}
`;

const SelectWrapper = styled.div`
  position: relative;
  margin-right: 6px;
  background-color: #fff;

  &:after {
    /* don't reorder these border properties */
    border: 6px solid ${props => props.theme.colors.blue};
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

const Select = styled.select`
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

  &:focus {
    outline: none;
    border: solid 1px ${props => props.theme.colors.darkGrey};
  }
`;

const Pagination = ({ page, setPage, prevHandler, nextHandler, prevPage, nextPage, totalPages, ...props }) => {
  const handleChange = event => {
    const pageNumber = parseInt(event.target.value);
    setPage(pageNumber);
  };

  let pageOptions = [];

  for (let i = 1; i <= totalPages; i++) {
    pageOptions.push(
      <option key={`option-${i}`} defaultChecked={page === i} value={i} aria-label={`Page ${i}`}>
        {i}
      </option>
    );
  }

  return (
    <Root {...props} aria-label="pagination" role="region">
      {prevPage && (
        <Button prev onClick={prevHandler}>
          Previous<span className="screenreader"> Page</span>
        </Button>
      )}
      <p aria-live="polite" className="screenreader">
        Page {page} of {totalPages}
      </p>
      <CurrentPage>
        <SelectWrapper>
          <label className="screenreader" htmlFor="pagination">
            Results Page
          </label>
          <Select id="pagination" name="pagination" value={page} onChange={handleChange}>
            {pageOptions}
          </Select>
        </SelectWrapper>
        <span aria-hidden="true">of {totalPages}</span>
      </CurrentPage>
      {nextPage && (
        <Button next onClick={nextHandler}>
          Next
        </Button>
      )}
    </Root>
  );
};

Pagination.propTypes = {
  page: PropTypes.number.isRequired,
  prevHandler: PropTypes.func.isRequired,
  nextHandler: PropTypes.func.isRequired,
  prevPage: PropTypes.number,
  nextPage: PropTypes.number,
  perPage: PropTypes.number,
  total: PropTypes.number,
  totalPages: PropTypes.number,
};

export default Pagination;
