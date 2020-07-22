import React, { Fragment } from "react";
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";

// styles
import { fl_allStates, fl_absoluteFill } from "#styles/frontline";

const ImagePlaceholder = styled.div`
  background-color: ${(props) => props.theme.colors.mediumGrey};
  height: 0;
  padding-top: 56.25%;
`;
const Inner = styled.div`
  padding: 1rem 1.5rem;
`;

const Label = styled(Link)`
  font-size: 1.2rem;
  font-weight: bold;
  text-decoration: none;

  ${fl_allStates(css`
    color: ${(props) => props.theme.colors.blue};
  `)}
`;

const CoverLink = styled(Link)`
  ${fl_absoluteFill}
`;

const Topic = ({ topic }) => {
  return (
    <Fragment>
      <ImagePlaceholder />
      <Inner>
        <Label to={`/topics/${topic.slug}`}>{topic.name}</Label>
      </Inner>
      <CoverLink
        to={`/topics/${topic.slug}`}
        aria-hidden="true"
        focusable="false"
        tabIndex="-1"
      />
    </Fragment>
  );
};

export default Topic;
