const recordsCsv = require('./records/csv');
const recordsApi = require('./records/api');

const tribalNationsCsv = require('./tribalNations/csv');
const tribalNationsApi = require('./tribalNations/api');

const createRecordsCsv = async () => {
  // Set the initial cursorMark
  let nextCursorMark = '*';

  do {
    let response;

    try {
      // fetch a page of results from the api
      response = await recordsApi.fetchPage({ cursorMark: nextCursorMark });
    } catch (error) {
      console.log(error);
    }

    if (response) {
      const apiResults = response.data.opaResponse.results.result, // pull out results from the response
        rows = recordsCsv.mapRows(apiResults), // map the results to CSV rows
        append = nextCursorMark !== '*'; // append unless this is the first page

      recordsCsv.writer({ append: append }).writeRecords(rows); // write out to the csv
      nextCursorMark = response.data.opaResponse.results.nextCursorMark; // update the cursor mark
    }
  } while (typeof nextCursorMark !== 'undefined');
};

const addRecordsFromFileUnits = async () => {
  // Set the initial cursorMark
  let nextCursorMark = '*';

  do {
    let response;

    try {
      // fetch a page of results from the api
      response = await recordsApi.fetchFileUnitsPage({ cursorMark: nextCursorMark });
    } catch (error) {
      console.log(error);
    }

    if (response) {
      const apiResults = response.data.opaResponse.results.result, // pull out results from the response
        rows = recordsCsv.mapRows(apiResults); // map the results to CSV rows

      recordsCsv.writer({ append: true }).writeRecords(rows); // write out to the csv
      nextCursorMark = response.data.opaResponse.results.nextCursorMark; // update the cursor mark
    }
  } while (typeof nextCursorMark !== 'undefined');
};

const createTribalNationsCsv = async () => {
  let response;

  try {
    // fetch all the tribal nation authority records
    response = await tribalNationsApi.fetchAll();
  } catch (error) {
    console.log(error);
  }

  if (response) {
    const apiResults = response.data.opaResponse.results.result,
      rows = tribalNationsCsv.mapRows(apiResults);

    tribalNationsCsv.writer().writeRecords(rows);
  }
};

const run = async () => {
  await createRecordsCsv();
  await addRecordsFromFileUnits();
  await createTribalNationsCsv();
};

run();
