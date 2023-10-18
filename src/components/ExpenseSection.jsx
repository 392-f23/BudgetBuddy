import { useState, useEffect } from "react";
import ExpenseBreakdown from "./ExpenseBreakdown.jsx";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import AddExpenseModal from "./AddExpenseModal.jsx";
import LoadingContainer from "./LoadingContainer";

const ExpenseSection = ({ expenses, handleExpensesStateChange, budgets }) => {
  const [state, setState] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [recalculate, setRecalculate] = useState(false);
  const handleOpen = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const theme = useTheme();

  useEffect(() => {
    const initialize = () => {
      const temp = [];

      Object.entries(expenses).map(([expense, value]) => {
        const initialBudget = budgets[expense];
        const { total, subExpense } = value;
        temp.push([expense, (100 * total) / initialBudget, subExpense]);
      });

      setState(temp);
    };

    initialize();
  }, [expenses]);

  useEffect(() => {
    if (!showModal) {
    }
  }, [showModal]);

  return (
    <>
      <Box sx={{ padding: "32px" }}>
        <Box sx={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="h2">Expense Breakdown</Typography>
          <IconButton onClick={handleOpen}>
            <AddIcon 
              style={{
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.primary[2],
                padding: "8px",
                borderRadius: "50%",
                fontSize: "1.8rem",
              }}
            />
          </IconButton>
        </Box>
          {state.map((expense) => (
            <ExpenseBreakdown
              expense={expense}
              key={expense}
              handleExpensesStateChange={handleExpensesStateChange}
              expenses={expenses}
            />
          ))}
        </Box>
      {showModal && (
        <AddExpenseModal open={showModal} onClose={handleClose} />
      )}
    </>
  );
};

export default ExpenseSection;
