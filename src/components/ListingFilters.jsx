import React, { Fragment } from "react";
import PropTypes from "prop-types";

import { groups } from "../modules/data";

const ListingFilters = ({ actions }) => {
  const {
    creatingOrgs,
    locations,
    parentSeriesTitles,
    topics,
    tribes,
  } = groups;

  return (
    <Fragment>
      <div style={{ marginBottom: "20px" }}>
        <label htmlFor="topic">Topic</label>
        <br />
        <select
          onChange={(event) => actions.setTag(event.target.value)}
          id="topic"
        >
          <option value="">Select Topic</option>
          {topics.map((topic, i) => (
            <option key={i} value={topic}>
              {topic}
            </option>
          ))}
        </select>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <label htmlFor="tribe">Tribe</label>
        <br />
        <select
          onChange={(event) => actions.setTribe(event.target.value)}
          id="tribe"
        >
          {tribes.map((org, i) => (
            <option key={i} value={org.key}>
              {i === 0 ? "Select Tribe" : org.key}
            </option>
          ))}
        </select>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <label htmlFor="creatingOrg">Creating Organization</label>
        <br />
        <select
          onChange={(event) => actions.setCreatingOrg(event.target.value)}
        >
          <option value="">Select Organization</option>
          {creatingOrgs.map((org, i) => (
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
          onChange={(event) => actions.setParentSeriesTitle(event.target.value)}
        >
          <option value="">Select Parent Series</option>
          {parentSeriesTitles.map((org, i) => (
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
          onChange={(event) => actions.setLocation(event.target.value)}
        >
          <option value="">Select Location</option>
          {locations.map((org, i) => (
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
            actions.setAspectRatioMin(parseFloat(event.target.value))
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
            actions.setAspectRatioMax(parseFloat(event.target.value))
          }
        />
      </div>
    </Fragment>
  );
};

ListingFilters.propTypes = {
  actions: PropTypes.object.isRequired,
};

export default ListingFilters;
