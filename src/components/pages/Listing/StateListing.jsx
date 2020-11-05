import React, { Fragment, useState, useEffect } from 'react';
import qs from 'qs';
import { Helmet } from 'react-helmet';
import { includes } from 'lodash';
import { Redirect } from 'react-router-dom';

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
  const fetchedResults = useState(false);
  const slug = props.match.params.slug;
  const stateName = states.filter(state => state.slug === slug)[0].name;

  // fetch starting search parameters remove the leading ?
  const search = qs.parse(props.location.search.replace('?', ''));
  const [page, setPage] = useState(!!search.page ? parseInt(search.page) : 1);
  const [firstRender, setFirstRender] = useState(true);

  // Set up checkboxes state, seed with any starting search filters
  const [tribes, dispatchTribes] = useCheckboxes(search.tribalNations || []);
  const [topics, dispatchTopics] = useCheckboxes(search.topics || []);

  const topicFilters = useScopedFilters(stateName, 'state', 'topics');
  const tribeFilters = useScopedFilters(stateName, 'state', 'tribes');

  const [stateResults, dimensions] = useRecords({});

  const statesWithResults = dimensions.recordsByState
    .group()
    .all()
    .map(s => s.key);

  const [results, , , , , finishedResults] = useRecords({
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
    page,
  });

  const { prevHandler, nextHandler, total, prevPage, nextPage, totalPages, data } = usePagination({
    items: results,
    perPage: 30,
    page,
    setPage,
  });

  // Scroll to the top of the document when the page changes
  useEffect(() => {
    document.querySelector('html').scrollTop = 0;
  }, [page]);

  // reset the page to 1 when the query and filters change
  useEffect(() => {
    if (!firstRender) {
      setPage(1);
    }
  }, [topics, tribes]);

  useEffect(() => {
    setFirstRender(false);
  }, []);

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
      <Helmet>
        <title>{`Photograph records from ${stateName} - Bureau Of Indian Affairs Photographs Finding Aid`}</title>
        <meta name="description" content={content.state.intro.replace('${STATE}', stateName)}></meta>
        <meta name="" content="" />
        <meta
          name="twitter:title"
          content={`Photograph records from ${stateName} - Bureau Of Indian Affairs Photographs Finding Aid`}
        />
        <meta name="twitter:site" content="@FIXME" />
        <meta name="twitter:card" content={'FIXME'} />
        <meta name="twitter:description" content={content.state.intro.replace('${STATE}', stateName)} />
        <meta name="twitter:image" content={'FIXME'} />
        <meta
          property="og:title"
          content={`Photograph records from ${stateName} - Bureau Of Indian Affairs Photographs Finding Aid`}
        />
        <meta name="og:description" content={content.state.intro.replace('${STATE}', stateName)} />
        <meta property="og:site_name" content="FIXME" />
        <meta property="og:url" content={window.location} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={'FIXME'} />
      </Helmet>
      <ListingBillboard
        label="State"
        title={stateName}
        intro={content.state.intro.replace('${STATE}', stateName)}
        items={states.filter(state => includes(statesWithResults, state.name))}
        slugPrefix="states"
      />
      <Layout.Padding>
        <Layout.Wrapper>
          <Filters filters={filters} />
          {results.length < 1 && !!finishedResults && tribes.length < 1 && topics.length < 1 && (
            <Redirect to="/states" />
          )}

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
