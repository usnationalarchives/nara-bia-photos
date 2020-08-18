import React from 'react';
import PropTypes from 'prop-types';

// components
import Results from '#components/shared/Results';

// hooks
import useRecords from '#hooks/useRecords';

// modules
import { tribalNationThumbnails } from '#modules/constants';

const TribeThumbnails = ({ letter }) => {
  const naIds = tribalNationThumbnails[letter.toLowerCase()];

  const [results] = useRecords({
    facets: {
      naIds: naIds,
    },
  });

  return <Results singleRow data={results} fidelity={250} />;
};

TribeThumbnails.propTypes = {
  letter: PropTypes.string.isRequired,
};

export default TribeThumbnails;
