import React, { Fragment } from 'react';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';

// components
import {Padding, Wrapper, Center} from '#components/shared/Layout';
import LandingBillboard from '#components/shared/LandingBillboard';
import AlphabetLinks from '#components/shared/AlphabetLinks';
import TribeList from '#components/shared/TribeList';
import TribeSearch from '#components/shared/TribeSearch';
import PopoverInfo from '#components/shared/PopoverInfo';

// modules
import { tribalNations } from '#modules/constants';
import { groupObjectsByNameLetter } from '#modules/helpers';
import content from '#config/content';

const Label = styled.p`
  color: ${props => props.theme.colors.white};
  display: inline-block;
  margin-bottom: 1.5rem;
`;

const TribeLanding = () => {
  const groupedTribes = groupObjectsByNameLetter(tribalNations);

  const Billboard = () => {
    return (
      <LandingBillboard title={content.tribalNations.title}>
        <Label>
          {content.tribalNations.intro}
          <PopoverInfo content={content.tribalNations.help} />
        </Label>
        <AlphabetLinks style={{ maxWidth: '650px', marginBottom: '3rem' }} activeLetters={Object.keys(groupedTribes)} />

        <TribeSearch tribalNations={tribalNations} />
      </LandingBillboard>
    );
  };

  return (
    <Fragment>
      <Helmet>
        <title>{`${content.tribalNations.title} - Bureau Of Indian Affairs Photography Finding Aid`}</title>
        {/* <meta name="description" content={content.topics.intro}></meta> */}
        <meta name="" content="" />
        <meta
          name="twitter:title"
          content={`${content.tribalNations.title} - Bureau Of Indian Affairs Photography Finding Aid`}
        />
        <meta name="twitter:site" content="@FIXME" />
        <meta name="twitter:card" content={'FIXME'} />
        <meta name="twitter:description" content={'FIXME'} />
        <meta name="twitter:image" content={'FIXME'} />
        <meta
          property="og:title"
          content={`${content.topics.title} - Bureau Of Indian Affairs Photography Finding Aid`}
        />
        <meta name="og:description" content={'FIXME'} />
        <meta property="og:site_name" content="FIXME" />
        <meta property="og:url" content={window.location} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={'FIXME'} />
      </Helmet>
      <Billboard />
      <Padding style={{ marginTop: '4rem', marginBottom: '4rem' }}>
        <Wrapper>
          <TribeList groupedTribes={groupedTribes} />
        </Wrapper>
      </Padding>
    </Fragment>
  );
};

export default TribeLanding;
