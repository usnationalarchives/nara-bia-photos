import crossfilter from "crossfilter2";
import elasticlunr from "elasticlunr";

import data from "../data/records.csv";

// Define and create a search index using elasticlunr
const index = elasticlunr(function () {
  this.setRef("naId");
  this.addField("title");
  this.addField("parentSeriesTitle");
  this.addField("creatingOrg");
});
data.forEach((doc) => {
  index.addDoc(doc);
}, this);

// Set up a crossfilter with all records
const records = crossfilter(data);

// setup dimensions for filtering records by attributes
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

// Setup groups for each dimension, this creates a list of all values in the
// respective fields
const creatingOrgs = recordsByCreatingOrg.group().all();
const locations = recordsByLocation.group().all();
const parentSeriesTitles = recordsByParentSeriesTitle.group().all();

export {
  records,
  index,
  recordsByNaId,
  recordsByLocation,
  recordsByTitle,
  recordsByParentSeriesNaId,
  recordsByParentSeriesTitle,
  recordsByCreatingOrg,
  creatingOrgs,
  locations,
  parentSeriesTitles,
};
