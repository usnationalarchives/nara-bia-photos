// libraries
import React, { useState, lazy, Suspense } from "react";

// components
import * as Layout from "#components/shared/Layout";
import QueryField from "./QueryField";
import Filters from "./Filters";

// hooks
import useCheckboxes from "#hooks/useCheckboxes";

// Lazy Loads
const Results = lazy(() => import("./Results"));

const Search = () => {
  const [query, setQuery] = useState();
  const [tribes, dispatchTribes] = useCheckboxes();
  const [topics, dispatchTopics] = useCheckboxes();
  const [states, dispatchStates] = useCheckboxes();

  return (
    <Layout.Padding style={{ marginTop: "1rem", marginBottom: "2rem" }}>
      <Layout.Wrapper>
        <QueryField setQuery={setQuery} />

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
