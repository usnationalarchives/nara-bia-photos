import crossfilter from "crossfilter2";
import data from "../data/records.csv";

const records = crossfilter(data);

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

const recordsByCreatingOrg = records.dimension((d) => {
  return d.creatingOrg;
});

const creatingOrgs = recordsByCreatingOrg.group().all();
const locations = recordsByLocation.group().all();

export {
  records,
  recordsByNaId,
  recordsByLocation,
  recordsByTitle,
  recordsByParentSeriesNaId,
  recordsByCreatingOrg,
  creatingOrgs,
  locations,
};
