const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const uuidv1 = require('uuid').v1;

const dataMap = require('./dataMap');

const mapRow = result => {
  return {
    searchUUID: uuidv1(),
    naId: dataMap.naId(result),
    name: dataMap.name(result),
    variantNames: dataMap.variantNames(result),
    slug: dataMap.slug(result),
  };
};

module.exports = {
  writer: (options = {}) => {
    return createCsvWriter({
      path: 'src/data/tribalNations.csv',
      header: [
        { id: 'searchUUID', title: 'searchUUID' },
        { id: 'naId', title: 'naId' },
        { id: 'name', title: 'name' },
        { id: 'variantNames', title: 'variantNames' },
        { id: 'slug', title: 'slug' },
      ],
      append: options.append || false,
    });
  },

  mapRows: apiResults => {
    return apiResults.map(result => mapRow(result));
  },
};
