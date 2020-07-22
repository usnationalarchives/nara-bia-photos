import React, { Fragment } from "react";
import { Link } from "react-router-dom";

// components
import * as Layout from "#components/shared/Layout";
import LandingBillboard from "#components/shared/LandingBillboard";

// modules
import { states } from "#modules/constants";

const Billboard = () => {
  return <LandingBillboard title="States" intro="Lorem Ipsum" />;
};

const StateLanding = () => {
  return (
    <Fragment>
      <Billboard />

      <Layout.Padding>
        <Layout.Wrapper>
          <ol>
            {states.map((state) => (
              <li key={state.slug}>
                <Link to={`/states/${state.slug}`}>{state.name}</Link>
              </li>
            ))}
          </ol>
        </Layout.Wrapper>
      </Layout.Padding>
    </Fragment>
  );
};

export default StateLanding;
