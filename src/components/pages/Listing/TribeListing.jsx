import React, { Fragment, useState, useEffect } from 'react';
import qs from 'qs';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

// config
import content from '#config/content';

// components
import * as Layout from '#components/shared/Layout';
import Pagination from '#components/shared/Pagination';
import Filters from '#components/shared/Filters';
import Results from '#components/shared/Results';
import TribeBillboard from '#components/shared/TribeBillboard';
import ResultsMeta from '#components/shared/ResultsMeta';
import ResultsWrapper from '#components/shared/ResultsWrapper';
import ResultsHeaderWrapper from '#components/shared/ResultsHeaderWrapper';
import FidelitySlider from '#components/shared/FidelitySlider';
import TribalNationMap from '#components/shared/TribalNationMap';

// hooks
import useRecords from '#hooks/useRecords';
import usePagination from '#hooks/usePagination';
import useCheckboxes from '#hooks/useCheckboxes';
import useSearchHistory from '#hooks/useSearchHistory';
import useScopedFilters from '#hooks/useScopedFilters';

// data
import { tribalNations, states as stateConsts } from '#modules/constants';

const TribeListing = ({ ...props }) => {
  const [fidelity, setFidelity] = useState(220);
  const slug = props.match.params.slug;
  const tribalNationName = tribalNations.filter(tribalNation => tribalNation.slug === slug)[0].name;

  // fetch starting search parameters remove the leading ?
  const search = qs.parse(props.location.search.replace('?', ''));

  // Set up checkboxes state, seed with any starting search filters
  const [states, dispatchStates] = useCheckboxes(search.states || []);
  const [topics, dispatchTopics] = useCheckboxes(search.topics || []);

  const stateFilters = useScopedFilters(tribalNationName, 'tribe', 'states');
  const topicFilters = useScopedFilters(tribalNationName, 'tribe', 'topics');

  const [results] = useRecords({
    facets: {
      tribes: [tribalNationName],
      topics: topics,
      states: states,
    },
  });

  useSearchHistory({
    filters: [
      { label: 'states', values: states },
      { label: 'topics', values: topics },
    ],
  });

  const { page, setPage, prevHandler, nextHandler, total, prevPage, nextPage, totalPages, data } = usePagination({
    items: results,
    perPage: 30,
  });

  const filters = [
    {
      label: 'States',
      active: states,
      dispatch: dispatchStates,
      all: stateFilters,
    },
    {
      label: 'Topics',
      active: topics,
      dispatch: dispatchTopics,
      all: topicFilters,
    },
  ];

  // Scroll to the top of the document when the page changes
  useEffect(() => {
    document.querySelector('html').scrollTop = 0;
  }, [page]);

  const highlightedState = !!stateFilters.length ? stateConsts.find(s => s.name === stateFilters[0].key) : [];
  const description = content.tribalNation.intro.replace('${TRIBE}', tribalNationName);

  return (
    <Fragment>
      <Helmet>
        <title>{tribalNationName}</title>
        <meta name="description" content={description}></meta>
        <meta name="" content="" />
        <meta name="twitter:title" content={tribalNationName} />
        <meta name="twitter:site" content="@FIXME" />
        <meta name="twitter:card" content={'FIXME'} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={'FIXME'} />
        <meta property="og:title" content={tribalNationName} />
        <meta name="og:description" content={description} />
        <meta property="og:site_name" content="FIXME" />
        <meta property="og:url" content={window.location} />
        <meta property="og:type" content="article" />
        <meta property="og:image" content={'FIXME'} />
      </Helmet>
      <TribeBillboard
        label="Tribal Nation"
        title={tribalNationName}
        intro={description}
        items={tribalNations}
        slugPrefix="tribal-nations"
        superTitle="Tribal Nation"
        alignment="left"
      >
        {!!stateFilters.length && (
          <>
            <TribalNationMap activeStates={stateFilters.map(s => s.key)} />

            <p style={{ color: '#fff' }}>
              There are {stateFilters.length ? stateFilters[0].value : 0} photographs associated with this Tribal Nation
              {stateFilters.length > 0 && (
                <>
                  {' '}
                  across <Link to={`/states/${highlightedState.slug}`}>{highlightedState.name}</Link>
                </>
              )}
            </p>
          </>
        )}
      </TribeBillboard>
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

export default TribeListing;
