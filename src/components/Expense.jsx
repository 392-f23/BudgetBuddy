import { useState } from "react";
import { Grid, TextField, Typography, InputAdornment } from "@mui/material";

const Expense = ({ expense }) => {
  const [key, value] = expense;
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
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
        ></TextField>
      </Grid>
    </Grid>
  );
};

export default Expense;
