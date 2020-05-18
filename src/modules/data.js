import crossfilter from "crossfilter2";
import elasticlunr from "elasticlunr";

import data from "../data/records.csv";

const records = crossfilter(data);

const index = elasticlunr(function () {
  this.setRef("naId");
  this.addField("title");
  this.addField("parentSeriesTitle");
  this.addField("creatingOrg");
});
data.forEach((doc) => {
  index.addDoc(doc);
}, this);

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
