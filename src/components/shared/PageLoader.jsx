import React from 'react';

import * as Layout from '#components/shared/Layout';

const PageLoader = () => {
  return (
    <Layout.Padding style={{ marginTop: '1rem', marginBottom: '2rem' }}>
      <Layout.Wrapper>Loading...</Layout.Wrapper>
    </Layout.Padding>
  );
};

export default PageLoader;
