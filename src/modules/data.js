import crossfilter from "crossfilter2";
import elasticlunr from "elasticlunr";

import data from "../data/records.csv";

// Set up a crossfilter with all records
const records = crossfilter(data);

// setup dimensions for filtering records by individual properties
const recordsByNaId = records.dimension((d) => {
  return d.naId;
});
const recordsByLocation = records.dimension((d) => {
  return d.location;
});
const recordsByTitle = records.dimension((d) => {
  return d.title;
});
const recordsByParentSeriesNaId = records.dimension((d) => {
  return d.parentSeriesNaid;
});
const recordsByParentSeriesTitle = records.dimension((d) => {
  return d.parentSeriesTitle;
});
const recordsByCreatingOrg = records.dimension((d) => {
  return d.creatingOrg;
});
const recordsByAspectRatio = records.dimension((d) => {
  return d.aspectRatio;
});

const dimensions = {
  recordsByNaId,
  recordsByLocation,
  recordsByTitle,
  recordsByParentSeriesTitle,
  recordsByParentSeriesNaId,
  recordsByCreatingOrg,
  recordsByAspectRatio,
};

// Setup groups for each dimension, this creates a list of all values in the
// respective fields
const creatingOrgs = recordsByCreatingOrg.group().all();
const locations = recordsByLocation.group().all();
const parentSeriesTitles = recordsByParentSeriesTitle.group().all();

const groups = {
  creatingOrgs,
  locations,
  parentSeriesTitles,
};

// Filter results by column on a single value
const filterByValue = (dimension, value) => {
  if (dimension.hasCurrentFilter()) {
    dimension.dispose();
  }

  if (value) {
    dimension.filter(value);
  }
};

// Filter results by column on multiple values
const filterByValues = (dimension, values) => {
  if (dimension.hasCurrentFilter()) {
    dimension.dispose();
  }

  if (values) {
    dimension.filterFunction((d) => {
      return values.includes(d);
    });
  }
};

const filterByRange = (dimension, range) => {
  if (dimension.hasCurrentFilter()) {
    dimension.dispose();
  }

  if (range) {
    dimension.filterRange(range);
  }
};

// Define and create a search index using elasticlunr
const index = elasticlunr(function () {
  this.setRef("naId");
  this.addField("title");
  this.addField("parentSeriesTitle");
  this.addField("creatingOrg");

  data.forEach((doc) => {
    this.addDoc(doc);
  });
});

const search = (query) => {
  if (query) {
    const searchResults = index.search(query);
    const searchResultNaIds = searchResults.map((result) =>
      parseInt(result.ref)
    );

    filterByValues(recordsByNaId, searchResultNaIds);
  }
};

const actions = {
  search,
  filterByValue,
  filterByValues,
  filterByRange,
};

export { records, dimensions, groups, actions };
