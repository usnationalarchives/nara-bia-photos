import React, { Children } from 'react';
import { fl_visuallyHidden } from '#styles/frontline';
import styled, { css } from 'styled-components';

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

// const transform = (node, index) => {
//   console.log(node);
//   if (node.type === 'tag' && node.name === 'h2') {
//     const newNode = <Text.H2 key={`${node.name}-${index}`}>{node.children[0].data}</Text.H2>;
//     return newNode;
//   }
//   if (node.type === 'tag' && node.name === 'h3') {
//     const newNode = <Text.H3 key={`${node.name}-${index}`}>{node.children[0].data}</Text.H3>;
//     return newNode;
//   }
// };

const About = () => {
  return (
    <>
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
