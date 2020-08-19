import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { joinParams } from '#modules/helpers';

/**
 * A custom react hoook for managing the router history when applying filters.
 * This is useful for bookmarking searches and navigating back to filtered
 * results. NOTE that all default state must be derived from the params
 * manually on a per-component basis. This hook only abstracts the browser
 * history.
 *
 * usage:
 *
 * useSearchHistory({
 *   query: mySearchQuery,
 *   filters: [
 *     { label: "filter1", values: myfilter1ActiveValues },
 *     { label: "filter2", values: myfilter2ActiveValues }
 *   ]
 * })
 *
 * @param {*} [options={}]
 */
const useSearchHistory = (options = {}) => {
  const serializedOptions = JSON.stringify(options);
  const { filters, query } = options;
  const history = useHistory();

  useEffect(() => {
    let params;

    // combine the params into a single array, remove any null/empty params
    params = filters
      .map(filter => {
        return joinParams(filter.label, filter.values);
      })
      .filter(Boolean);

    // add a q params if there is a search query
    if (options.query) {
      params.unshift(`q=${query}`);
    }

    // join the params into a valid search string
    const searchString = '?' + params.join('&');

    // push the new search url to the history
    history.replace(searchString);

    //eslint-disable-next-line
  }, [serializedOptions]);
};

export default useSearchHistory;
