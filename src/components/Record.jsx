import React from "react";
import PropTypes from "prop-types";

const Record = ({ record }) => {
  return (
    <dl
      style={{
        borderWidth: "1px",
        borderColor: "black",
        borderStyle: "solid",
        marginBottom: "20px",
        padding: "10px",
      }}
    >
      <dt>
        <b>NAID:</b>
      </dt>
      <dd style={{ marginBottom: "4px" }}>{record.naId}</dd>
      <dt>
        <b>Location:</b>
      </dt>
      <dd style={{ marginBottom: "4px" }}>{record.location}</dd>
      <dt>
        <b>Title:</b>
      </dt>
      <dd style={{ marginBottom: "4px" }}>{record.title}</dd>
      <dt>
        <b>Parent Series NAID:</b>
      </dt>
      <dd style={{ marginBottom: "4px" }}>{record.parentSeriesNaId}</dd>
      <dt>
        <b>Parent Series Title:</b>
      </dt>
      <dd style={{ marginBottom: "4px" }}>{record.parentSeriesTitle}</dd>
      <dt>
        <b>Creating Organization:</b>
      </dt>
      <dd style={{ marginBottom: "4px" }}>{record.creatingOrg}</dd>
    </dl>
  );
};

Record.propTypes = {
  record: PropTypes.object.isRequired,
};

export default Record;
