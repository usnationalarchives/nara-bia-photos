import React from "react";
import PropTypes from "prop-types";

const Pagination = ({
  page,
  prevHandler,
  nextHandler,
  prevPage,
  nextPage,
  perPage,
  total,
  totalPages,
}) => {
  return (
    <div>
      <p style={{ marginBottom: "20px" }}>
        Page {page} of {totalPages}
      </p>
      <button
        onClick={prevHandler}
        disabled={!prevPage}
        style={{ marginRight: "10px", padding: "4px 8px" }}
      >
        Previous
      </button>
      <button
        onClick={nextHandler}
        disabled={!nextPage}
        style={{ padding: "4px 8px" }}
      >
        Next
      </button>
    </div>
  );
};

Pagination.propTypes = {
  page: PropTypes.number.isRequired,
  prevHandler: PropTypes.func.isRequired,
  nextHandler: PropTypes.func.isRequired,
  prevPage: PropTypes.number,
  nextPage: PropTypes.number,
  perPage: PropTypes.number,
  total: PropTypes.number,
  totalPages: PropTypes.number,
};

export default Pagination;
