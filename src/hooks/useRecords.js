import {
  records,
  index,
  recordsByNaId,
  recordsByParentSeriesTitle,
  recordsByLocation,
  recordsByCreatingOrg,
} from "../modules/data";

const useRecords = (facets = {}, query = null) => {
  if (query) {
    const searchResults = index.search(query);
    const searchResultNaIds = searchResults.map((result) =>
      parseInt(result.ref)
    );

    recordsByNaId.filterFunction((d) => {
      return searchResultNaIds.includes(d);
    });
  } else {
    recordsByNaId.dispose();
  }

  // If there is a creating org, filter by it. otherwise, dispose of any existing filters
  facets.creatingOrg
    ? recordsByCreatingOrg.filter(facets.creatingOrg)
    : recordsByCreatingOrg.dispose();

  // If there is a parent series, filter by it. otherwise, dispose of any existing filters
  facets.parentSeriesTitle
    ? recordsByParentSeriesTitle.filter(facets.parentSeriesTitle)
    : recordsByParentSeriesTitle.dispose();

  // If there is a location, filter by it. otherwise, dispose of any existing filters
  facets.location
    ? recordsByLocation.filter(facets.location)
    : recordsByLocation.dispose();

  if (facets.naIds) {
    recordsByNaId.filterFunction((d) => {
      return facets.naIds.includes(d);
    });
  }

  const filteredRecords = records.allFiltered();

  return [records, filteredRecords];
};

export default useRecords;
