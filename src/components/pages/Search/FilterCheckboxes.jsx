import React from "react";

const SearchFilterCheckboxes = ({
  label,
  allItems,
  activeItems,
  dispatchItems,
}) => {
  return (
    <fieldset style={{ marginBottom: "20px" }}>
      <legend>{label}</legend>

      <ul>
        {allItems.map((item, i) => (
          <li key={i}>
            <input
              defaultChecked={activeItems.includes(item)}
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
            />
            <label htmlFor={`${label}[${i}]`}>{item}</label>
          </li>
        ))}
      </ul>
    </fieldset>
  );
};

export default SearchFilterCheckboxes;
