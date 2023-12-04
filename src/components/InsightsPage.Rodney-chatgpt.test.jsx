import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom"; // Import the routing component
import InsightsPage from "../pages/InsightsPage"; // Update the import path based on your project structure
import "@testing-library/jest-dom"; // Import the jest-dom library for additional matchers
import { getByText } from "@testing-library/dom"; // Import the getByText function from dom-testing-library

import { fetchUserData } from "../utility/query";
import { vi } from "vitest";

vi.mock("../utility/query");

test('InsightsPage displays "Spending Insights"', () => {
  fetchUserData.mockReturnValue(null);
  const { container } = render(
    <MemoryRouter initialEntries={["/insights"]}>
      <InsightsPage />
    </MemoryRouter>
  );

  // Use enzyme or vitest's query function to assert the presence of the text
  const textElement = getByText(container, "Spending Insights");
  expect(textElement).toBeInTheDocument();
});
