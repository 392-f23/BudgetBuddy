import { describe, it, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import MenuContainer from "./MenuContainer";

const mockProp = {
  data: {
    budget: 0,
  },
  totalExpenses: 0,
};

describe("Navigation Bar Configuration", () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <MenuContainer {...mockProp} />
      </MemoryRouter>
    );
  });

  it("should have Home", async () => {
    await screen.findByText("Home");
  });

  it("should have Insights", async () => {
    await screen.findByText("Insights");
  });

  it("should have Logout", async () => {
    await screen.findByText("Logout");
  });
});
