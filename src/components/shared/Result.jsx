import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

// modules
import iiifImage from '#modules/iiifImage';

// components
import CoverLink from '#components/shared/CoverLink';

// styles
import { fl_absoluteFill, fl_attention } from '#styles/frontline';

const Root = styled.div`

  ${fl_attention(css`
    .hover {
      cursor: pointer;
      opacity: 1;
      visibility: visible;
    }
  `)}

  .hover {
    ${fl_absoluteFill}
    background-color: rgba(0,0,0,.5);
    border-bottom: 6px solid ${props => props.theme.colors.yellow}; 
    content '';
    opacity: 0;
    transition: opacity .7s ease, border .7s ease;
    visibility: hidden;
    z-index: 2;
  }
`;

const ImageContainer = styled.div`
  ${fl_absoluteFill}
  background-size: cover;
  background-position: top center;
  background-repeat: no-repeat;
  bottom: 60px;
  height: auto;
  z-index: 1;
`;

const Title = styled.span`
  color: ${props => props.theme.colors.white};
  display: block;
  font-size: 0.8em;
  margin-top: ${props => props.scale + 10}px;

  ${fl_attention(css`
    color: #fff;
  `)}
`;

const Record = ({ record, scale }) => {
  return (
    <Root>
      <ImageContainer
        scale={scale}
        record={record}
        // style={{ backgroundImage: `url(${objects[0].thumbnail.url})` }}
        style={{ backgroundImage: `url(${iiifImage(record, 600)})` }}
      >
        <div className="hover"></div>
      </ImageContainer>
      <CoverLink to={`/${record.slug}`}>
        <Title scale={scale}>{record.title}</Title>
      </CoverLink>
    </Root>
  );
};

Record.propTypes = {
  record: PropTypes.object.isRequired,
};

export default Record;
