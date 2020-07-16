const createCsvWriter = require("csv-writer").createObjectCsvWriter;
const uuidv1 = require("uuid").v1;

const dataMap = require("./dataMap");

const mapRow = (result) => {
  return {
    searchUUID: uuidv1(),
    naId: dataMap.naId(result),
    location: dataMap.location(result),
    title: dataMap.title(result),
    parentSeriesNaId: dataMap.parentSeriesNaId(result),
    parentSeriesTitle: dataMap.parentSeriesTitle(result),
    thumbnailUrl: dataMap.thumbnailUrl(result),
    imageTilesUrl: dataMap.imageTilesUrl(result),
    originalUrl: dataMap.originalUrl(result),
    creatingOrg: dataMap.creatingOrg(result),
    aspectRatio: dataMap.aspectRatio(result),
    tags: dataMap.tags(result),
    tribes: dataMap.tribes(result),
    states: dataMap.states(result),
    slug: dataMap.slug(result),
  };
};

module.exports = {
  writer: (options = {}) => {
    return createCsvWriter({
      path: "src/data/records.csv",
      header: [
        { id: "searchUUID", title: "searchUUID" },
        { id: "naId", title: "naId" },
        { id: "location", title: "location" },
        { id: "title", title: "title" },
        { id: "parentSeriesNaId", title: "parentSeriesNaId" },
        { id: "parentSeriesTitle", title: "parentSeriesTitle" },
        { id: "thumbnailUrl", title: "thumbnailUrl" },
        { id: "imageTilesUrl", title: "imageTilesUrl" },
        { id: "originalUrl", title: "originalUrl" },
        { id: "creatingOrg", title: "creatingOrg" },
        { id: "aspectRatio", title: "aspectRatio" },
        { id: "tags", title: "tags" },
        { id: "tribes", title: "tribes" },
        { id: "states", title: "states" },
        { id: "slug", title: "slug" },
      ],
      append: options.append || false,
    });
  },

  mapRows: (apiResults) => {
    return apiResults.map((result) => mapRow(result));
  },
};
