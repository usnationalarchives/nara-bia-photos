import React, { Fragment, useState, useRef } from 'react';
import styled from 'styled-components';
import { debounce } from 'lodash';
import elasticlunr from 'elasticlunr';
import Popover from 'react-tiny-popover';

// componnts
import * as Input from '#components/shared/Input';
import * as Text from '#components/shared/Text';
import PopoverNav from '#components/shared/PopoverNav';
import Button from '#components/shared/Button';
import { ReactComponent as SearchIcon } from '#assets/icons/search.svg';

const Label = styled.label`
  color: ${props => props.theme.colors.white};
  display: inline-block;
  margin-bottom: 1.5rem;
`;

const StyledButton = styled(Button)`
  height: 40px;
  padding: 0;
  position: absolute;
  right: 1px;
  top: 1px;
  width: 40px;
`;

const TribeSearch = ({ tribalNations }) => {
  const popoverEl = useRef();
  const [query, setQuery] = useState();
  const [results, setResults] = useState([]);

  // create a search index
  const index = elasticlunr(function () {
    this.setRef('searchUUID');
    this.addField('name');
    this.addField('naId');

    tribalNations.forEach(doc => {
      this.addDoc(doc);
    });
  });

  const handleSearch = debounce(value => {
    setQuery(value);
    const search = index.search(value, {
      bool: 'OR',
      expand: true,
    });
    const resultUUIDs = search.map(result => result.ref);

    const searchResults = tribalNations.filter(tribalNation => resultUUIDs.includes(tribalNation.searchUUID));

    setResults(searchResults);
  }, 300);

  const resetSearch = () => {
    setQuery('');
  };

  return (
    <Fragment>
      <Label htmlFor="tribalNationQuery">Search for a specific Tribal Nation</Label>
      <div>
        <Popover
          isOpen={query}
          disableReposition
          onClickOutside={resetSearch}
          contentLocation={{ top: 50, left: 0 }}
          content={<PopoverNav items={results} slugPrefix="tribal-nations" />}
          contentDestination={popoverEl.current}
          containerStyle={{ overflow: 'visible' }}
        >
          <div style={{ position: 'relative', display: 'inline-block' }}>
            <Input.Text
              id="tribalNationQuery"
              autoComplete="off"
              defaultValue={query}
              placeholder="Enter a name"
              onChange={event => handleSearch(event.target.value)}
              onFocus={event => handleSearch(event.target.value)}
            />
            <StyledButton type="submit" scheme={'green'}>
              <SearchIcon width="20" fill="currentColor" />
              <Text.Screenreader>Search</Text.Screenreader>
            </StyledButton>

            <div ref={popoverEl}></div>
          </div>
        </Popover>
      </div>
    </Fragment>
  );
};

export default TribeSearch;
