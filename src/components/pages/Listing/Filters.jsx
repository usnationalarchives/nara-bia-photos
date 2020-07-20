import React, { Fragment } from "react";

import Filter from "./Filter";

const Filters = ({ filters }) => {
  return (
    <Fragment>
      <div style={{ display: "flex" }}>
        {filters.map((filter, i) => (
          <div key={i}>
            <Filter filter={filter} />
          </div>
        ))}
      </div>
    </Fragment>
  );
};

export default Filters;
