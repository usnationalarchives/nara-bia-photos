const axios = require("axios");
const csv = require("./csv");

const createCsv = async () => {
  const apiUrl = "https://catalog.archives.gov/api/v1",
    params = {
      "description.item.parentSeries.parentRecordGroup.naId": 404,
      "description.item.generalRecordsTypeArray.generalRecordsType.naId": 10035674,
      exists: "objects",
      resultTypes: "item",
      rows: 5000,
      sort: "naId asc",
    };

  let nextCursorMark = "*";

  do {
    console.log(`Fetching with cursor mark: ${nextCursorMark}`);

    await axios
      .get(apiUrl, {
        params: { cursorMark: nextCursorMark, ...params },
      })
      .then((response) => {
        const apiResults = response.data.opaResponse.results.result,
          rows = csv.mapRows(apiResults),
          append = nextCursorMark !== "*";

        csv.writer({ append: append }).writeRecords(rows);
        nextCursorMark = response.data.opaResponse.results.nextCursorMark;
      })
      .catch((error) => {
        console.log(error);
      });
  } while (typeof nextCursorMark !== "undefined");
};

createCsv();
