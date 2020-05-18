import React from "react";
import PropTypes from "prop-types";
import { debounce } from "lodash";

const Search = ({ setQuery }) => {
  const handleSearch = debounce((value) => {
    setQuery("");
    setQuery(value);
  }, 300);

  return (
    <div style={{ marginBottom: "20px" }}>
      <label htmlFor="query">Search</label>
      <br />
      <input
        type="text"
        id="query"
        onKeyUp={(event) => handleSearch(event.target.value)}
      />
    </div>
  );
};

Search.propTypes = {
  setQuery: PropTypes.func.isRequired,
};

export default Search;
