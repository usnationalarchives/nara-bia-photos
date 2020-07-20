// libraries
import React, { useState, lazy, Suspense } from "react";
import qs from "qs";

// components
import * as Layout from "#components/shared/Layout";
import QueryField from "./QueryField";
import Filters from "./Filters";

// hooks
import useCheckboxes from "#hooks/useCheckboxes";
import useSearchHistory from "#hooks/useSearchHistory";

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

  useSearchHistory({
    query: query,
    filters: [
      { label: "tribalNations", values: tribes },
      { label: "topics", values: topics },
      { label: "states", values: states },
    ],
  });

  return (
    <Layout.Padding style={{ marginTop: "1rem", marginBottom: "2rem" }}>
      <Layout.Wrapper>
        <QueryField defaultValue={query} setQuery={setQuery} />

        <Filters
          tribes={tribes}
          dispatchTribes={dispatchTribes}
          topics={topics}
          dispatchTopics={dispatchTopics}
          states={states}
          dispatchStates={dispatchStates}
        />

        {(query ||
          tribes.length > 0 ||
          topics.length > 0 ||
          states.length > 0) && (
          <Suspense fallback={<p>Loading...</p>}>
            <Results facets={{ tribes, topics, states }} query={query} />
          </Suspense>
        )}
      </Layout.Wrapper>
    </Layout.Padding>
  );
};

export default Search;
