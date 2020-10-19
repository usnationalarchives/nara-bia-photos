import elasticlunr from 'elasticlunr';

import data from '../data/records.json';

// Define and create a search index using elasticlunr
const index = elasticlunr(function () {
  this.setRef('searchUUID');
  this.addField('title');
  this.addField('parentSeriesTitle');
  this.addField('creatingOrg');

  data.forEach(doc => {
    this.addDoc(doc);
  });
});

const fullTextSearch = query => {
  if (query) {
    const searchResults = index.search(query, {
      bool: 'OR',
      expand: true,
    });
    const searchResultUUIDs = searchResults.map(result => result.ref);

    return searchResultUUIDs;
  }
};

export default fullTextSearch;
