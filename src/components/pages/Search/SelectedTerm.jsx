import React from "react";

const SelectedTerm = ({ dispatchItems, value }) => {
  return (
    <button onClick={() => dispatchItems({ type: "remove", value: value })}>
      {value} X
    </button>
  );
};

export default SelectedTerm;
