import React from 'react';

import * as Layout from '#components/shared/Layout';
import * as Text from '#components/shared/Text';

const About = () => {
  return (
    <Layout.Padding style={{ marginTop: '1rem', marginBottom: '2rem' }}>
      <Layout.Wrapper>
        <Text.Rich>
          <Text.H1>About</Text.H1>
        </Text.Rich>
      </Layout.Wrapper>
    </Layout.Padding>
  );
};

export default About;
