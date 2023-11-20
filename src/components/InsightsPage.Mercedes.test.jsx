import { describe, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import InsightsPage from "../pages/InsightsPage";
import { getDoc, doc } from "firebase/firestore";

vi.mock("firebase/firestore");

class mockDocumantSnap {
  constructor() {}
  exists() {
    return true;
  }
  data() {
    return {
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
  }
}

const mockDoc = new mockDocumantSnap();

beforeEach(() => {
  getDoc.mockReturnValue(mockDoc);
  doc.mockReturnValue({});
});

describe("Insights page daily spending test", () => {
  it("the correct daily budget recommendation value should be displayed", async () => {
    const route = "/insights";

    const { container } = render(
      <MemoryRouter initialEntries={[route]}>
        <InsightsPage />
      </MemoryRouter>
    );

    await screen.findByText(/Spending Insights/i);

    const recommendedSpendingText = screen.getByText(
      /Based off of your monthly income of \$2000 and your budget of \$1100, we recommend spending about \$\d+\.\d+ per day\./i
    );

    const recommendedSpendingTextSubstring =
      recommendedSpendingText.textContent.split("we recommend spending")[1];

    const recommendedSpendingValue =
      recommendedSpendingTextSubstring.match(/\$([\d.]+)/)[1];

    const expectedSpendingValue = 36.67;
    expect(parseFloat(recommendedSpendingValue)).toBeCloseTo(
      expectedSpendingValue
    );
  });
});