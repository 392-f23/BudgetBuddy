import { useState } from "react";
import { Grid, TextField, Typography } from "@mui/material";

const Expense = ({ expense, value }) => {
  const [amount, setAmount] = useState(value);

  const handleChange = (event) => {
    setAmount(event.target.value);
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
          {expense}
        </Typography>
      </Grid>
      <Grid item xs={4}>
        <TextField
          defaultValue={value}
          onChange={(event) => handleChange(event)}
          sx={{ pr: 3 }}
        ></TextField>
      </Grid>
    </Grid>
  );
};

export default Expense;
