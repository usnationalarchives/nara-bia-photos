import React from "react";
import PropTypes from "prop-types";
import { debounce } from "lodash";

import * as Text from "../../shared/Text";

const QueryField = ({ setQuery }) => {
  const handleSearch = debounce((value) => {
    setQuery("");
    setQuery(value);
  }, 300);

  return (
    <div style={{ marginBottom: "20px" }}>
      <label htmlFor="query">
        <Text.H1>Search</Text.H1>
      </label>
      <br />
      <input
        type="text"
        id="query"
        onKeyUp={(event) => handleSearch(event.target.value)}
      />
    </div>
  );
};

QueryField.propTypes = {
  setQuery: PropTypes.func.isRequired,
};

export default QueryField;
