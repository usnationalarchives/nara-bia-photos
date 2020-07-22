import React, { useEffect } from "react";
import qs from "qs";

// components
import * as Layout from "#components/shared/Layout";
import * as Text from "#components/shared/Text";
import Pagination from "#components/shared/Pagination";
import Filters from "#components/shared/Filters";
import Results from "#components/shared/Results";

// hooks
import useRecords from "#hooks/useRecords";
import usePagination from "#hooks/usePagination";
import useCheckboxes from "#hooks/useCheckboxes";
import useSearchHistory from "#hooks/useSearchHistory";
import useScopedFilters from "#hooks/useScopedFilters";

import { topics } from "#modules/constants";

const TopicListing = ({ ...props }) => {
  const slug = props.match.params.slug;
  const topicName = topics.filter((topic) => topic.slug === slug)[0].name;

  // fetch starting search parameters remove the leading ?
  const search = qs.parse(props.location.search.replace("?", ""));

  // Set up checkboxes state, seed with any starting search filters
  const [tribes, dispatchTribes] = useCheckboxes(search.tribalNations || []);
  const [states, dispatchStates] = useCheckboxes(search.states || []);

  const stateFilters = useScopedFilters(topicName, "topic", "states");
  const tribeFilters = useScopedFilters(topicName, "topic", "tribes");

  const [results] = useRecords({
    facets: {
      topics: [topicName],
      tribes: tribes,
      states: states,
    },
  });

  useSearchHistory({
    filters: [
      { label: "tribalNations", values: tribes },
      { label: "states", values: states },
    ],
  });

  const {
    page,
    setPage,
    prevHandler,
    nextHandler,
    prevPage,
    nextPage,
    totalPages,
    data,
  } = usePagination({
    items: results,
    perPage: 30,
  });

  // Scroll to the top of the document when the page changes
  useEffect(() => {
    if (page !== 1) {
      document.querySelector("html").scrollTop = 0;
    }
  }, [page]);

  const filters = [
    {
      label: "Tribal Nations",
      active: tribes,
      dispatch: dispatchTribes,
      all: tribeFilters,
    },
    {
      label: "States",
      active: states,
      dispatch: dispatchStates,
      all: stateFilters,
    },
  ];

  return (
    <Layout.Padding>
      <Layout.Wrapper>
        <Text.H1>{topicName}</Text.H1>

        <Filters filters={filters} />

        <Results results={results} data={data} />

        <Pagination
          style={{ marginBottom: "20px" }}
          page={page}
          setPage={setPage}
          prevHandler={prevHandler}
          nextHandler={nextHandler}
          prevPage={prevPage}
          nextPage={nextPage}
          totalPages={totalPages}
        />
      </Layout.Wrapper>
    </Layout.Padding>
  );
};

export default TopicListing;
