// libraries
import React, { useState, useEffect } from "react";

// modules
import fullTextSearch from "#modules/fullTextSearch";
import { groups } from "#modules/data";

// components
import * as Layout from "#components/shared/Layout";
import QueryField from "./QueryField";
import Record from "./Record";
import FilterCheckboxes from "./FilterCheckboxes";
import Pagination from "#components/shared/Pagination";

// hooks
import useCheckboxes from "#hooks/useCheckboxes";
import useRecords from "#hooks/useRecords";
import usePagination from "#hooks/usePagination";

const Search = () => {
  const [query, setQuery] = useState("");
  const [searchUUIDs, setSearchUUIDs] = useState();

  // pluck tribes from group keys, remove empty strings
  const tribeNames = groups.tribes.map((t) => t.key).filter((t) => Boolean(t));
  const [tribes, dispatchTribes] = useCheckboxes();
  const [topics, dispatchTopics] = useCheckboxes();

  // set the search UUIDs when the query changes
  useEffect(() => {
    const UUIDs = fullTextSearch(query);
    setSearchUUIDs(UUIDs);
  }, [query]);

  const { results, totalCount } = useRecords({
    facets: {
      tribes: tribes,
      topics: topics,
      searchUUIDs: searchUUIDs,
    },
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
    document.querySelector("html").scrollTop = 0;
  }, [page]);

  // reset the page to 1 when a filter changes
  useEffect(() => {
    setPage(1);
  }, [setPage, tribes, topics, query]);

  return (
    <Layout.Padding style={{ marginTop: "1rem", marginBottom: "2rem" }}>
      <Layout.Wrapper>
        <p style={{ marginBottom: "20px" }}>{totalCount} Total Records</p>

        <div style={{ marginBottom: "3rem" }}>
          <QueryField setQuery={setQuery} />
        </div>

        <div style={{ display: "flex" }}>
          <div style={{ width: "50%" }}>
            <FilterCheckboxes
              label="Topics"
              allItems={groups.topics}
              activeItems={topics}
              dispatchItems={dispatchTopics}
            />
          </div>

          <div style={{ width: "50%" }}>
            <FilterCheckboxes
              label="Tribes"
              allItems={tribeNames}
              activeItems={tribes}
              dispatchItems={dispatchTribes}
            />
          </div>
        </div>

        <h1 style={{ marginBottom: "20px" }}>
          {results.length} result{results.length !== 1 && "s"}
        </h1>

        {data.map((record) => (
          <Record key={record.naId} record={record} />
        ))}

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
      </Layout.Wrapper>
    </Layout.Padding>
  );
};

export default Search;
