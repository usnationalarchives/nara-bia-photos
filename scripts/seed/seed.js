const csv = require("./csv");
const api = require("./api");

const createCsv = async () => {
  // Set the initial cursorMark
  let nextCursorMark = "*";

  do {
    let response;

    try {
      // fetch a page of results from the api
      response = await api.fetchPage({ cursorMark: nextCursorMark });
    } catch (error) {
      console.log(error);
    }

    if (response) {
      const apiResults = response.data.opaResponse.results.result, // pull out results from the response
        rows = csv.mapRows(apiResults), // map the results to CSV rows
        append = nextCursorMark !== "*"; // append unless this is the first page

      csv.writer({ append: append }).writeRecords(rows); // write out to the csv
      nextCursorMark = response.data.opaResponse.results.nextCursorMark; // update the cursor mark
    }
  } while (typeof nextCursorMark !== "undefined");
};

createCsv();
