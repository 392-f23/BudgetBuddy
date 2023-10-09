import { useState } from "react";
import { Grid, TextField, Typography, InputAdornment } from "@mui/material";

const Expense = ({
  expense,
  handleExpensesStateChange,
  expenses,
  expenseKey,
}) => {
  const [key, value] = expense;
  const [amount, setAmount] = useState(value);

  const handleChange = (event) => {
    setAmount(event.target.value);
  };

  const handleSideChanges = (event) => {
    const { subExpense } = expenses[expenseKey];
    const tempSubExpense = {
      ...subExpense,
      [key]: parseInt(event.target.value, 10),
    };

    const total = Object.entries(tempSubExpense).reduce(
      (sum, expense) => sum + parseInt(expense[1], 10),
      0
    );

    const temp = {
      ...expenses,
      [expenseKey]: { total: total, subExpense: tempSubExpense },
    };

    handleExpensesStateChange(temp);
  };

  const handleKeyDown = (event) => {
    const { key } = event;

    if (key === "Enter") {
      handleSideChanges(event);
    }
  };

  return (
    <Grid
      container
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        pb: 1,
      }}
    >
      <Grid item xs={8}>
        <Typography variant="body1" sx={{ pl: 3 }}>
          {key}
        </Typography>
      </Grid>
      <Grid
        item
        xs={4}
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <TextField
          defaultValue={value}
          onChange={(event) => handleChange(event)}
          onBlur={(event) => handleSideChanges(event)}
          onKeyDown={(event) => handleKeyDown(event)}
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
        ></TextField>
      </Grid>
    </Grid>
  );
};

export default Expense;
