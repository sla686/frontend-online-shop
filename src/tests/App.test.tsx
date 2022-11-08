import React from "react";

import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "../components/HomePage";

test("Renders HomePage component", () => {
  render(<Home />);
  const linkElement = screen.getByText(/Welcome/i);
  expect(linkElement).toBeInTheDocument();
});
