import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styled from "styled-components";

// styles
import { fl_absoluteFill } from "#styles/frontline";

const Root = styled.div`
  caption-side: bottom;
  display: table;
`;

const Image = styled.img`
  height: ${(props) => props.scale}px;
`;

const Title = styled.p`
  color: ${(props) => props.theme.colors.darkGrey};
  display: table-caption;
  font-size: 0.8em;
  margin-top: 0.5rem;
`;

const CoverLink = styled(Link)`
  ${fl_absoluteFill}
`;

const Record = ({ record, scale }) => {
  const objects = JSON.parse(record.objects);

  return (
    <Root>
      <Image
        src={objects[0].thumbnail.url}
        alt=""
        aria-hidden="true"
        scale={scale}
        aspectRatio={record.aspectRatio}
      />
      <Title>{record.title}</Title>
      <CoverLink to={`/${record.slug}`} />
    </Root>
  );
};

Record.propTypes = {
  record: PropTypes.object.isRequired,
};

export default Record;
