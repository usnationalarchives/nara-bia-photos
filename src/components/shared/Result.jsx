import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Record = ({ record }) => {
  const objects = JSON.parse(record.objects);

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
      <dd style={{ marginBottom: "4px" }}>
        <Link to={`/${record.slug}`}>{record.title}</Link>
      </dd>
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
      <dt>
        <b>Aspect Ratio:</b>
      </dt>
      <dd style={{ marginBottom: "4px" }}>{record.aspectRatio}</dd>
      <dt>
        <b>Thumbnail:</b>
      </dt>
      <dd>
        <img src={objects[0].thumbnail.url} alt="" aria-hidden="true" />
      </dd>
    </dl>
  );
};

Record.propTypes = {
  record: PropTypes.object.isRequired,
};

export default Record;
