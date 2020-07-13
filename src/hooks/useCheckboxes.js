import { useReducer } from "react";

const useCheckboxes = () => {
  const [activeItems, dispatchItems] = useReducer(
    (activeItems, { type, value }) => {
      switch (type) {
        case "add":
          return [...activeItems, value];
        case "remove":
          return activeItems.filter((n) => n !== value);
        case "clear":
          return [];
        default:
          return activeItems;
      }
    },
    [] // the default value is an empty array
  );

  return [activeItems, dispatchItems];
};

export default useCheckboxes;
