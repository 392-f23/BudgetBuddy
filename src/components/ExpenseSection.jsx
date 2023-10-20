import { useState, useEffect } from "react";
import ExpenseBreakdown from "./ExpenseBreakdown.jsx";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import AddExpenseModal from "./AddExpenseModal.jsx";
import LoadingContainer from "./LoadingContainer";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../utility/firebase.js";
import { sortedCategories } from "../constants.js";

const ExpenseSection = ({ handleExpensesStateChange }) => {
  const [state, setState] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [recalculate, setRecalculate] = useState(false);
  const [expenses, setExpenses] = useState({});
  const [budgetCategory, setBudgetCategory] = useState({});

  const handleOpen = () => setShowModal(true);
  const handleClose = () => {
    setShowModal(false);
    setRecalculate(!recalculate);
  };

  const theme = useTheme();

  useEffect(() => {
    const initialize = async () => {
      setIsLoading(true);
      const id = localStorage.getItem("uid");
      const userRef = doc(db, "users", id);
      const docSnap = await getDoc(userRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        const { expenses, budgetByCategory } = data;
        const temp = [];

        sortedCategories.forEach((key) => {
          const initialBudget = budgetByCategory[key];
          const { total, subExpense } = expenses[key];
          temp.push([key, (100 * total) / initialBudget, subExpense]);
        });

        setExpenses(expenses);
        setState(temp);
        setBudgetCategory(budgetByCategory);
      }
      setIsLoading(false);
    };

    initialize();
  }, [recalculate]);

  return (
    <LoadingContainer isLoading={isLoading}>
      <Box sx={{ padding: "32px" }}>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
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
        {JSON.stringify(expenses) === "{}" ? (
          <Box
            sx={{
              textAlign: "center",
              marginTop: "300px",
            }}
          >
            <h1>No expenses added yet!</h1>
            <h2>Try adding some expenses!</h2>
          </Box>
        ) : (
          state.map((expense) => (
            <ExpenseBreakdown
              expense={expense}
              key={expense}
              handleExpensesStateChange={handleExpensesStateChange}
              expenses={expenses}
              budgetCategory={budgetCategory}
            />
          ))
        )}
      </Box>
      {showModal && (
        <AddExpenseModal
          open={showModal}
          onClose={handleClose}
          budgetCategory={budgetCategory}
          expenses={expenses}
        />
      )}
    </LoadingContainer>
  );
};

export default ExpenseSection;
