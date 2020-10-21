import React, { Children } from 'react';
import { fl_visuallyHidden } from '#styles/frontline';
import styled, { css } from 'styled-components';
import { Helmet } from 'react-helmet';

import * as Layout from '#components/shared/Layout';
import * as Text from '#components/shared/Text';
import Billboard from '#components/shared/Billboard';
import ReactHtmlParser, { convertNodeToElement } from 'react-html-parser';

// config
import content from '#config/content';
import aboutText from '#config/about.html';

const getAlignment = count => {
  return count % 2 ? 'right' : 'left';
};

const PageTitle = styled(Text.H1)`
  ${fl_visuallyHidden}
`;

const About = () => {
  return (
    <>
      <Helmet>
        <title>About - Bureau Of Indian Affairs Photography Finding Aid</title>
        {/* <meta name="description" content={content.topics.intro}></meta> */}
        <meta name="" content="" />
        <meta name="twitter:title" content="About - Bureau Of Indian Affairs Photography Finding Aid" />
        <meta name="twitter:site" content="@FIXME" />
        <meta name="twitter:card" content={'FIXME'} />
        <meta name="twitter:description" content={'FIXME'} />
        <meta name="twitter:image" content={'FIXME'} />
        <meta property="og:title" content="About - Bureau Of Indian Affairs Photography Finding Aid" />
        <meta name="og:description" content={'FIXME'} />
        <meta property="og:site_name" content="FIXME" />
        <meta property="og:url" content={window.location} />
        <meta property="og:type" content="article" />
        <meta property="og:image" content={'FIXME'} />
      </Helmet>
      <PageTitle>About</PageTitle>

      {content.about.billboards.map((billboard, index) => (
        <Billboard
          key={`billboard-${index}`}
          alignment={getAlignment(index)}
          superTitle={billboard.superTitle}
          title={billboard.title}
          intro={billboard.intro}
          introIcon={billboard.introIcon || null}
          imageUrl={billboard.imageUrl}
        />
      ))}
      <Layout.Padding style={{ marginTop: '3rem', marginBottom: '4rem' }}>
        <Layout.Wrapper medium>
          <Text.Rich>{ReactHtmlParser(aboutText, {})}</Text.Rich>
        </Layout.Wrapper>
      </Layout.Padding>
    </>
  );
};

export default About;
