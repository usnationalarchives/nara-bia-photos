import React, { Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import { Helmet } from 'react-helmet';

// components
import {Padding, Wrapper, Center} from '#components/shared/Layout';
import LandingBillboard from '#components/shared/LandingBillboard';
import { Grid, GridItem } from '#components/shared/Grid';
import Card from '#components/shared/Card';
import Topic from '#components/shared/Topic';
import Select from '#components/shared/Select';

// hooks
import useRecords from '#hooks/useRecords';

// modules
import { topics } from '#modules/constants';
import iiifImage from '#modules/iiifImage';

// config
import content from '#config/content';

const TopicLanding = () => {
  const thumbnailNaIds = topics.map(t => t.thumbnailNaId);

  const [results] = useRecords({
    facets: {
      naIds: thumbnailNaIds,
    },
  });

  const thumbnailUrl = naId => {
    const result = results.filter(result => result.naId === naId)[0];

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
      <LandingBillboard title={content.topics.title} intro={content.topics.intro} introHelp={content.topics.help}>
        <Select transparent style={{ marginTop: '2.5rem' }} onChange={handleSelect}>
          <option value="">{content.topics.selectPrompt}</option>
          {topics.map(topic => (
            <option value={topic.slug} key={topic.slug}>
              {topic.name}
            </option>
          ))}
        </Select>
      </LandingBillboard>
    );
  };

  const TopicsGrid = () => {
    return (
      <Grid>
        {topics.map(topic => (
          <GridItem key={topic.slug}>
            <Card>
              <Topic topic={topic} thumbnailUrl={thumbnailUrl(topic.thumbnailNaId)} />
            </Card>
          </GridItem>
        ))}
      </Grid>
    );
  };

  return (
    <Fragment>
      <Helmet>
        <title>{`${content.topics.title} - Bureau Of Indian Affairs Photography Finding Aid`}</title>
        {/* <meta name="description" content={content.topics.intro}></meta> */}
        <meta name="" content="" />
        <meta
          name="twitter:title"
          content={`${content.topics.title} - Bureau Of Indian Affairs Photography Finding Aid`}
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

      <Padding style={{ marginTop: '5rem', marginBottom: '5rem' }}>
        <Wrapper>
          <TopicsGrid />
        </Wrapper>
      </Padding>
    </Fragment>
  );
};

export default TopicLanding;
