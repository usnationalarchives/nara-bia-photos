import React from 'react';

import {Padding, Wrapper, Center} from '#components/shared/Layout';

const PageLoader = () => {
  return (
    <Padding style={{ marginTop: '1rem', marginBottom: '2rem' }}>
      <Wrapper>Loading...</Wrapper>
    </Padding>
  );
};

export default PageLoader;
