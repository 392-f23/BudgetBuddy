import { useState } from "react";
import { Box, Typography, TextField, InputAdornment } from "@mui/material";
import Chart from "./Chart";

const ChartSection = ({ income, budget, expenses }) => {
  const [currentIncome, setCurrentIncome] = useState(income);

  return (
    <Box sx={{ padding: "16px" }}>
      <Chart budget={budget} expenses={expenses} />
      <Box sx={{ display: "flex" }}>
        <Typography varianat="h3">Your monthly income: </Typography>
        <TextField
          defaultValue={currentIncome}
          onChange={(event) => setCurrentIncome(event.target.value)}
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
          sx={{ pr: 3 }}
        ></TextField>
      </Box>
    </Box>
  );
};

export default ChartSection;
