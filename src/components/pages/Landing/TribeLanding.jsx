import React, { Fragment } from 'react';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

// assets
import { ReactComponent as InfoIcon } from '#assets/icons/info.svg';

// components
import * as Layout from '#components/shared/Layout';
import LandingBillboard from '#components/shared/LandingBillboard';
import AlphabetLinks from '#components/shared/AlphabetLinks';
import TribeList from '#components/shared/TribeList';
import TribeSearch from '#components/shared/TribeSearch';
import PopoverInfo from '#components/shared/PopoverInfo';
import BannerImageAnnotation from '#components/shared/BannerImageAnnotation';

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
      <LandingBillboard
        bannerImage={content.tribalNations.bannerImage}
        bannerImage2x={content.tribalNations.bannerImage2x}
        title={content.tribalNations.title}
        imagePopup={
          <BannerImageAnnotation>
            <li>
              <span class="uppercase" aria-label="Left">
                Left
              </span>
              <Link to="/76048369">Indian Woman Weaves a Basket as Girl Watches</Link>
            </li>

            <li>
              <span class="uppercase" aria-label="Right">
                Right
              </span>
              <Link to="/519200">Watson Family Members, Alex Watson (Far Back), Lemma Shoshone</Link>
            </li>
          </BannerImageAnnotation>
        }
      >
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
        <title>{`${content.tribalNations.title} - Bureau Of Indian Affairs Photographs Finding Aid`}</title>
        <meta
          name="description"
          content={'Explore records from the Bureau of Indian Affairs based on many U.S. Tribal Nations.'}
        ></meta>
        <meta name="" content="" />
        <meta
          name="twitter:title"
          content={`${content.tribalNations.title} - Bureau Of Indian Affairs Photographs Finding Aid`}
        />
        <meta name="twitter:site" content={window.location} />
        <meta name="twitter:card" content="summary" />
        <meta
          name="twitter:description"
          content={'Explore records from the Bureau of Indian Affairs based on many U.S. Tribal Nations.'}
        />
        <meta name="twitter:image" content={`${process.env.PUBLIC_URL}/og-image.png`} />
        <meta
          property="og:title"
          content={`${content.topics.title} - Bureau Of Indian Affairs Photographs Finding Aid`}
        />
        <meta
          name="og:description"
          content={'Explore records from the Bureau of Indian Affairs based on many U.S. Tribal Nations.'}
        />
        <meta property="og:site_name" content="Bureau of Indian Affairs Photography Finding Aid" />
        <meta property="og:url" content={window.location} />
        <meta property="og:type" content="website" />
        <meta name="og:image" content={`${process.env.PUBLIC_URL}/og-image.png`} />
      </Helmet>
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
