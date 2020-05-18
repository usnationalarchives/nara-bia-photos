// libraries
import React, { useState, useEffect } from "react";

// modules
import paginator from "../modules/paginator";

// components
import Search from "./Search";
import ListingFilters from "./ListingFilters";
import Pagination from "./Pagination";
import Record from "./Record";

import {
  records,
  index,
  recordsByNaId,
  // recordsByTitle,
  // recordsByParentSeriesNaId,
  recordsByParentSeriesTitle,
  recordsByLocation,
  recordsByCreatingOrg,
  creatingOrgs,
  locations,
  parentSeriesTitles,
} from "../modules/data";

const totalRecords = records.size();

const CrossfilterTest = () => {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [creatingOrg, setCreatingOrg] = useState("");
  const [location, setLocation] = useState("");
  const [parentSeriesTitle, setParentSeriesTitle] = useState("");

  // If there is a creating org, filter by it. otherwise, dispose of any existing filters
  creatingOrg
    ? recordsByCreatingOrg.filter(creatingOrg)
    : recordsByCreatingOrg.dispose();

  // If there is a parent series, filter by it. otherwise, dispose of any existing filters
  parentSeriesTitle
    ? recordsByParentSeriesTitle.filter(parentSeriesTitle)
    : recordsByParentSeriesTitle.dispose();

  // If there is a location, filter by it. otherwise, dispose of any existing filters
  location ? recordsByLocation.filter(location) : recordsByLocation.dispose();

  if (query) {
    const searchResults = index.search(query);
    const searchResultNaIds = searchResults.map((result) =>
      parseInt(result.ref)
    );

    recordsByNaId.filterFunction((d) => {
      return searchResultNaIds.includes(d);
    });
  } else {
    recordsByNaId.dispose();
  }

  const filteredResults = records.allFiltered();
  const results = paginator(filteredResults, page, 30);

  // Scroll to the top of the document when the page changes
  useEffect(() => {
    document.querySelector("html").scrollTop = 0;
  }, [page]);

  // reset the page to 1 when a filter changes
  useEffect(() => {
    setPage(1);
  }, [creatingOrg, location, parentSeriesTitle, query]);

  return (
    <div style={{ padding: "20px" }}>
      <p style={{ marginBottom: "20px" }}>{totalRecords} Total Records</p>

      <Search setQuery={setQuery} />

      <ListingFilters
        actions={{ setLocation, setCreatingOrg, setParentSeriesTitle }}
        data={{ locations, creatingOrgs, parentSeriesTitles }}
      />

      <h1 style={{ marginBottom: "20px" }}>
        {filteredResults.length} result{filteredResults.length !== 1 && "s"}
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
