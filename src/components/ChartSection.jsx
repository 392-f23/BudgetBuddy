import { useState, useEffect } from "react";
import { Box, Typography, TextField, InputAdornment } from "@mui/material";
import LoadingContainer from "./LoadingContainer";
import { changeIncome, changeBudget } from "../utility/firebase";
import { fetchUserData } from "../utility/query";
import Chart from "./Chart";

const ChartSection = ({ income, budget, setMonthlyBudget, totalExpenses }) => {
  const [currentIncome, setCurrentIncome] = useState(0);
  const [currentBudget, setCurrentBudget] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [refetch, setRefetch] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const uid = localStorage.getItem("uid");
      const data = await fetchUserData(uid);
      const { income, budget, SpendingHistory, expenses } = data;
      setCurrentIncome(income);
      setCurrentBudget(budget);
      setIsLoading(false);
    }

    fetchData();
  }, [refetch]);

  const handleIncomeChange = async (event) => {
    const { key } = event;

    if (key === "Enter") {
      setIsLoading(true);
      await changeIncome(parseInt(event.target.value, 10));
      setRefetch(!refetch);
      setIsLoading(false);
    }
  }

  const handleBudgetChange = async (event) => {
    const { key } = event;

    if (key === "Enter") {
      setIsLoading(true);
      await changeBudget(parseInt(event.target.value, 10));
      setRefetch(!refetch);
      setIsLoading(false);
    }
  }

  return (
    <LoadingContainer isLoading={isLoading}>
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
            handleBudgetChange={handleBudgetChange}
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
            onKeyDown={(event) => handleIncomeChange(event)}
            onChange={(event) => setCurrentIncome(event.target.value)}
            InputProps={{
              startAdornment: <InputAdornment position="start">$</InputAdornment>,
            }}
            sx={{ pr: 3 }}
          ></TextField>
        </Box>
      </Box>
    </LoadingContainer>
  );
};

export default ChartSection;
