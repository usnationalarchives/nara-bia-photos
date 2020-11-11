import React from 'react';
import * as Text from '#components/shared/Text';
import * as Layout from '#components/shared/Layout';
import { Link } from 'react-router-dom';

const Error404 = () => {
  return (
    <Layout.Padding style={{ marginTop: '2rem', marginBottom: '3rem' }}>
      <Layout.Wrapper>
        <div style={{ minHeight: '50vh', display: 'flex', alignItems: 'center' }}>
          <div>
            <Text.H1>Error 404</Text.H1>
            <p style={{ marginTop: '20px' }}>
              This page could not be found. Try a search for photographs <Link to="/search">here</Link> or return to the
              Finding Aid <Link to="/">homepage</Link>
            </p>
          </div>
        </div>
      </Layout.Wrapper>
    </Layout.Padding>
  );
};

export default Error404;
