import React from "react";

import { H2 } from "#components/shared/Text";

const SearchFilterCheckboxes = ({
  label,
  allItems,
  activeItems,
  dispatchItems,
}) => {
  return (
    <fieldset style={{ marginBottom: "20px" }}>
      <legend style={{ marginBottom: "1.25rem" }}>
        <H2>{label}</H2>
      </legend>

      <ul>
        {allItems.map((item, i) => (
          <li key={i}>
            <input
              checked={activeItems.includes(item)}
              value={item}
              type="checkbox"
              name={`${label}[${i}]`}
              id={`${label}[${i}]`}
              onChange={(e) => {
                const value = e.target.value;
                const checked = e.target.checked;

                dispatchItems({
                  type: checked ? "add" : "remove",
                  value: value,
                });
              }}
            />{" "}
            <label htmlFor={`${label}[${i}]`}>{item}</label>
          </li>
        ))}
      </ul>
    </fieldset>
  );
};

export default SearchFilterCheckboxes;
