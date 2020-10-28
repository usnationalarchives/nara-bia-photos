import React, { Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import styled, { css } from 'styled-components';
import { orderBy } from 'lodash';

// assets
import { ReactComponent as InfoIcon } from '#assets/icons/info.svg';
import bannerImage from '#assets/images/banner-topics.png';
import bannerImage2x from '#assets/images/banner-topics@2x.png';

// components
import * as Layout from '#components/shared/Layout';
import LandingBillboard from '#components/shared/LandingBillboard';
import { Grid, GridItem } from '#components/shared/Grid';
import Card from '#components/shared/Card';
import Topic from '#components/shared/Topic';
import Select from '#components/shared/Select';

import { fl_attention } from '#styles/frontline';

// hooks
import useRecords from '#hooks/useRecords';

// modules
import { topics } from '#modules/constants';
import iiifImage from '#modules/iiifImage';

// config
import content from '#config/content';

const CardStyled = styled(Card)`
  ${fl_attention(css`
    outline: 2px solid ${props => props.theme.colors.blue};
    outline-offset: -2px;
  `)}
`;

const TopicLanding = () => {
  const thumbnailNaIds = topics.map(t => t.thumbnailNaId);

  const [results] = useRecords({
    facets: {
      naIds: thumbnailNaIds,
    },
  });

  console.log(results);

  const thumbnailUrl = naId => {
    const result = results.filter(result => result.naId === naId)[0];
    !!result && console.log(naId, result.title, result);

    if (result) {
      const url = iiifImage(result, 600);
      return url;
    }
  };

  const Billboard = () => {
    const history = useHistory();

    const handleSelect = event => {
      const slug = event.target.value;
      history.push('/topics/' + slug);
    };

    return (
      <LandingBillboard
        bannerImage={bannerImage}
        bannerImage2x={bannerImage2x}
        title={content.topics.title}
        intro={content.topics.intro}
        introHelp={content.topics.help}
      >
        <form>
          <label className="screenreader" htmlFor="topic">
            Topics
          </label>
          <Select transparent id="topic" name="topic" style={{ marginTop: '2.5rem' }} onChange={handleSelect}>
            <option value="">{content.topics.selectPrompt}</option>
            {topics.map(topic => (
              <option value={topic.slug} key={topic.slug}>
                {topic.name}
              </option>
            ))}
          </Select>
        </form>
      </LandingBillboard>
    );
  };

  const TopicsGrid = () => {
    return (
      <Grid>
        {orderBy(topics, 'name').map(topic => {
          console.log(topic.slug);
          return (
            <GridItem key={topic.slug}>
              <CardStyled>
                <Topic topic={topic} thumbnailUrl={thumbnailUrl(topic.thumbnailNaId)} />
              </CardStyled>
            </GridItem>
          );
        })}
      </Grid>
    );
  };

  return (
    <Fragment>
      <Helmet>
        <title>{`${content.topics.title} - Bureau Of Indian Affairs Photographs Finding Aid`}</title>
        {/* <meta name="description" content={content.topics.intro}></meta> */}
        <meta name="" content="" />
        <meta
          name="twitter:title"
          content={`${content.topics.title} - Bureau Of Indian Affairs Photographs Finding Aid`}
        />
        <meta name="twitter:site" content="@FIXME" />
        <meta name="twitter:card" content={'FIXME'} />
        <meta name="twitter:description" content={'FIXME'} />
        <meta name="twitter:image" content={'FIXME'} />
        <meta
          property="og:title"
          content={`${content.topics.title} - Bureau Of Indian Affairs Photographs Finding Aid`}
        />
        <meta name="og:description" content={'FIXME'} />
        <meta property="og:site_name" content="FIXME" />
        <meta property="og:url" content={window.location} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={'FIXME'} />
      </Helmet>
      <Billboard />

      <Layout.Strata>
        <Layout.Padding>
          <Layout.Wrapper>
            <TopicsGrid />
          </Layout.Wrapper>
        </Layout.Padding>
      </Layout.Strata>
    </Fragment>
  );
};

export default TopicLanding;
