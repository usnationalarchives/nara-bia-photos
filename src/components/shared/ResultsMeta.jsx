import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Screenreader from '#components/shared/Screenreader';

const MetaStyles = styled.div`
  display: block;
  display: block;
  text-transform: uppercase;
`;

const step = 30; // FIXME magic number, needs to be dynamic

const ResultsMeta = ({ count, page, total }) => {
  return (
    <MetaStyles
      aria-live="polite"
      aria-atomic="true"
      aria-label={`Showing ${(page - 1) * step + 1} through ${
        (page - 1) * step + count
      } of ${total} results`}
    >
      <span aria-hidden="true">
        Showing {(page - 1) * step + 1} - {(page - 1) * step + count} of {total}{' '}
        results
      </span>
    </MetaStyles>
  );
};

ResultsMeta.propTypes = {
  count: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
};

export default ResultsMeta;
