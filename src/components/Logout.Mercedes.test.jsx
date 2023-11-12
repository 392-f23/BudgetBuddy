import { describe, expect, it, beforeEach, afterEach } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { fetchUserData } from "../utility/query";
import HomePage from "../pages/HomePage";
import { toBeVisible } from "@testing-library/jest-dom/matchers";
import { fireEvent, render, screen } from "@testing-library/react";
import { handleLogOut } from "../utility/firebase";

expect.extend(toBeVisible);

let originalHandleLogOut = handleLogOut;
let mockData;
let originalLocalStorage;

vi.mock('../utility/query');
vi.mock('../utility/firebase');

beforeEach(() => {
  mockData = {
    income: 2000,
    displayName: "test",
    email: "test@u.northwestern.edu",
    budgetByCategory: {
      Food: 500,
      Rent: 1000,
      Transport: 200,
    },
    budget: 1100,
    photoURL:
      "https://lh3.googleusercontent.com/a/ACg8ocLnwK7QYS82B18t9PrNaxtXTMhjDHaQ8-VHLStkEWE=s96-c",
    onboarded: true,
    expenses: {
      Transport: {
        subExpense: {
          CTA: 0,
          Uber: 0,
        },
        total: 0,
      },
      Rent: {
        total: 0,
        subExpense: {
          BaseRent: 0,
          Utilities: 0,
        },
      },
      Food: {
        total: -30,
        subExpense: {
          "Dine-Out": -30,
          Groceries: 0,
        },
      },
    },
    SpendingHistory: [
      {
        subcategory: "Dine-Out",
        amount: -30,
        category: "Food",
        date: "2023-10-20",
      },
    ],
  };
  fetchUserData.mockReturnValue(mockData);
  originalLocalStorage = { ...window.localStorage };
});

afterEach(() => {
  window.localStorage.clear();
  Object.keys(originalLocalStorage).forEach((key) => {
    window.localStorage.setItem(key, originalLocalStorage[key]);
  });
});

describe("Logout test", () => {
  it("Pressing the logout button should sign out user, removing all the key, value pairs stored in the localStorage", async () => {
    const route = "/home";

    const { container } =  render(
      <MemoryRouter initialEntries={[route]}>
        <HomePage />
      </MemoryRouter>
    );

    await screen.findByText(/BudgetBuddy/i);

    const menuButton = container.querySelector('[data-cy="Menu"]');
    fireEvent.click(menuButton);

    await screen.findByText(/Logout/i);

    const logoutButton = container.querySelector('[data-cy="Logout"]');
    fireEvent.click(logoutButton);

    // Assertions
    expect(handleLogOut).toHaveBeenCalled();

    expect(window.location.pathname).toBe("/");

    expect(window.localStorage.getItem("isSignedIn")).toBeNull();
    expect(window.localStorage.getItem("uid")).toBeNull();
    expect(window.localStorage.getItem("name")).toBeNull();
    expect(Object.keys(window.localStorage).length).toBe(1);
  });
});
