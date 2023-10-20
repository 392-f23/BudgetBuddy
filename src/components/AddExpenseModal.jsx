import {
  Box,
  Button,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import dayjs from "dayjs";
import { addExpense } from "../utility/firebase";
import { categoryMapper } from "../constants";
import { Alert } from "@mui/material";

function AddExpenseModal({ open, onClose, budgetCategory, expenses }) {
  const theme = useTheme();
  const [expenseCategory, setExpenseCategory] = useState("");
  const [expenseDate, setExpenseDate] = useState(dayjs());
  const [expenseAmount, setExpenseAmount] = useState(0);
  const [showAlert, setShowAlert] = useState(false);
  const [category, setCategory] = useState("");
  const [budget, setBudget] = useState("");
  const [diff, setDiff] = useState("");

  const handleExpenseCategoryChange = (event) => {
    setExpenseCategory(event.target.value);
  };

  const handleExpenseAmountChange = (event) => {
    setExpenseAmount(parseInt(event.target.value, 10));
  };

  const validateField = () => {
    const category = categoryMapper[expenseCategory];
    const expense = expenses[category];
    const budget = budgetCategory[category];
    setCategory(category);
    setBudget(budget);

    const { total } = expense;

    if (total + expenseAmount > budget) {
      const diff = budget - total;
      setDiff(diff);
      setShowAlert(true);
      return false;
    }

    return true;
  };

  const handleExpenseUpdate = async () => {
    if (validateField()) {
      await addExpense({
        date: expenseDate.toDate().toISOString().split("T")[0],
        category: catMapping[expenseCategory],
        subcategory: expenseCategory,
        amount: expenseAmount,
      });

      onClose();
    }
  };

  const catMapping = {
    BaseRent: "Rent",
    Utilities: "Rent",
    Groceries: "Food",
    "Dine-Out": "Food",
    Uber: "Transport",
    CTA: "Transport",
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
          alignItems: "center",
          width: "60%",
          height: "auto",
          backgroundColor: theme.palette.primary[2],
          borderRadius: "10px",
          padding: "20px",
        }}
      >
        <Grid container sx={{ pb: 2 }}>
          <Grid
            item
            xs={9}
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <Typography variant="h3">Add an expense</Typography>
          </Grid>
          <Grid
            item
            xs={3}
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <IconButton onClick={onClose}>
              <CloseIcon
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
        <FormControl fullWidth sx={{ pb: 2 }}>
          <InputLabel id="expense-category-label">Expense Category</InputLabel>
          <Select
            labelId="expense-category-label"
            id="expense-category"
            value={expenseCategory}
            label="Expense Category"
            onChange={handleExpenseCategoryChange}
          >
            <MenuItem value={"Groceries"}>Groceries</MenuItem>
            <MenuItem value={"Dine-Out"}>Dine-Out</MenuItem>
            <MenuItem value={"Utilities"}>Utilities</MenuItem>
            <MenuItem value={"BaseRent"}>BaseRent</MenuItem>
            <MenuItem value={"Uber"}>Uber</MenuItem>
            <MenuItem value={"CTA"}>CTA</MenuItem>
          </Select>
        </FormControl>
        <MobileDatePicker
          label="When did this expense occur?"
          sx={{ width: "100%", pb: 2 }}
          defaultValue={dayjs()}
          value={expenseDate}
          onChange={(date) => setExpenseDate(date)}
        />
        <TextField
          fullWidth
          label="How much did you spend?"
          variant="outlined"
          onChange={handleExpenseAmountChange}
          sx={{ pb: 2 }}
        />
        <Button
          fullWidth
          variant="contained"
          onClick={() => handleExpenseUpdate()}
        >
          Submit Expense
        </Button>
        {showAlert && (
          <Alert
            severity="error"
            action={
              <Button
                color="inherit"
                size="small"
                onClick={() => setShowAlert(false)}
              >
                Close
              </Button>
            }
            sx={{ marginTop: "20px" }}
          >
            {`Current budget of ${category} is ${budget}. You can only use $${diff}. Please do not exceed your budget!`}
          </Alert>
        )}
      </Box>
    </Modal>
  );
}

export default AddExpenseModal;
