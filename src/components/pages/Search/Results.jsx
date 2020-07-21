import React, { Fragment } from "react";

// components
import Record from "./Record";

const Results = ({ results, data }) => {
  return (
    <Fragment>
      <p style={{ marginBottom: "20px" }}>
        {results.length} result{results.length !== 1 && "s"}
      </p>

      {data.map((record) => (
        <Record key={record.naId} record={record} />
      ))}
    </Fragment>
  );
};

export default Results;
