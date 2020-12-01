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
  const [page, setPage] = useState(!!search.page ? parseInt(search.page) : 1);
  const [firstRender, setFirstRender] = useState(true);

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
    page,
  });

  const { prevHandler, nextHandler, total, prevPage, nextPage, totalPages, data } = usePagination({
    items: results,
    perPage: fidelity < 180 ? 60 : 30,
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
        <title>{`Photograph records on ${topicName} - Bureau Of Indian Affairs Photographs Finding Aid`}</title>
        <meta name="description" content={description}></meta>
        <meta name="" content="" />
        <meta
          name="twitter:title"
          content={`Photograph records on ${topicName} - Bureau Of Indian Affairs Photographs Finding Aid`}
        />
        <meta name="twitter:site" content={window.location} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={`${process.env.PUBLIC_URL}/og-image.png`} />
        <meta
          property="og:title"
          content={`Photograph records on ${topicName} - Bureau Of Indian Affairs Photographs Finding Aid`}
        />
        <meta name="og:description" content={description} />
        <meta property="og:site_name" content="Bureau of Indian Affairs Photography Finding Aid" />
        <meta property="og:url" content={window.location} />
        <meta property="og:type" content="website" />
        <meta name="og:image" content={`${process.env.PUBLIC_URL}/og-image.png`} />
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
