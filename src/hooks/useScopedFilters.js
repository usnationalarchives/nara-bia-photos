import crossfilter from 'crossfilter2';

import data from '#data/records.csv';

import { topics, states, tribalNations } from '#modules/constants';

// create a crossfilter
const records = crossfilter(data);

// setup dimensions
const recordsByTag = records.dimension(d => {
  return (d.tags || '').split('||');
}, true);

const recordsByTribe = records.dimension(d => {
  return (d.tribes || '').split('||');
}, true);

const recordsByState = records.dimension(d => {
  return (d.states || '').split('||');
}, true);

const useScopedFilters = (term, type, filters) => {
  let dimension;
  let permitted;

  switch (type) {
    case 'topic':
      recordsByTag.filter(term);
      break;
    case 'tribe':
      recordsByTribe.filter(term);
      break;
    case 'state':
      recordsByState.filter(term);
      break;
    default:
      break;
  }

  switch (filters) {
    case 'topics':
      dimension = recordsByTag;
      permitted = topics;
      break;
    case 'tribes':
      dimension = recordsByTribe;
      permitted = tribalNations;
      break;
    case 'states':
      dimension = recordsByState;
      permitted = states;
      break;
    default:
      break;
  }

  const allItems = dimension
    .group()
    .all()
    .filter(i => i.key && i.value !== 0 && permitted.map(p => p.name).includes(i.key));

  dimension.dispose();

  return allItems;
};

export default useScopedFilters;
