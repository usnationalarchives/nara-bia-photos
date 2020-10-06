import { topics, states } from '#modules/constants';

export const alphabet = () => {
  let list = [];

  for (let i = 0; i < 26; i++) {
    list.push((i + 10).toString(36));
  }

  return list;
};

export const groupObjectsByNameLetter = items => {
  let grouped = {};

  items.map(item => {
    let firstLetter = item.name.charAt(0);

    if (typeof grouped[firstLetter] === 'undefined') {
      grouped[firstLetter] = [];
    }

    return grouped[firstLetter].push(item);
  });

  // create a new object sorted alphabetically
  let sorted = {};

  Object.keys(grouped)
    .sort()
    .forEach(letter => {
      sorted[letter] = grouped[letter];
    });

  return sorted;
};

export const getObjectCount = items => {
  let count = 0;
  items.forEach(item => {
    if (item.objects) {
      count++;
    }
  });
  return count;
};

/**
 * Get Record topics
 * Search the `||` seperated topics tag list for a topic listed in constants
 * @param {string} topicsList - example "bisfis-0759||nwfh20||montana||Native American genealogy"
 * @returns {array} filteredTopics - filtered list of topic constants
 */
export const getRecordTopics = (topicsList = '') => {
  let filteredTopics;
  if (!topicsList) {
    filteredTopics = [];
  } else {
    filteredTopics = topics.filter(topic => {
      return topicsList.indexOf(topic.name) >= 0;
    });
  }
  return filteredTopics;
};

/**
 * State object constant type definitnion
 * @typedef {Object} State
 * @property {string} name
 * @property {string} slug - url path an param reference
 * @property {string} region - with which the state is included
 * @property {string} val - cooresponding with GeoJSON data file
 * @property {number} thumbnailNaId
 */

/**
 * Get Record State
 * Collects state constant values based on a passed record `states` string value
 * @param {string} statesVal - `||` seperated list of states
 * @returns {Array.State} - array of state
 */
export const getRecordStates = statesVal => {
  let statesArray = [];
  try {
    statesArray = statesVal.split('||');
  } catch (err) {
    console.warn('function getRecordStates expects a `||` separated string to be passed for parsing');
  }
  return states.filter(state => statesArray.includes(state.name));
};

// helper function for serializing parameters
// returns format: foo[0]=bar&foo[1]=baz
export const joinParams = (label, values) => {
  return values.map((value, i) => `${label}[${i}]=${value}`).join('&');
};

/**
 * States by Region
 * Return a subset of objects based on their `region` property
 * @param {array} states array of state objects
 * @param {string} region slug
 * @returns {array} states filtered list
 */
export const statesByRegion = (states, region) => {
  return states.filter(state => state.region === region);
};
