export const dummyData = {
  User: "David",
  Income: 3500,
  Budget: {
    Monthly: 3000,
    Rent: 1600,
    Food: 600,
    Transport: 300,
  },
  Expenses: {
    Rent: {
      total: 1725,
      subExpense: {
        BaseRent: 1300,
        Utilities: 225,
      },
    },
    Food: {
      total: 450,
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
