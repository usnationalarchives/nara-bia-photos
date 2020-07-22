import React, { Fragment } from "react";
import styled, { css } from "styled-components";
import { Link, useHistory } from "react-router-dom";

// components
import * as Layout from "#components/shared/Layout";
import Billboard from "./Billboard";
import { Grid, GridItem } from "#components/shared/Grid";
import Card from "#components/shared/Card";

// modules
import { topics } from "#modules/constants";

// styles
import { fl_allStates, fl_absoluteFill } from "#styles/frontline";

const ImagePlaceholder = styled.div`
  background-color: ${(props) => props.theme.colors.mediumGrey};
  height: 0;
  padding-top: 56.25%;
`;

const Topic = ({ topic }) => {
  const Inner = styled.div`
    padding: 1rem 1.5rem;
  `;

  const Label = styled(Link)`
    font-weight: bold;
    text-decoration: none;

    ${fl_allStates(css`
      color: ${(props) => props.theme.colors.blue};
    `)}
  `;

  const CoverLink = styled(Link)`
    ${fl_absoluteFill}
  `;

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

const TopicLanding = () => {
  const history = useHistory();

  const handleSelect = (event) => {
    const slug = event.target.value;
    history.push("/topics/" + slug);
  };

  return (
    <Fragment>
      <Billboard title="Topics" description="Lorem Ipsum">
        <select style={{ marginTop: "1rem" }} onChange={handleSelect}>
          <option value="">Select a Topic</option>
          {topics.map((topic) => (
            <option value={topic.slug} key={topic.slug}>
              {topic.name}
            </option>
          ))}
        </select>
      </Billboard>

      <Layout.Padding style={{ marginTop: "5rem", marginBottom: "5rem" }}>
        <Layout.Wrapper>
          <Grid>
            {topics.map((topic) => (
              <GridItem key={topic.slug}>
                <Card>
                  <Topic topic={topic} />
                </Card>
              </GridItem>
            ))}
          </Grid>
        </Layout.Wrapper>
      </Layout.Padding>
    </Fragment>
  );
};

export default TopicLanding;
