import React, { Fragment } from "react";
import { Link } from "react-router-dom";

// components
import * as Layout from "#components/shared/Layout";
import Billboard from "./Billboard";
import { Grid, GridItem } from "#components/shared/Grid";
import Card from "#components/shared/Card";

// modules
import { topics } from "#modules/constants";

const TopicLanding = () => {
  return (
    <Fragment>
      <Billboard title="Topics" description="Lorem Ipsum"></Billboard>

      <Layout.Padding>
        <Layout.Wrapper>
          <Grid>
            {topics.map((topic) => (
              <GridItem key={topic.slug}>
                <Card>
                  <Link to={`/topics/${topic.slug}`}>{topic.name}</Link>
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
