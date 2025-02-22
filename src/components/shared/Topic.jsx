import React, { Fragment } from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

// modules
// import iiifImage from '#modules/iiifImage';

// styles
import { fl_allStates, fl_absoluteFill } from '#styles/frontline';

const Image = styled.div`
  background-color: ${props => props.theme.colors.mediumGrey};
  background-image: url(${props => props.thumbnailUrl});
  ${props =>
    !!props.$position &&
    css`
      background-position: ${props.$position};
    `}
  background-size: cover;
  height: 0;
  padding-top: 56.25%;
`;

const Inner = styled.div`
  padding: 1rem 1.5rem;
  display: flex;
  flex: 2 0 auto;
  flex-direction: row;
  align-items: center;
`;

const Label = styled(Link)`
  font-size: 1.2rem;
  font-weight: bold;
  text-decoration: none;

  ${fl_allStates(css`
    color: ${props => props.theme.colors.blue};
  `)}
`;

const CoverLink = styled(Link)`
  ${fl_absoluteFill}
`;

const Topic = ({ topic, thumbnailUrl }) => {
  return (
    <Fragment>
      <Image thumbnailUrl={thumbnailUrl} $position={topic.slug === 'portraits' ? 'center 30%' : null} />
      <Inner>
        <Label to={`/topics/${topic.slug}`}>{topic.name}</Label>
      </Inner>
      <CoverLink to={`/topics/${topic.slug}`} aria-hidden="true" focusable="false" tabIndex="-1" />
    </Fragment>
  );
};

export default Topic;
