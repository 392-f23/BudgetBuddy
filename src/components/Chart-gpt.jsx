import React from 'react';
import { Box, Typography, TextField } from '@material-ui/core';
import { PieChart } from '@material-ui/icons';

const Chart = ({ budget, totalExpenses, setMonthlyBudget, handleBudgetChange }) => {
  const handleBudgetInputChange = (event) => {
    // Update budget value in HomePage component
    setMonthlyBudget(parseFloat(event.target.value));
    handleBudgetChange(parseFloat(event.target.value) - totalExpenses);
  };

  const pieChartData = [
    { id: 0, value: totalExpenses, label: 'Spent' },
    { id: 1, value: budget - totalExpenses, label: 'Left' }
  ];

  return (
    <Box>
      <Typography variant="h6">Budget: </Typography>
      <TextField
        type="number"
        value={budget}
        onChange={(event) => handleBudgetInputChange(event)}
        onKeyDown={(event) => handleBudgetInputChange(event)}
      />
      <PieChart
        series={[
          {
            innerRadius: 75,
            cornerRadius: 10,
            data: pieChartData
          }
        ]}
      />
    </Box>
  );
};

export default Chart;