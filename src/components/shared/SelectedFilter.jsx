import React from "react";

const SelectedFilter = ({ dispatchItems, value }) => {
  return (
    <button onClick={() => dispatchItems({ type: "remove", value: value })}>
      {value} X
    </button>
  );
};

export default SelectedFilter;
