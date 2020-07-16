import React from "react";
import { Link } from "react-router-dom";

// components
import * as Layout from "#components/shared/Layout";
import * as Text from "#components/shared/Text";

// modules
import { topics } from "#modules/constants";

const TopicLanding = () => {
  return (
    <Layout.Padding>
      <Layout.Wrapper>
        <Text.H1>Topics</Text.H1>
        <ol>
          {topics.map((topic) => (
            <li key={topic.slug}>
              <Link to={`/topics/${topic.slug}`}>{topic.name}</Link>
            </li>
          ))}
        </ol>
      </Layout.Wrapper>
    </Layout.Padding>
  );
};

export default TopicLanding;
