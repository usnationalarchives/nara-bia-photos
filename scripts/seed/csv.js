const createCsvWriter = require("csv-writer").createObjectCsvWriter;

const dataMap = require("./dataMap");

const mapRow = (result) => {
  return {
    naId: dataMap.naId(result),
    location: dataMap.location(result),
    title: dataMap.title(result),
    parentSeriesNaId: dataMap.parentSeriesNaId(result),
    parentSeriesTitle: dataMap.parentSeriesTitle(result),
    thumbnailUrl: dataMap.thumbnailUrl(result),
    creatingOrg: dataMap.creatingOrg(result),
  };
};

module.exports = {
  writer: (options = {}) => {
    return createCsvWriter({
      path: "src/data/records.csv",
      header: [
        { id: "naId", title: "naId" },
        { id: "location", title: "location" },
        { id: "title", title: "title" },
        { id: "parentSeriesNaId", title: "parentSeriesNaId" },
        { id: "parentSeriesTitle", title: "parentSeriesTitle" },
        { id: "thumbnailUrl", title: "thumbnailUrl" },
        { id: "creatingOrg", title: "creatingOrg" },
      ],
      append: options.append || false,
    });
  },

  mapRows: (apiResults) => {
    return apiResults.map((result) => mapRow(result));
  },
};
