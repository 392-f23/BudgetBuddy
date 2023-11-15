import React from "react";
import { expect } from "vitest";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import MenuContainer from "./MenuContainer";

describe("MenuContainer Component", () => {
  it("renders all three menu options", () => {
    const customProps = {
      data: {
        budget: 0,
      },
      totalExpenses: 0,
    };
    const { getByText } = render(
      <MemoryRouter>
        <MenuContainer {...customProps} />
      </MemoryRouter>
    );

    // Check if "Home" menu is rendered
    expect(getByText("Home")).toBeDefined();

    // Check if "Insights" menu is rendered
    expect(getByText("Insights")).toBeDefined();

    // Check if "Logout" menu is rendered
    expect(getByText("Logout")).toBeDefined();
  });
});
