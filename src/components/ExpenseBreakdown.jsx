import { useState, useEffect } from "react";
import {
  Box,
  Grid,
  LinearProgress,
  Typography,
  useTheme,
  IconButton,
} from "@mui/material";
import Expense from "./Expense";
import EditIcon from "@mui/icons-material/Edit";
import ExpenseChangeModal from "./ExpenseChangeModal";
import { useNavigate } from "react-router-dom";

const ExpenseBreakdown = ({
  expense,
  handleExpensesStateChange,
  expenses,
  budgetCategory,
}) => {
  const theme = useTheme();
  const [showModal, setShowModal] = useState(false);
  const [isBudgetUpdated, setIsBudgetUpdated] = useState(null);
  const navigate = useNavigate();

  const handleOpen = () => setShowModal(true);
  const handleClose = () => {
    setShowModal(false);
  };

  useEffect(() => {
    if (!!isBudgetUpdated && isBudgetUpdated) {
      navigate(0);
    }
  }, [isBudgetUpdated]);

  return (
    <>
      <Box sx={{ pt: 2 }}>
        <Grid
          container
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
            pt: 1,
            pb: 1,
          }}
        >
          <Grid item xs={4}>
            <Typography variant="h3">{expense[0]}</Typography>
          </Grid>
          <Grid item xs={6}>
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
          <Grid item xs={2} sx={{ textAlign: "right" }}>
            <IconButton onClick={() => handleOpen()}>
              <EditIcon
                style={{
                  backgroundColor: theme.palette.primary.main,
                  color: theme.palette.primary[2],
                  padding: "8px",
                  borderRadius: "50%",
                  fontSize: "1.8rem",
                }}
              />
            </IconButton>
          </Grid>
        </Grid>
        <Box>
          {Object.entries(expense[2]).map((subExpense, index) => (
            <Expense
              key={index}
              expense={subExpense}
              handleExpensesStateChange={handleExpensesStateChange}
              expenses={expenses}
              expenseKey={expense[0]}
            />
          ))}
        </Box>
      </Box>
      <ExpenseChangeModal
        open={showModal}
        onClose={handleClose}
        category={expense[0]}
        currentBudget={budgetCategory[expense[0]]}
        setIsBudgetUpdated={setIsBudgetUpdated}
        expenses={expenses}
      />
    </>
  );
};

export default ExpenseBreakdown;
