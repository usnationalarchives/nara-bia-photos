import React, { Fragment } from "react";
import { useHistory } from "react-router-dom";

// components
import * as Layout from "#components/shared/Layout";
import LandingBillboard from "#components/shared/LandingBillboard";
import { Grid, GridItem } from "#components/shared/Grid";
import Card from "#components/shared/Card";
import Topic from "#components/shared/Topic";

// modules
import { topics } from "#modules/constants";

const TopicLanding = () => {
  const Billboard = () => {
    const history = useHistory();

    const handleSelect = (event) => {
      const slug = event.target.value;
      history.push("/topics/" + slug);
    };

    return (
      <LandingBillboard title="Topics" intro="Lorem Ipsum">
        <select style={{ marginTop: "1rem" }} onChange={handleSelect}>
          <option value="">Select a Topic</option>
          {topics.map((topic) => (
            <option value={topic.slug} key={topic.slug}>
              {topic.name}
            </option>
          ))}
        </select>
      </LandingBillboard>
    );
  };

  const TopicsGrid = () => {
    return (
      <Grid>
        {topics.map((topic) => (
          <GridItem key={topic.slug}>
            <Card>
              <Topic topic={topic} />
            </Card>
          </GridItem>
        ))}
      </Grid>
    );
  };

  return (
    <Fragment>
      <Billboard />

      <Layout.Padding style={{ marginTop: "5rem", marginBottom: "5rem" }}>
        <Layout.Wrapper>
          <TopicsGrid />
        </Layout.Wrapper>
      </Layout.Padding>
    </Fragment>
  );
};

export default TopicLanding;
