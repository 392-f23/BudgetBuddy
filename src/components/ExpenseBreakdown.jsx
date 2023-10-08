import { Box, Grid, LinearProgress, Typography, useTheme } from "@mui/material";
import Expense from "./Expense";

const ExpenseBreakdown = ({ subExpenses, expense }) => {
  const theme = useTheme();

  return (
    <Box sx={{ pt: 2 }}>
      <Grid
        container
        sx={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
          pt: 1,
        }}
      >
        <Grid item xs={4}>
          <Typography variant="h3">{expense[0]}</Typography>
        </Grid>
        <Grid item xs={8}>
          <LinearProgress
            variant="determinate"
            sx={{
              margin: "0 auto",
              borderRadius: "8px",
              backgroundColor: theme.palette.primary[3],
              height: "8px",
            }}
            value={expense[1]}
          />
        </Grid>
      </Grid>
      <Box>
        {Object.entries(subExpenses[expense[0]].subExpense).map(
          ([subExpense, value]) => (
            <div key={subExpense}>
              <Expense expense={subExpense} value={value} />
            </div>
          )
        )}
      </Box>
    </Box>
  );
};

export default ExpenseBreakdown;
