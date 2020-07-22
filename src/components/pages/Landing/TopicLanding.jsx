import React, { Fragment } from "react";
import { Link } from "react-router-dom";

// components
import * as Layout from "#components/shared/Layout";
import Billboard from "./Billboard";

// modules
import { topics } from "#modules/constants";

const TopicLanding = () => {
  return (
    <Fragment>
      <Billboard title="Topics" description="Lorem Ipsum"></Billboard>

      <Layout.Padding>
        <Layout.Wrapper>
          <ol>
            {topics.map((topic) => (
              <li key={topic.slug}>
                <Link to={`/topics/${topic.slug}`}>{topic.name}</Link>
              </li>
            ))}
          </ol>
        </Layout.Wrapper>
      </Layout.Padding>
    </Fragment>
  );
};

export default TopicLanding;
