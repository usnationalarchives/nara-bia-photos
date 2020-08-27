import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

// modules
import iiifImage from '#modules/iiifImage';

// styles
import { fl_absoluteFill } from '#styles/frontline';

const Root = styled.div``;

const ImageContainer = styled.div`
  ${fl_absoluteFill}
  background-size: cover;
  background-position: top center;
  background-repeat: no-repeat;
  bottom: 60px;
  height: auto;
`;

const Title = styled.p`
  color: ${props => props.theme.colors.darkGrey};
  font-size: 0.8em;
  margin-top: ${props => props.scale + 10}px;
`;

const CoverLink = styled(Link)`
  ${fl_absoluteFill}
`;

const Record = ({ record, scale }) => {
  return (
    <Root>
      <ImageContainer
        scale={scale}
        record={record}
        // style={{ backgroundImage: `url(${objects[0].thumbnail.url})` }}
        style={{ backgroundImage: `url(${iiifImage(record, 600)})` }}
      ></ImageContainer>
      <Title scale={scale}>{record.title}</Title>
      <CoverLink to={`/${record.slug}`} />
    </Root>
  );
};

Record.propTypes = {
  record: PropTypes.object.isRequired,
};

export default Record;
