import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

test("renders total records", () => {
  const { getByText } = render(<App />);
  const textElement = getByText(/Total Records/i);
  expect(textElement).toBeInTheDocument();
});
