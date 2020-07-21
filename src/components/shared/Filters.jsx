import React, { Fragment } from "react";

import Filter from "#components/shared/Filter";
import SelectedFilter from "#components/shared/SelectedFilter";

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

      <div>
        {filters.map((filter, i) => (
          <Fragment key={i}>
            {filter.active.map((active, i) => (
              <SelectedFilter dispatchItems={filter.dispatch} value={active} />
            ))}
          </Fragment>
        ))}
      </div>
    </Fragment>
  );
};

export default Filters;
