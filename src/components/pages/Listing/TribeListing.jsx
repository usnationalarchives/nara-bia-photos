import React, { Fragment, useEffect } from "react";
import qs from "qs";

// components
import * as Layout from "#components/shared/Layout";
import Pagination from "#components/shared/Pagination";
import Filters from "#components/shared/Filters";
import Results from "#components/shared/Results";
import ListingBillboard from "#components/shared/ListingBillboard";

// hooks
import useRecords from "#hooks/useRecords";
import usePagination from "#hooks/usePagination";
import useCheckboxes from "#hooks/useCheckboxes";
import useSearchHistory from "#hooks/useSearchHistory";
import useScopedFilters from "#hooks/useScopedFilters";

// data
import { tribalNations } from "#modules/constants";

const TribeListing = ({ ...props }) => {
  const slug = props.match.params.slug;
  const tribalNationName = tribalNations.filter(
    (tribalNation) => tribalNation.slug === slug
  )[0].name;

  // fetch starting search parameters remove the leading ?
  const search = qs.parse(props.location.search.replace("?", ""));

  // Set up checkboxes state, seed with any starting search filters
  const [states, dispatchStates] = useCheckboxes(search.states || []);
  const [topics, dispatchTopics] = useCheckboxes(search.topics || []);

  const stateFilters = useScopedFilters(tribalNationName, "tribe", "states");
  const topicFilters = useScopedFilters(tribalNationName, "tribe", "topics");

  const [results] = useRecords({
    facets: {
      tribes: [tribalNationName],
      topics: topics,
      states: states,
    },
  });

  useSearchHistory({
    filters: [
      { label: "states", values: states },
      { label: "topics", values: topics },
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

  const filters = [
    {
      label: "States",
      active: states,
      dispatch: dispatchStates,
      all: stateFilters,
    },
    {
      label: "Topics",
      active: topics,
      dispatch: dispatchTopics,
      all: topicFilters,
    },
  ];

  // Scroll to the top of the document when the page changes
  useEffect(() => {
    if (page !== 1) {
      document.querySelector("html").scrollTop = 0;
    }
  }, [page]);

  return (
    <Fragment>
      <ListingBillboard
        label="Tribal Nation"
        title={tribalNationName}
        intro="Lorem Ipsum"
        items={tribalNations}
        slugPrefix="tribal-nations"
      />
      <Layout.Padding>
        <Layout.Wrapper>
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
    </Fragment>
  );
};

export default TribeListing;
