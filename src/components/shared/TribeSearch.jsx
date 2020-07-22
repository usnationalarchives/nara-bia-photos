import React, { Fragment, useState } from "react";
import styled from "styled-components";
import { debounce } from "lodash";

// componnts
import * as Text from "#components/shared/Text";

const Label = styled.label`
  color: ${(props) => props.theme.colors.white};
  display: inline-block;
  margin-bottom: 1.5rem;
`;

const TribeSearch = () => {
  const [query, setQuery] = useState();

  const handleSearch = debounce((value) => {
    setQuery(value);
  });

  return (
    <Fragment>
      <Label htmlFor="tribalNationQuery">
        <Text.Label>Search for a specific Tribal Nation</Text.Label>
      </Label>
      <div>
        <input
          id="tribalNationQuery"
          type="text"
          onChange={(event) => handleSearch(event.target.value)}
        />
      </div>
    </Fragment>
  );
};

export default TribeSearch;
