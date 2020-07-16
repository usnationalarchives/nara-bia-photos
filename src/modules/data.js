import crossfilter from "crossfilter2";

import data from "../data/records.csv";

// Set up a crossfilter with all records
const records = crossfilter(data);

// setup dimensions for filtering records by individual properties
const recordsBySearchUUID = records.dimension((d) => {
  return d.searchUUID;
});
const recordsByNaId = records.dimension((d) => {
  return d.naId;
});
const recordsByAspectRatio = records.dimension((d) => {
  return d.aspectRatio;
});
const recordsByTag = records.dimension((d) => {
  return (d.tags || "").split("||");
}, true);
const recordsByTribe = records.dimension((d) => {
  return (d.tribes || "").split("||");
}, true);
const recordsByState = records.dimension((d) => {
  return (d.states || "").split("||");
}, true);

const dimensions = {
  recordsBySearchUUID,
  recordsByNaId,
  recordsByAspectRatio,
  recordsByTag,
  recordsByTribe,
  recordsByState,
};

// Setup groups for each dimension, this creates a list of all values in the
// respective fields
const tribes = recordsByTribe.group().all();

const topics = [
  "Agriculture",
  "Animals",
  "Artistry and Artifacts",
  "Buildings",
  "Bureau Personnel",
  "Camps",
  "Children",
  "Dances",
  "Dress",
  "Dwellings",
  "Farming",
  "Fishing",
  "Food Preparation",
  "Games and Recreation",
  "Groups",
  "Hunting",
  "Landscapes",
  "Leaders",
  "Military Service",
  "Portraits",
  "Reservations",
  "Schools",
  "Transportation",
  "Tribal Councils",
  "Villages",
];

const groups = {
  topics,
  tribes,
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

  if (values && values.length > 0) {
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

const actions = {
  filterByValue,
  filterByValues,
  filterByRange,
};

export { records, dimensions, groups, actions };
