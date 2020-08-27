import React, { createContext } from 'react';
import useRecords from '#hooks/useRecords';

import { states } from '#modules/constants';

const StateThumbnailContext = createContext();

const thumbnailNaIds = states.map(t => t.thumbnailNaId);

const StateThumbnailProvider = ({ children }) => {
  const [results] = useRecords({
    facets: {
      naIds: thumbnailNaIds,
    },
  });

  return (
    <StateThumbnailContext.Provider
      value={{
        state: {
          thumbnailNaIds: results,
        },
      }}
    >
      {children}
    </StateThumbnailContext.Provider>
  );
};

const withStateThumbnails = Component => {
  return props => {
    return (
      <StateThumbnailContext.Consumer>
        {({ state }) => {
          return <Component {...props} stateThumbnailContext={{ state }}></Component>;
        }}
      </StateThumbnailContext.Consumer>
    );
  };
};

export { StateThumbnailContext, StateThumbnailProvider, withStateThumbnails };
