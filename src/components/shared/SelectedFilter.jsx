import React from 'react';
import Button from '#components/shared/Button';
import styled from 'styled-components';
import { ReactComponent as SearchIcon } from '#assets/icons/close.svg';

const StyledSelectedFilters = styled(Button)`
  text-align: left;
`;

const SelectedFilter = ({ dispatchItems, value }) => {
  return (
    <StyledSelectedFilters scheme="blue" onClick={() => dispatchItems({ type: 'remove', value: value })}>
      {value} <SearchIcon width="11" fill="currentColor" />
    </StyledSelectedFilters>
  );
};

export default SelectedFilter;
