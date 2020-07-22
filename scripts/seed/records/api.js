const axios = require("axios");

const config = {
  endpoint: "https://catalog.archives.gov/api/v1",
  params: {
    "description.item.parentSeries.parentRecordGroup.naId": 404,
    "description.item.generalRecordsTypeArray.generalRecordsType.naId": 10035674,
    exists: "objects",
    resultTypes: "item",
    rows: 100,
    sort: "naId asc",
  },
};

module.exports = {
  fetchPage: async (options = {}) => {
    const cursorMark = options.cursorMark || "*";
    let response;

    try {
      response = await axios.get(config.endpoint, {
        params: { cursorMark, ...config.params },
      });
    } catch (error) {
      return error;
    }

    return response;
  },
};
