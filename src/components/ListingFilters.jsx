import React, { Fragment } from "react";
import PropTypes from "prop-types";

const ListingFilters = ({ actions, data }) => {
  return (
    <Fragment>
      <div style={{ marginBottom: "20px" }}>
        <label htmlFor="creatingOrg">Creating Organization</label>
        <br />
        <select
          onChange={(event) => actions.setCreatingOrg(event.target.value)}
        >
          <option value="">Select Organization</option>
          {data.creatingOrgs.map((org, i) => (
            <option key={i} value={org.key}>
              {org.key}
            </option>
          ))}
        </select>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <label htmlFor="creatingOrg">Location</label>
        <br />
        <select onChange={(event) => actions.setLocation(event.target.value)}>
          <option value="">Select Location</option>
          {data.locations.map((org, i) => (
            <option key={i} value={org.key}>
              {org.key}
            </option>
          ))}
        </select>
      </div>
    </Fragment>
  );
};

ListingFilters.propTypes = {
  actions: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
};

export default ListingFilters;
