import React, { Fragment } from 'react';
import styled from 'styled-components';

// components
import * as Layout from '#components/shared/Layout';
import LandingBillboard from '#components/shared/LandingBillboard';
import AlphabetLinks from '#components/shared/AlphabetLinks';
import TribeList from '#components/shared/TribeList';
import TribeSearch from '#components/shared/TribeSearch';

// modules
import { tribalNations } from '#modules/constants';
import { groupObjectsByNameLetter } from '#modules/helpers';

const Label = styled.p`
  color: ${props => props.theme.colors.white};
  display: inline-block;
  margin-bottom: 1.5rem;
`;

const TribeLanding = () => {
  const groupedTribes = groupObjectsByNameLetter(tribalNations);

  const Billboard = () => {
    return (
      <LandingBillboard title="Tribal Nations">
        <Label>Select the first letter of a Tribal Nation's name</Label>
        <AlphabetLinks style={{ maxWidth: '650px', marginBottom: '3rem' }} activeLetters={Object.keys(groupedTribes)} />

        <TribeSearch tribalNations={tribalNations} />
      </LandingBillboard>
    );
  };

  return (
    <Fragment>
      <Billboard />
      <Layout.Padding style={{ marginTop: '4rem', marginBottom: '4rem' }}>
        <Layout.Wrapper>
          <TribeList groupedTribes={groupedTribes} />
        </Layout.Wrapper>
      </Layout.Padding>
    </Fragment>
  );
};

export default TribeLanding;
