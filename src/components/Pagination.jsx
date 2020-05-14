import React from "react";
import PropTypes from "prop-types";

const Pagination = ({ page, setPage, results, style }) => {
  const prev = () => {
    setPage(page - 1);
  };

  const next = () => {
    setPage(page + 1);
  };

  return (
    <div style={style}>
      <p style={{ marginBottom: "20px" }}>
        Page {page} of {results.total_pages}
      </p>
      <button
        onClick={prev}
        disabled={page === 1}
        style={{ marginRight: "10px", padding: "4px 8px" }}
      >
        Previous
      </button>
      <button
        onClick={next}
        disabled={page === results.total_pages || results.total_pages === 0}
        style={{ padding: "4px 8px" }}
      >
        Next
      </button>
    </div>
  );
};

Pagination.propTypes = {
  page: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
  results: PropTypes.object.isRequired,
};

export default Pagination;
