import React from "react";
import { render } from "@testing-library/react";
import MenuContainer from "./MenuContainer";

describe("MenuContainer Component", () => {
  it("renders all three menu options", () => {
    const { getByText } = render(<MenuContainer />);

    // Check if "Home" menu is rendered
    expect(getByText("Home")).toBeInTheDocument();

    // Check if "Insights" menu is rendered
    expect(getByText("Insights")).toBeInTheDocument();

    // Check if "Logout" menu is rendered
    expect(getByText("Logout")).toBeInTheDocument();
  });
});
