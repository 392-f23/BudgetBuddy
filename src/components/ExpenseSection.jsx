import { useState, useEffect } from "react";
import ExpenseBreakdown from "./ExpenseBreakdown.jsx";
import { dummyData } from "../assets/dummy_data.js";
import { Box, Typography } from "@mui/material";

const ExpenseSection = () => {
  const { Expenses: expenses, Budget: budgets } = dummyData;
  const [state, setState] = useState([]);

  useEffect(() => {
    const initialize = () => {
      const temp = [];

      Object.entries(expenses).map(([expense, value]) => {
        const initialBudget = budgets[expense];
        const { total, subExpense } = value;
        temp.push([expense, (100 * total) / initialBudget, subExpense]);
      });

      setState(temp);
    };

    initialize();
  }, []);

  return (
    <Box sx={{ padding: "32px" }}>
      <Typography variant="h2">Expense Breakdown</Typography>
      {state.map((expense) => (
        <ExpenseBreakdown expense={expense} key={expense} />
      ))}
    </Box>
  );
};

export default ExpenseSection;
