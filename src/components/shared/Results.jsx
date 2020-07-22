import React, { Fragment } from "react";

// components
import Result from "#components/shared/Result";

const Results = ({ results, data }) => {
  return (
    <Fragment>
      <p style={{ marginBottom: "20px" }}>
        {results.length} result{results.length !== 1 && "s"}
      </p>

      {data.map((record) => (
        <Result key={record.naId} record={record} />
      ))}
    </Fragment>
  );
};

export default Results;
