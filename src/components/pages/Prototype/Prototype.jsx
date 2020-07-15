// libraries
import React, { Fragment, useState, useEffect } from "react";

// modules
import fullTextSearch from "#modules/fullTextSearch";
import { groups } from "#modules/data";

// components
import * as Layout from "#components/shared/Layout";
import QueryField from "../Search/QueryField";
import Record from "../Search/Record";
import FilterCheckboxes from "../Search/FilterCheckboxes";
import Pagination from "#components/shared/Pagination";

// hooks
import useCheckboxes from "#hooks/useCheckboxes";
import useRecords from "#hooks/useRecords";
import usePagination from "#hooks/usePagination";

const Prototype = () => {
  // pluck tribes from group keys, remove empty strings
  const tribeNames = groups.tribes.map((t) => t.key).filter((t) => Boolean(t));
  const [tribes, dispatchTribes] = useCheckboxes();
  const [topics, dispatchTopics] = useCheckboxes();

  const [query, setQuery] = useState("");
  const [creatingOrg, setCreatingOrg] = useState("");
  const [location, setLocation] = useState("");
  const [parentSeriesTitle, setParentSeriesTitle] = useState("");
  const [searchUUIDs, setSearchUUIDs] = useState();
  const [aspectRatioMin, setAspectRatioMin] = useState();
  const [aspectRatioMax, setAspectRatioMax] = useState();

  useEffect(() => {
    const UUIDs = fullTextSearch(query);
    setSearchUUIDs(UUIDs);
  }, [query]);

  const { results, totalCount } = useRecords({
    facets: {
      tribes: tribes,
      topics: topics,
      location: location,
      creatingOrg: creatingOrg,
      parentSeriesTitle: parentSeriesTitle,
      searchUUIDs: searchUUIDs,
      aspectRatioRange: [aspectRatioMin || 0, aspectRatioMax || 200],
    },
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

  return (
    <Layout.Padding style={{ marginTop: "1rem", marginBottom: "2rem" }}>
      <Layout.Wrapper>
        <p style={{ marginBottom: "20px" }}>{totalCount} Total Records</p>

        <QueryField setQuery={setQuery} />

        <FilterCheckboxes
          label="Topics"
          allItems={groups.topics}
          activeItems={topics}
          dispatchItems={dispatchTopics}
        />

        <FilterCheckboxes
          label="Tribes"
          allItems={tribeNames}
          activeItems={tribes}
          dispatchItems={dispatchTribes}
        />

        <Fragment>
          <div style={{ marginBottom: "20px" }}>
            <label htmlFor="creatingOrg">Creating Organization</label>
            <br />
            <select onChange={(event) => setCreatingOrg(event.target.value)}>
              <option value="">Select Organization</option>
              {groups.creatingOrgs.map((org, i) => (
                <option key={i} value={org.key}>
                  {org.key}
                </option>
              ))}
            </select>
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label htmlFor="parentSeriesTitle">Parent Series</label>
            <br />
            <select
              onChange={(event) => setParentSeriesTitle(event.target.value)}
            >
              <option value="">Select Parent Series</option>
              {groups.parentSeriesTitles.map((org, i) => (
                <option key={i} value={org.key}>
                  {org.key}
                </option>
              ))}
            </select>
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label htmlFor="location">Location</label>
            <br />
            <select
              id="location"
              onChange={(event) => setLocation(event.target.value)}
            >
              <option value="">Select Location</option>
              {groups.locations.map((org, i) => (
                <option key={i} value={org.key}>
                  {org.key}
                </option>
              ))}
            </select>
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label htmlFor="minAspectRatio">Minimum Aspect Ratio</label>
            <br />
            <input
              type="text"
              id="minAspectRatio"
              onChange={(event) =>
                setAspectRatioMin(parseFloat(event.target.value))
              }
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label htmlFor="maxAspectRatio">Maximum Aspect Ratio</label>
            <br />
            <input
              type="text"
              id="maxAspectRatio"
              onChange={(event) =>
                setAspectRatioMax(parseFloat(event.target.value))
              }
            />
          </div>
        </Fragment>

        <h1 style={{ marginBottom: "20px" }}>
          {results.length} result{results.length !== 1 && "s"}
        </h1>

        {data.map((record) => (
          <Record key={record.naId} record={record} />
        ))}

        <Pagination
          style={{ marginBottom: "20px" }}
          page={page}
          prevPage={prevPage}
          nextPage={nextPage}
          prevHandler={prevHandler}
          nextHandler={nextHandler}
          totalPages={totalPages}
        />
      </Layout.Wrapper>
    </Layout.Padding>
  );
};

export default Prototype;
