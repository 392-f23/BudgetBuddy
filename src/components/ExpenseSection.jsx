import { useState, useEffect } from "react";
import ExpenseBreakdown from "./ExpenseBreakdown.jsx";
import { dummyData } from "../assets/dummy_data.js";
import { Box, Typography } from "@mui/material";

function ExpenseSection() {
  const { Expenses: expenses, Budget: budgets } = dummyData;
  const [state, setState] = useState([]);

  useEffect(() => {
    const initialize = () => {
      const temp = [];
      Object.entries(expenses).map(([expense, value]) => {
        const initialBudget = budgets[expense];
        const { total, subExpenses } = value;
        temp.push([expense, (100 * total) / initialBudget, subExpenses]);
      });

      setState(temp);
    };

    initialize();
  }, []);

  return (
    <Box sx={{ padding: "16px" }}>
      <Typography variant="h2">Expense Breakdown</Typography>
      {state.map((expense) => (
        <ExpenseBreakdown
          subExpenses={expenses}
          expense={expense}
          key={expense}
        />
      ))}
    </Box>
  );
}

export default ExpenseSection;
