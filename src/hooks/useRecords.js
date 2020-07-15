import { useState, useEffect } from "react";
import { records, dimensions, actions } from "../modules/data";

/**
 * This is a React hook used to interface with the records in the finding aid.
 *
 * @param {*} [options={}]
 * @returns {Object[]} // returns an array of result objects
 *
 * @example
 * const { results, totalCount } = useRecords({
 *   facets: {
 *     naIds: [1, 2, 3],
 *     location: "A Location",
 *     creatingOrg: "A creating organization",
 *     parentSeriesTitle: "A parent series title",
 *     apsectRatioRange: [0.9, 1.1],
 *     searchUUIDs: []
 *   }
 * })
 */
const useRecords = (options = {}) => {
  const serializedOptions = JSON.stringify(options);

  const [results, setResults] = useState([]);
  const [totalCount, setTotalCount] = useState(0);

  const { facets } = options;
  // We arent using filterByValue yet, disable the warning
  // eslint-disable-next-line
  const { filterByValue, filterByValues, filterByRange } = actions;
  const {
    recordsByNaId,
    recordsBySearchUUID,
    recordsByAspectRatio,
    recordsByTag,
    recordsByTribe,
  } = dimensions;

  useEffect(() => {
    if (facets) {
      // Apply filters from incoming facets
      filterByValues(recordsByNaId, facets.naIds);
      filterByValues(recordsBySearchUUID, facets.searchUUIDs);
      filterByValues(recordsByTag, facets.topics);
      filterByValues(recordsByTribe, facets.tribes);
      filterByRange(recordsByAspectRatio, facets.aspectRatioRange);
    }

    // Get the filtered records
    setResults(records.allFiltered());
    setTotalCount(records.size());

    // We are only looking for changes to the serialized options string to re-run.
    // Ignore other dependencies
    // eslint-disable-next-line
  }, [serializedOptions]);

  return { results, totalCount };
};

export default useRecords;
