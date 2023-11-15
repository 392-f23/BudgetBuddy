import { describe, it, beforeEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { isOnboarded, checkIfLoggedIn } from "../utility/firebase";
import App from "../App";

vi.mock("../utility/firebase");

describe("Check If Directing to Onboarding page for new users", () => {
  beforeEach(() => {
    isOnboarded.mockReturnValue(false);
    checkIfLoggedIn.mockReturnValue(true);

    render(<App />);
  });

  it("should redirect to /onboard if user is not onboarded", async () => {
    await screen.findByText("Fill in your information");
  });
});
