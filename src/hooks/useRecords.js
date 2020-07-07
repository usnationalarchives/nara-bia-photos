import { useState, useEffect } from "react";

import { records, dimensions, actions } from "../modules/data";

const useRecords = (options = {}) => {
  const serializedOptions = JSON.stringify(options);

  const [results, setResults] = useState([]);
  const [totalCount, setTotalCount] = useState(0);

  const { facets, aspectRatioRange } = options;
  const { filterByValue, filterByValues, filterByRange } = actions;
  const {
    recordsByCreatingOrg,
    recordsByParentSeriesTitle,
    recordsByLocation,
    recordsByNaId,
    recordsBySearchUUID,
    recordsByAspectRatio,
  } = dimensions;

  useEffect(() => {
    if (facets) {
      // Apply filters from incoming facets
      filterByValue(recordsByCreatingOrg, facets.creatingOrg);
      filterByValue(recordsByParentSeriesTitle, facets.parentSeriesTitle);
      filterByValue(recordsByLocation, facets.location);
      filterByValues(recordsByNaId, facets.naIds);
      filterByValues(recordsBySearchUUID, facets.searchUUIDs);
    }

    if (aspectRatioRange) {
      filterByRange(recordsByAspectRatio, aspectRatioRange);
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
