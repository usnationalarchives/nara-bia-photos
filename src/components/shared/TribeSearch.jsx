import React, { Fragment, useState } from "react";
import styled from "styled-components";
import { debounce } from "lodash";
import elasticlunr from "elasticlunr";
import Popover from "react-tiny-popover";

// componnts
import PopoverNav from "#components/shared/PopoverNav";

const Label = styled.label`
  color: ${(props) => props.theme.colors.white};
  display: inline-block;
  margin-bottom: 1.5rem;
`;

const TribeSearch = ({ tribalNations }) => {
  const [query, setQuery] = useState();
  const [results, setResults] = useState([]);

  // create a search index
  const index = elasticlunr(function () {
    this.setRef("searchUUID");
    this.addField("name");
    this.addField("naId");

    tribalNations.forEach((doc) => {
      this.addDoc(doc);
    });
  });

  const handleSearch = debounce((value) => {
    setQuery(value);
    const search = index.search(value, {
      bool: "OR",
      expand: true,
    });
    const resultUUIDs = search.map((result) => result.ref);

    const searchResults = tribalNations.filter((tribalNation) =>
      resultUUIDs.includes(tribalNation.searchUUID)
    );

    setResults(searchResults);
  }, 300);

  const resetSearch = () => {
    setQuery("");
  };

  return (
    <Fragment>
      <Label htmlFor="tribalNationQuery">
        Search for a specific Tribal Nation
      </Label>
      <div>
        <Popover
          isOpen={query}
          align="start"
          disableReposition
          onClickOutside={resetSearch}
          position={["bottom", "left"]}
          content={<PopoverNav items={results} slugPrefix="tribal-nations" />}
          containerStyle={{ overflow: "visible" }}
        >
          <input
            id="tribalNationQuery"
            type="text"
            defaultValue={query}
            onChange={(event) => handleSearch(event.target.value)}
            onFocus={(event) => handleSearch(event.target.value)}
          />
        </Popover>
      </div>
    </Fragment>
  );
};

export default TribeSearch;
