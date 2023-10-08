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
};
