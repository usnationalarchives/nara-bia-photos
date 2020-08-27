import React, { Fragment } from 'react';
import { useHistory } from 'react-router-dom';

// components
import * as Layout from '#components/shared/Layout';
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
      <Billboard />

      <Layout.Padding style={{ marginTop: '5rem', marginBottom: '5rem' }}>
        <Layout.Wrapper>
          <TopicsGrid />
        </Layout.Wrapper>
      </Layout.Padding>
    </Fragment>
  );
};

export default TopicLanding;
