// libraries
import React, { useState, useEffect } from "react";

// modules
import paginator from "../modules/paginator";

// components
import Search from "./Search";
import ListingFilters from "./ListingFilters";
import Pagination from "./Pagination";
import Record from "./Record";

import useRecords from "../hooks/useRecords";

const CrossfilterTest = () => {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [creatingOrg, setCreatingOrg] = useState("");
  const [location, setLocation] = useState("");
  const [parentSeriesTitle, setParentSeriesTitle] = useState("");

  const [allRecords, filteredRecords] = useRecords(
    {
      location: location,
      creatingOrg: creatingOrg,
      parentSeriesTitle: parentSeriesTitle,
    },
    query
  );

  // Scroll to the top of the document when the page changes
  useEffect(() => {
    document.querySelector("html").scrollTop = 0;
  }, [page]);

  // reset the page to 1 when a filter changes
  useEffect(() => {
    setPage(1);
  }, [creatingOrg, location, parentSeriesTitle, query]);

  const results = paginator(filteredRecords, page, 30);

  return (
    <div style={{ padding: "20px" }}>
      <p style={{ marginBottom: "20px" }}>{allRecords.size()} Total Records</p>

      <Search setQuery={setQuery} />

      <ListingFilters
        actions={{ setLocation, setCreatingOrg, setParentSeriesTitle }}
      />

      <h1 style={{ marginBottom: "20px" }}>
        {filteredRecords.length} result{filteredRecords.length !== 1 && "s"}
      </h1>

      <Pagination
        style={{ marginBottom: "20px" }}
        page={page}
        setPage={setPage}
        results={results}
      />

      {results.data.map((record) => (
        <Record key={record.naId} record={record} />
      ))}

      <Pagination
        style={{ marginBottom: "20px" }}
        page={page}
        setPage={setPage}
        results={results}
      />
    </div>
  );
};

export default CrossfilterTest;
