import React from "react";

import FilterCheckboxes from "../Search/FilterCheckboxes";

const Filter = ({ filter }) => {
  const { label, active, dispatch, dimension, permitted } = filter;

  const allItems = dimension
    .group()
    .all()
    .filter((i) => i.value !== 0 && i.key && permitted.includes(i.key))
    .map((i) => i.key);

  return (
    <div>
      <FilterCheckboxes
        label={label}
        allItems={allItems}
        activeItems={active}
        dispatchItems={dispatch}
      />
    </div>
  );
};

export default Filter;
