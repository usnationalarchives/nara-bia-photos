import React, { Fragment } from "react";

// components
import FilterCheckboxes from "./FilterCheckboxes";
import SelectedTerm from "./SelectedTerm";

// modules
import { groups } from "#modules/data";
import { states, topics } from "#modules/constants";

const tribeNames = groups.tribes.map((t) => t.key).filter((t) => Boolean(t));
const stateNames = states.map((state) => state.name);
const topicNames = topics.map((topic) => topic.name);

const Filters = ({
  topics,
  tribes,
  states,
  dispatchTopics,
  dispatchTribes,
  dispatchStates,
}) => {
  return (
    <Fragment>
      <div style={{ display: "flex" }}>
        <div>
          <FilterCheckboxes
            label="Topics"
            allItems={topicNames}
            activeItems={topics}
            dispatchItems={dispatchTopics}
          />
        </div>

        <div>
          <FilterCheckboxes
            label="Tribes"
            allItems={tribeNames}
            activeItems={tribes}
            dispatchItems={dispatchTribes}
          />
        </div>

        <div>
          <FilterCheckboxes
            label="States"
            allItems={stateNames}
            activeItems={states}
            dispatchItems={dispatchStates}
          />
        </div>
      </div>

      {(topics.length > 0 || tribes.length > 0 || states.length > 0) && (
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
          {states.map((state) => (
            <li key={state}>
              <SelectedTerm dispatchItems={dispatchStates} value={state} />
            </li>
          ))}
        </ul>
      )}
    </Fragment>
  );
};

export default Filters;
