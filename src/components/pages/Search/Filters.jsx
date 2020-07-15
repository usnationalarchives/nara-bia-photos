import React, { Fragment } from "react";

// components
import FilterCheckboxes from "./FilterCheckboxes";
import SelectedTerm from "./SelectedTerm";

// modules
import { groups } from "#modules/data";

// pluck tribes from group keys, remove empty strings
const tribeNames = groups.tribes.map((t) => t.key).filter((t) => Boolean(t));

const Filters = ({ topics, tribes, dispatchTopics, dispatchTribes }) => {
  return (
    <Fragment>
      <div style={{ display: "flex" }}>
        <div style={{ width: "50%" }}>
          <FilterCheckboxes
            label="Topics"
            allItems={groups.topics}
            activeItems={topics}
            dispatchItems={dispatchTopics}
          />
        </div>

        <div style={{ width: "50%" }}>
          <FilterCheckboxes
            label="Tribes"
            allItems={tribeNames}
            activeItems={tribes}
            dispatchItems={dispatchTribes}
          />
        </div>
      </div>

      {(topics.length > 0 || tribes.length > 0) && (
        <ul style={{ marginBottom: "1.25rem" }}>
          {topics.map((topic) => (
            <li key={topic}>
              <SelectedTerm dispatchItems={dispatchTopics} value={topic} />
            </li>
          ))}
          {tribes.map((tribe) => (
            <li key={tribe}>
              <SelectedTerm dispatchItems={dispatchTribes} value={tribe} />
            </li>
          ))}
        </ul>
      )}
    </Fragment>
  );
};

export default Filters;
