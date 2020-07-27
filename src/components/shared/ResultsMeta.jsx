import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const MetaStyles = styled.div`
  display: block;
  text-transform: uppercase;
`;

const ResultsMeta = ({ count, page, total }) => {
  return (
    <MetaStyles
      aria-label={`Showing ${(page - 1) * 30 + 1} - ${
        (page - 1) * 30 + count
      } of ${total} results`}
    >
      <p>
        Showing {(page - 1) * 30 + 1} - {(page - 1) * 30 + count} of {total}{' '}
        results
      </p>
    </MetaStyles>
  );
};

ResultsMeta.propTypes = {
  count: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
};

export default ResultsMeta;
