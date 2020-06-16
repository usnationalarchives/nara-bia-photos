// libraries
import React, { useState, useEffect } from "react";

// components
import Search from "./Search";
import ListingFilters from "./ListingFilters";
import Pagination from "./Pagination";
import Record from "./Record";

import useRecords from "../hooks/useRecords";
import usePagination from "../hooks/usePagination";

const CrossfilterTest = () => {
  const [query, setQuery] = useState("");
  const [creatingOrg, setCreatingOrg] = useState("");
  const [location, setLocation] = useState("");
  const [parentSeriesTitle, setParentSeriesTitle] = useState("");
  const [aspectRatioMin, setAspectRatioMin] = useState();
  const [aspectRatioMax, setAspectRatioMax] = useState();

  const { results, totalCount } = useRecords({
    facets: {
      location: location,
      creatingOrg: creatingOrg,
      parentSeriesTitle: parentSeriesTitle,
    },
    query: query,
    aspectRatioRange: [aspectRatioMin || 0, aspectRatioMax || 200],
  });

  const {
    page,
    setPage,
    prevPage,
    nextPage,
    prevHandler,
    nextHandler,
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
  }, [setPage, creatingOrg, location, parentSeriesTitle, query]);

  const TestPager = () => {
    return (
      <div style={{ marginBottom: "20px" }}>
        <Pagination
          style={{ marginBottom: "20px" }}
          page={page}
          prevPage={prevPage}
          nextPage={nextPage}
          prevHandler={prevHandler}
          nextHandler={nextHandler}
          totalPages={totalPages}
        />
      </div>
    );
  };

  return (
    <div style={{ padding: "20px" }}>
      <p style={{ marginBottom: "20px" }}>{totalCount} Total Records</p>

      <Search setQuery={setQuery} />

      <ListingFilters
        actions={{
          setLocation,
          setCreatingOrg,
          setParentSeriesTitle,
          setAspectRatioMin,
          setAspectRatioMax,
        }}
      />

      <h1 style={{ marginBottom: "20px" }}>
        {results.length} result{results.length !== 1 && "s"}
      </h1>

      <TestPager />

      {data.map((record) => (
        <Record key={record.naId} record={record} />
      ))}

      <TestPager />
    </div>
  );
};

export default CrossfilterTest;
