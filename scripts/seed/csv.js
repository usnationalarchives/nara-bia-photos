const trim = require("lodash").trim;
const createCsvWriter = require("csv-writer").createObjectCsvWriter;

const dataMapper = require("./dataMapper");

const mapRow = (result) => {
  return {
    naId: result.naId,
    location: trim(result.description.item.dataControlGroup.groupCd),
    title: trim(result.description.item.title),
    parentSeriesNaId: result.description.item.parentSeries.naId,
    parentSeriesTitle: trim(result.description.item.parentSeries.title),
    thumbnailUrl: dataMapper.thumbnailUrl(result.objects.object),
    creatingOrg: dataMapper.creatingOrg(
      result.description.item.parentSeries.creatingOrganizationArray
        .creatingOrganization
    ),
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
    return apiResults.map((result) => {
      return mapRow(result);
    });
  },
};
