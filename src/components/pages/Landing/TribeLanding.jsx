import React from "react";
import { Link } from "react-router-dom";

// components
import * as Layout from "#components/shared/Layout";
import * as Text from "#components/shared/Text";

// data
import tribalNations from "#data/tribalNations.csv";

// sort the Tribal Nations from the csv
const sortedTribalNations = tribalNations.sort((a, b) =>
  a.name > b.name ? 1 : -1
);

const TribeLanding = () => {
  return (
    <Layout.Padding>
      <Layout.Wrapper>
        <Text.H1>Tribal Nations</Text.H1>
        <ol>
          {sortedTribalNations.map((tribalNation) => (
            <li key={tribalNation.slug}>
              <Link to={`/tribal-nations/${tribalNation.slug}`}>
                {tribalNation.name}
              </Link>
            </li>
          ))}
        </ol>
      </Layout.Wrapper>
    </Layout.Padding>
  );
};

export default TribeLanding;
