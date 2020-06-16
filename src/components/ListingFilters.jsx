import React, { Fragment } from "react";
import PropTypes from "prop-types";

import { groups } from "../modules/data";

const ListingFilters = ({ actions }) => {
  const { creatingOrgs, locations, parentSeriesTitles } = groups;

  return (
    <Fragment>
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
