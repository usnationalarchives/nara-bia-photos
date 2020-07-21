import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import qs from "qs";

// components
import * as Layout from "#components/shared/Layout";
import * as Text from "#components/shared/Text";
import Pagination from "#components/shared/Pagination";
import Filters from "#components/shared/Filters";

// hooks
import useRecords from "#hooks/useRecords";
import usePagination from "#hooks/usePagination";
import useCheckboxes from "#hooks/useCheckboxes";
import useSearchHistory from "#hooks/useSearchHistory";

// data
import {
  states as statesConstant,
  topics as topicsConstant,
  tribalNations,
} from "#modules/constants";

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

  const [results, dimensions] = useRecords({
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
      dimension: dimensions.recordsByState,
      permitted: statesConstant.map((i) => i.name),
    },
    {
      label: "Topics",
      active: topics,
      dispatch: dispatchTopics,
      dimension: dimensions.recordsByTag,
      permitted: topicsConstant.map((i) => i.name),
    },
  ];

  // Scroll to the top of the document when the page changes
  useEffect(() => {
    if (page !== 1) {
      document.querySelector("html").scrollTop = 0;
    }
  }, [page]);

  return (
    <Layout.Padding>
      <Layout.Wrapper>
        <Text.H1>{tribalNationName}</Text.H1>

        <Filters filters={filters} />

        {data.map((result) => (
          <Link key={result.slug} to={`/${result.slug}`}>
            <img src={result.thumbnailUrl} alt="" aria-hidden="true" />
            <p>{result.title}</p>
          </Link>
        ))}

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

export default TribeListing;
