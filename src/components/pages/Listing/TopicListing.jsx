import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import qs from "qs";

// components
import * as Layout from "#components/shared/Layout";
import * as Text from "#components/shared/Text";
import Pagination from "#components/shared/Pagination";
import Filters from "./Filters";

// hooks
import useRecords from "#hooks/useRecords";
import usePagination from "#hooks/usePagination";
import useCheckboxes from "#hooks/useCheckboxes";
import useSearchHistory from "#hooks/useSearchHistory";

// modules
import {
  topics,
  states as statesConstant,
  tribalNations,
} from "#modules/constants";

const TopicListing = ({ ...props }) => {
  const slug = props.match.params.slug;
  const topicName = topics.filter((topic) => topic.slug === slug)[0].name;

  // fetch starting search parameters remove the leading ?
  const search = qs.parse(props.location.search.replace("?", ""));

  // Set up checkboxes state, seed with any starting search filters
  const [tribes, dispatchTribes] = useCheckboxes(search.tribalNations || []);
  const [states, dispatchStates] = useCheckboxes(search.states || []);

  const { results, dimensions } = useRecords({
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
      dimension: dimensions.recordsByTribe,
      permitted: tribalNations.map((i) => i.name),
    },
    {
      label: "States",
      active: states,
      dispatch: dispatchStates,
      dimension: dimensions.recordsByState,
      permitted: statesConstant.map((i) => i.name),
    },
  ];

  return (
    <Layout.Padding>
      <Layout.Wrapper>
        <Text.H1>{topicName}</Text.H1>

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

export default TopicListing;
