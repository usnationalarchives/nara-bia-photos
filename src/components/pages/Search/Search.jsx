// libraries
import React, { useState, useEffect, lazy, Suspense } from "react";
import qs from "qs";

// components
import * as Layout from "#components/shared/Layout";
import Filters from "#components/shared/Filters";
import Pagination from "#components/shared/Pagination";
import QueryField from "./QueryField";

// hooks
import useRecords from "#hooks/useRecords";
import useCheckboxes from "#hooks/useCheckboxes";
import usePagination from "#hooks/usePagination";
import useSearchHistory from "#hooks/useSearchHistory";

// modules
import fullTextSearch from "#modules/fullTextSearch";
import {
  states as statesConstant,
  topics as topicsConstant,
  tribalNations,
} from "#modules/constants";

// Lazy Loads
const Results = lazy(() => import("./Results"));

const Search = ({ ...props }) => {
  // fetch starting search parameters remove the leading ?
  const search = qs.parse(props.location.search.replace("?", ""));

  // set up query state, seed with any starting search query
  const [query, setQuery] = useState(search.q || "");

  // Set up checkboxes state, seed with any starting search filters
  const [tribes, dispatchTribes] = useCheckboxes(search.tribalNations || []);
  const [topics, dispatchTopics] = useCheckboxes(search.topics || []);
  const [states, dispatchStates] = useCheckboxes(search.states || []);

  // state for search UUIDs
  const [searchUUIDs, setSearchUUIDs] = useState();

  // Set the search UUIDs when the query changes
  useEffect(() => {
    setSearchUUIDs(fullTextSearch(query));
  }, [query]);

  const [results, dimensions, hasActiveFilters] = useRecords({
    facets: { searchUUIDs, tribes, topics, states },
  });

  useSearchHistory({
    query: query,
    filters: [
      { label: "tribalNations", values: tribes },
      { label: "topics", values: topics },
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

  // reset the page to 1 when the query changes
  useEffect(() => {
    setPage(1);
  }, [setPage, query, tribes, topics, states]);

  const filters = [
    {
      label: "Tribal Nations",
      active: tribes,
      dispatch: dispatchTribes,
      dimension: dimensions.recordsByTribe,
      permitted: tribalNations.map((i) => i.name),
      totals: true,
    },
    {
      label: "States",
      active: states,
      dispatch: dispatchStates,
      dimension: dimensions.recordsByState,
      permitted: statesConstant.map((i) => i.name),
      totals: true,
    },
    {
      label: "Topics",
      active: topics,
      dispatch: dispatchTopics,
      dimension: dimensions.recordsByTag,
      permitted: topicsConstant.map((i) => i.name),
      totals: true,
    },
  ];

  return (
    <Layout.Padding style={{ marginTop: "1rem", marginBottom: "2rem" }}>
      <Layout.Wrapper>
        <QueryField defaultValue={query} setQuery={setQuery} />

        <Filters filters={filters} />

        {query && !hasActiveFilters && <p>No Results</p>}

        {hasActiveFilters && (
          <Suspense fallback={<p>Loading...</p>}>
            <Results results={results} data={data} />

            <Pagination
              style={{ marginBottom: "20px" }}
              page={page}
              setPage={page}
              prevHandler={prevHandler}
              nextHandler={nextHandler}
              prevPage={prevPage}
              nextPage={nextPage}
              totalPages={totalPages}
            />
          </Suspense>
        )}
      </Layout.Wrapper>
    </Layout.Padding>
  );
};

export default Search;
