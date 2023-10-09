import { useState } from "react";
import { Box, Typography, TextField, InputAdornment } from "@mui/material";
import Chart from "./Chart";

const ChartSection = ({ income, budget, setMonthlyBudget, totalExpenses }) => {
  const [currentIncome, setCurrentIncome] = useState(income);

  return (
    <Box
      sx={{
        padding: "32px",
        display: "flex",
        justifyContent: "center",
        alignItems: "space-between",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Chart
          budget={budget}
          setMonthlyBudget={setMonthlyBudget}
          totalExpenses={totalExpenses}
        />
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Typography
          variant="h4"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginRight: "20px",
          }}
        >
          Your monthly income:
        </Typography>
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
