import React, { Fragment, useState, useRef } from 'react';
import styled from 'styled-components';

import Filter from '#components/shared/Filter';
import { H3 } from '#components/shared/Text';
import SelectedFilter from '#components/shared/SelectedFilter';
import useEventListener from '@use-it/event-listener';

const FiltersLayout = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  margin: 15px -20px;

  @media all and ${props => props.theme.breakpoints.medium} {
    margin: 30px -20px;
    flex-direction: row;
  }

  > * {
    flex: 1 0 100%;
    padding: 0 20px;

    @media all and ${props => props.theme.breakpoints.medium} {
      flex: 0 0 ${(1 / 3) * 100}%;
    }
    @media all and ${props => props.theme.breakpoints.full} {
      flex: 0 0 25%;
    }
  }
`;

const SelectedFiltersList = styled.ul`
  li {
    display: inline-block;
    margin-right: 0.75rem;
    margin-bottom: 0.5rem;
  }
`;

const Filters = ({ filters }) => {
  const [activeFilter, setActiveFilter] = useState(false);
  const filterRef = useRef(null);

  useEventListener('click', event => {
    if (filterRef.current && !filterRef.current.contains(event.target) && !!activeFilter) {
      setActiveFilter(false);
    }
  });

  useEventListener('keydown', event => {
    // Close with escape key
    if (event.which === 27) {
      setActiveFilter(false);
    }
  });

  return (
    <div role="region" aria-label="Filters">
      <H3 style={{ marginTop: '60px' }}>Filter Results</H3>
      <FiltersLayout ref={filterRef}>
        {filters.map((filter, i) => (
          <Filter
            key={`filter-${i}`}
            id={`filter-${i}`}
            filter={filter}
            isActive={activeFilter === `filter-${i}`}
            toggle={setActiveFilter}
          />
        ))}
      </FiltersLayout>

      <SelectedFiltersList>
        {filters.map((filter, i) => (
          <Fragment key={`selectedFilter-${i}`}>
            {filter.active.map((active, i) => (
              <li>
                <SelectedFilter scheme="blue" key={i} dispatchItems={filter.dispatch} value={active} />
              </li>
            ))}
          </Fragment>
        ))}
      </SelectedFiltersList>
    </div>
  );
};

export default Filters;
