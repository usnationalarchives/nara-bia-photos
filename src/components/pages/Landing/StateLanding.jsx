import React from "react";
import { Link } from "react-router-dom";

// components
import * as Layout from "#components/shared/Layout";
import * as Text from "#components/shared/Text";

// modules
import { states } from "#modules/constants";

const StateLanding = () => {
  return (
    <Layout.Padding>
      <Layout.Wrapper>
        <Text.H1>States</Text.H1>
        <ol>
          {states.map((state) => (
            <li key={state.slug}>
              <Link to={`/states/${state.slug}`}>{state.name}</Link>
            </li>
          ))}
        </ol>
      </Layout.Wrapper>
    </Layout.Padding>
  );
};

export default StateLanding;
