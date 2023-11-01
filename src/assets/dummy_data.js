export const dummyData = {
  User: "David",
  Income: 3500,
  Budget: {
    Monthly: 3000,
    Rent: 1725,
    Food: 600,
    Transport: 400,
  },
  Expenses: {
    Rent: {
      total: 1525,
      subExpense: {
        BaseRent: 1300,
        Utilities: 225,
      },
    },
    Food: {
      total: 423,
      subExpense: {
        Groceries: 300,
        "Dine-Out": 123,
      },
    },
    Transport: {
      total: 400,
      subExpense: {
        Uber: 250,
        CTA: 150,
      },
    },
  },
  SpendingHistory: [
    {
      date: "2023-10-01",
      category: "Rent",
      subcategory: "BaseRent",
      amount: 1300,
    },
    {
      date: "2023-10-01",
      category: "Rent",
      subcategory: "BaseRent",
      amount: 225,
    },
    {
      date: "2023-10-02",
      category: "Food",
      subcategory: "Groceries",
      amount: 300,
    },
    {
      date: "2023-10-03",
      category: "Food",
      subcategory: "Dine-out",
      amount: 123,
    },
    {
      date: "2023-10-03",
      category: "Transport",
      subcategory: "Uber",
      amount: 250,
    },
    {
      date: "2023-10-04",
      category: "Transport",
      subcategory: "CTA",
      amount: 150,
    },
  ],
};
