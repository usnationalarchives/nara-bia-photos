import React from "react";

import { H2 } from "#components/shared/Text";

const Filter = ({ filter }) => {
  const { label, active, dispatch, dimension, permitted } = filter;

  const allItems = dimension
    .group()
    .all()
    .filter((i) => i.key && permitted.includes(i.key));

  return (
    <div>
      <fieldset style={{ marginBottom: "20px" }}>
        <legend style={{ marginBottom: "1.25rem" }}>
          <H2>{label}</H2>
        </legend>

        <ul>
          {allItems.map((item, i) => (
            <li key={i}>
              <input
                checked={active.includes(item.key)}
                value={item.key}
                type="checkbox"
                name={`${label}[${i}]`}
                id={`${label}[${i}]`}
                onChange={(e) => {
                  const value = e.target.value;
                  const checked = e.target.checked;

                  dispatch({
                    type: checked ? "add" : "remove",
                    value: value,
                  });
                }}
              />{" "}
              <label htmlFor={`${label}[${i}]`}>
                {item.key} ({item.value})
              </label>
            </li>
          ))}
        </ul>
      </fieldset>
    </div>
  );
};

export default Filter;
