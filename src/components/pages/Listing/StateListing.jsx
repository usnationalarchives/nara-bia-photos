import React, { Fragment, useState, useEffect } from 'react';
import qs from 'qs';

import content from '#config/content';

// components
import * as Layout from '#components/shared/Layout';
import Pagination from '#components/shared/Pagination';
import Filters from '#components/shared/Filters';
import Results from '#components/shared/Results';
import ListingBillboard from '#components/shared/ListingBillboard';
import ResultsMeta from '#components/shared/ResultsMeta';
import ResultsWrapper from '#components/shared/ResultsWrapper';
import ResultsHeaderWrapper from '#components/shared/ResultsHeaderWrapper';
import FidelitySlider from '#components/shared/FidelitySlider';

// hooks
import useRecords from '#hooks/useRecords';
import usePagination from '#hooks/usePagination';
import useCheckboxes from '#hooks/useCheckboxes';
import useSearchHistory from '#hooks/useSearchHistory';
import useScopedFilters from '#hooks/useScopedFilters';

// modules
import { states } from '#modules/constants';

const StateListing = ({ ...props }) => {
  const [fidelity, setFidelity] = useState(220);
  const slug = props.match.params.slug;
  const stateName = states.filter(state => state.slug === slug)[0].name;

  // fetch starting search parameters remove the leading ?
  const search = qs.parse(props.location.search.replace('?', ''));

  // Set up checkboxes state, seed with any starting search filters
  const [tribes, dispatchTribes] = useCheckboxes(search.tribalNations || []);
  const [topics, dispatchTopics] = useCheckboxes(search.topics || []);

  const topicFilters = useScopedFilters(stateName, 'state', 'topics');
  const tribeFilters = useScopedFilters(stateName, 'state', 'tribes');

  const [results] = useRecords({
    facets: {
      states: [stateName],
      tribes: tribes,
      topics: topics,
    },
  });

  useSearchHistory({
    filters: [
      { label: 'tribalNations', values: tribes },
      { label: 'topics', values: topics },
    ],
  });

  const { page, setPage, prevHandler, nextHandler, total, prevPage, nextPage, totalPages, data } = usePagination({
    items: results,
    perPage: 30,
  });

  // Scroll to the top of the document when the page changes
  useEffect(() => {
    document.querySelector('html').scrollTop = 0;
  }, [page]);

  const filters = [
    {
      label: 'Tribal Nations',
      active: tribes,
      dispatch: dispatchTribes,
      all: tribeFilters,
    },
    {
      label: 'Topics',
      active: topics,
      dispatch: dispatchTopics,
      all: topicFilters,
    },
  ];

  return (
    <Fragment>
      <ListingBillboard
        label="State"
        title={stateName}
        intro={content.state.intro.replace('${STATE}', stateName)}
        items={states}
        slugPrefix="states"
      />
      <Layout.Padding>
        <Layout.Wrapper>
          <Filters filters={filters} />

          <ResultsWrapper>
            <ResultsHeaderWrapper>
              <ResultsMeta count={data.length} page={page} total={total} />
              <FidelitySlider update={setFidelity}></FidelitySlider>
            </ResultsHeaderWrapper>

            <Results results={results} data={data} fidelity={fidelity} />

            <Pagination
              style={{ marginBottom: '80px' }}
              page={page}
              setPage={setPage}
              prevHandler={prevHandler}
              nextHandler={nextHandler}
              prevPage={prevPage}
              nextPage={nextPage}
              totalPages={totalPages}
            />
          </ResultsWrapper>
        </Layout.Wrapper>
      </Layout.Padding>
    </Fragment>
  );
};

export default StateListing;
