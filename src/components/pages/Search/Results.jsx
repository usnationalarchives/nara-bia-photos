import React, { Fragment, useState, useEffect } from "react";

// components
import Pagination from "../../shared/Pagination";
import Record from "./Record";

// hooks
import useRecords from "#hooks/useRecords";
import usePagination from "#hooks/usePagination";

// modules
import fullTextSearch from "#modules/fullTextSearch";

const Results = ({ facets, query }) => {
  const [searchUUIDs, setSearchUUIDs] = useState();
  const { results } = useRecords({ facets: { searchUUIDs, ...facets } });

  useEffect(() => {
    const UUIDs = fullTextSearch(query);
    setSearchUUIDs(UUIDs);
  }, [query]);

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
  }, [setPage, facets]);

  return (
    <Fragment>
      <p style={{ marginBottom: "20px" }}>
        {results.length} result{results.length !== 1 && "s"}
      </p>

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
    </Fragment>
  );
};

export default Results;
