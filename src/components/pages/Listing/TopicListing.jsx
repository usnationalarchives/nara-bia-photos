import React, { Fragment, useState, useEffect } from 'react';
import qs from 'qs';
import { Helmet } from 'react-helmet';

// config
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

import { topics } from '#modules/constants';

const TopicListing = ({ ...props }) => {
  const [fidelity, setFidelity] = useState(220);
  const slug = props.match.params.slug;
  const topicName = topics.filter(topic => topic.slug === slug)[0].name;

  // fetch starting search parameters remove the leading ?
  const search = qs.parse(props.location.search.replace('?', ''));

  // Set up checkboxes state, seed with any starting search filters
  const [tribes, dispatchTribes] = useCheckboxes(search.tribalNations || []);
  const [states, dispatchStates] = useCheckboxes(search.states || []);

  const stateFilters = useScopedFilters(topicName, 'topic', 'states');
  const tribeFilters = useScopedFilters(topicName, 'topic', 'tribes');

  const [results] = useRecords({
    facets: {
      topics: [topicName],
      tribes: tribes,
      states: states,
    },
  });

  useSearchHistory({
    filters: [
      { label: 'tribalNations', values: tribes },
      { label: 'states', values: states },
    ],
  });

  const { page, setPage, prevHandler, nextHandler, total, prevPage, nextPage, totalPages, data } = usePagination({
    items: results,
    perPage: fidelity < 180 ? 60 : 30,
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
      label: 'States',
      active: states,
      dispatch: dispatchStates,
      all: stateFilters,
    },
  ];

  const description =
    slug !== 'portraits' ? content.topic.intro.replace('${TOPIC}', topicName) : content.topic.portraitIntro;

  return (
    <Fragment>
      <Helmet>
        <title>{`Photograph Topic ${topicName} - Bureau Of Indian Affairs Photography Finding Aid`}</title>
        <meta name="description" content={description}></meta>
        <meta name="" content="" />
        <meta
          name="twitter:title"
          content={`${content.states.title} - Bureau Of Indian Affairs Photography Finding Aid`}
        />
        <meta name="twitter:site" content="@FIXME" />
        <meta name="twitter:card" content={'FIXME'} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={'FIXME'} />
        <meta property="og:title" content={`${topicName} - Bureau Of Indian Affairs Photography Finding Aid`} />
        <meta name="og:description" content={description} />
        <meta property="og:site_name" content="FIXME" />
        <meta property="og:url" content={window.location} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={'FIXME'} />
      </Helmet>

      <ListingBillboard label="Topic" intro={description} title={topicName} items={topics} slugPrefix="topics" />
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

export default TopicListing;
