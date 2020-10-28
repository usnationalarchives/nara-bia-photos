import { useState, useEffect } from 'react';
import { records, dimensions, groups, actions } from '../modules/data';

/**
 * This is a React hook used to interface with the records in the finding aid.
 *
 * @param {*} [options={}]
 * @returns {Object[]} // returns an array of result objects
 *
 * @example
 * const { results, totalCount } = useRecords({
 *   purgeDimensions: true,
 *   facets: {
 *     naIds: [1, 2, 3],
 *     location: "A Location",
 *     creatingOrg: "A creating organization",
 *     parentSeriesTitle: "A parent series title",
 *     parentSeriesNaId: 298560,
 *     apsectRatioRange: [0.9, 1.1],
 *     searchUUIDs: []
 *   }
 * })
 */
const useRecords = (options = {}) => {
  const serializedOptions = JSON.stringify(options);
  const [results, setResults] = useState([]);
  const [finishedQuery, setFinishedQuery] = useState(false);
  const { facets = {} } = options;

  // Purge the current applied dimensions
  // Used for views with subsequent useRecord hook calls
  if (options.purgeDimensions) {
    actions.disposeAllDimensions();
  }

  const { filterByValues, filterByRange, filterByExact } = actions;
  const {
    recordsByNaId,
    recordsBySearchUUID,
    recordsByAspectRatio,
    recordsByTag,
    recordsByTribe,
    recordsByState,
    recordsByParentSeriesTitle,
    recordsByParentSeriesNaId,
  } = dimensions;

  const hasActiveFilters =
    recordsByNaId.hasCurrentFilter() ||
    recordsBySearchUUID.hasCurrentFilter() ||
    recordsByAspectRatio.hasCurrentFilter() ||
    recordsByTag.hasCurrentFilter() ||
    recordsByTribe.hasCurrentFilter() ||
    recordsByState.hasCurrentFilter() ||
    recordsByParentSeriesTitle.hasCurrentFilter() ||
    recordsByParentSeriesNaId.hasCurrentFilter();

  useEffect(() => {
    // Apply filters from incoming facets
    filterByValues(recordsByNaId, facets.naIds);
    filterByValues(recordsBySearchUUID, facets.searchUUIDs);
    filterByValues(recordsByTag, facets.topics);
    filterByValues(recordsByTribe, facets.tribes);
    filterByValues(recordsByState, facets.states);
    filterByExact(recordsByParentSeriesTitle, facets.parentSeriesTitle);
    filterByExact(recordsByParentSeriesNaId, facets.parentSeriesNaId);
    filterByRange(recordsByAspectRatio, facets.aspectRatioRange);

    setResults(records.allFiltered());

    // dispose all filters when unmounting
    return () => {
      recordsByNaId.dispose();
      recordsBySearchUUID.dispose();
      recordsByAspectRatio.dispose();
      recordsByTag.dispose();
      recordsByTribe.dispose();
      recordsByState.dispose();
      recordsByParentSeriesTitle.dispose();
      recordsByParentSeriesNaId.dispose();
    };

    // We are only looking for changes to the serialized options string to re-run.
    // Ignore other dependencies
    // eslint-disable-next-line
  }, [serializedOptions]);

  useEffect(() => {
    setFinishedQuery(true);
  }, [results]);

  return [results, dimensions, hasActiveFilters, actions, groups, finishedQuery];
};

export default useRecords;
