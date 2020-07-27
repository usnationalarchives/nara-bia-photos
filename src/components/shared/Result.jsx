import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Thumbnail = styled.div`
  flex: 0 0 auto;
  display: inline-table;
`;

const Image = styled.img`
  display: block;
  min-width: ${(props) => 400 - props.scale * 3}px;
`;

const Title = styled.p`
  display: table-caption;
  caption-side: bottom;
  margin-top: 0.5rem;
  font-size: 0.8em;
  color: ${(props) => props.theme.colors.darkGrey};
`;

const Record = ({ record, scale }) => {
  const objects = JSON.parse(record.objects);

  return (
    <Thumbnail>
      <Link to={`/${record.slug}`}>
        <Image
          src={objects[0].thumbnail.url}
          alt=""
          aria-hidden="true"
          scale={scale}
        />
      </Link>
      <Title>{record.title}</Title>
    </Thumbnail>
    // <dl
    //   style={{
    //     borderWidth: "1px",
    //     borderColor: "black",
    //     borderStyle: "solid",
    //     marginBottom: "20px",
    //     padding: "10px",
    //   }}
    // >
    //   <dt>
    //     <b>NAID:</b>
    //   </dt>
    //   <dd style={{ marginBottom: "4px" }}>{record.naId}</dd>
    //   <dt>
    //     <b>Location:</b>
    //   </dt>
    //   <dd style={{ marginBottom: "4px" }}>{record.location}</dd>
    //   <dt>
    //     <b>Title:</b>
    //   </dt>
    //   <dd style={{ marginBottom: "4px" }}>
    //     <Link to={`/${record.slug}`}>{record.title}</Link>
    //   </dd>
    //   <dt>
    //     <b>Parent Series NAID:</b>
    //   </dt>
    //   <dd style={{ marginBottom: "4px" }}>{record.parentSeriesNaId}</dd>
    //   <dt>
    //     <b>Parent Series Title:</b>
    //   </dt>
    //   <dd style={{ marginBottom: "4px" }}>{record.parentSeriesTitle}</dd>
    //   <dt>
    //     <b>Creating Organization:</b>
    //   </dt>
    //   <dd style={{ marginBottom: "4px" }}>{record.creatingOrg}</dd>
    //   <dt>
    //     <b>Aspect Ratio:</b>
    //   </dt>
    //   <dd style={{ marginBottom: "4px" }}>{record.aspectRatio}</dd>
    //   <dt>
    //     <b>Thumbnail:</b>
    //   </dt>
    //   <dd>
    //     <img src={objects[0].thumbnail.url} alt="" aria-hidden="true" />
    //   </dd>
    // </dl>
  );
};

Record.propTypes = {
  record: PropTypes.object.isRequired,
};

export default Record;
