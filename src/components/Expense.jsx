import { useState, useEffect } from "react";
import { TextField, Typography } from "@mui/material";

const Expense = ({ expense, value }) => {
  const [amount, setAmount] = useState(value);

  const handleChange = (event) => {
    setAmount(event.target.value);
  };

  return (
    <div className="expense">
      <Typography variant="body1">
        {expense}:
        <TextField
          value={amount.total}
          defaultValue={`$${value}`}
          onChange={(event) => handleChange(event)}
        ></TextField>
      </Typography>
    </div>
  );
};

export default Expense;
