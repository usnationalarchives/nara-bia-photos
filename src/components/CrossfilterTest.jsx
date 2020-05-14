// libraries
import React, { useState, useEffect } from "react";

// modules
import paginator from "../modules/paginator";

// components
import ListingFilters from "./ListingFilters";
import Pagination from "./Pagination";
import Record from "./Record";

import {
  records,
  recordsByNaId,
  recordsByLocation,
  recordsByTitle,
  recordsByParentSeriesNaId,
  recordsByCreatingOrg,
  creatingOrgs,
  locations,
} from "../modules/data";

const totalRecords = records.size();

const CrossfilterTest = () => {
  const [page, setPage] = useState(1);
  const [creatingOrg, setCreatingOrg] = useState("");
  const [location, setLocation] = useState("");

  // If there is a creating org, filter by it. otherwise, dispose of any existing filters
  creatingOrg
    ? recordsByCreatingOrg.filter(creatingOrg)
    : recordsByCreatingOrg.dispose();

  // If there is a location, filter by it. otherwise, dispose of any existing filters
  location ? recordsByLocation.filter(location) : recordsByLocation.dispose();

  const filteredResults = records.allFiltered();
  const results = paginator(filteredResults, page, 30);

  // Scroll to the top of the document when the page changes
  useEffect(() => {
    document.querySelector("html").scrollTop = 0;
  }, [page]);

  // reset the page to 1 when a filter changes
  useEffect(() => {
    setPage(1);
  }, [creatingOrg, location]);

  return (
    <div style={{ padding: "20px" }}>
      <p style={{ marginBottom: "20px" }}>{totalRecords} Total Records</p>

      <ListingFilters
        actions={{ setLocation, setCreatingOrg }}
        data={{ locations, creatingOrgs }}
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

      {results.data.map((record, i) => (
        <Record key={i} record={record} />
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
