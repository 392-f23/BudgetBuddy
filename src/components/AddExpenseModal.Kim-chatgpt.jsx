import React, { useState } from "react";
import {
  Modal,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { DatePicker } from "mui-mobile-datepicker";
import { addExpense } from "./utility/firebase";
import dayjs from "dayjs";

const categoryMapper = {
  BaseRent: "Rent",
  Utilities: "Rent",
  Groceries: "Food",
  "Dine-Out": "Food",
  Uber: "Transport",
  CTA: "Transport",
};

const AddExpenseModal = ({
  open,
  onClose,
  budgetCategory,
  expenses,
  setIsExpenseAdded,
}) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [validationError, setValidationError] = useState("");

  const handleSave = () => {
    // Validate if all fields are filled
    if (selectedDate && selectedCategory && selectedSubCategory && amount) {
      const formattedDate = dayjs(selectedDate).format("YYYY-MM-DD");
      const expenseData = {
        date: formattedDate,
        category: selectedCategory,
        subcategory: selectedSubCategory,
        amount: parseFloat(amount),
      };

      // Call the addExpense method from utility/firebase
      addExpense(expenseData);

      // Set state to indicate that an expense has been added
      setIsExpenseAdded(true);

      // Close the modal
      onClose();
    } else {
      // Handle validation error and display error message
      setValidationError("Please fill in all fields.");
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div>
        <DatePicker value={selectedDate} onChange={setSelectedDate} />

        <FormControl fullWidth>
          <InputLabel>Category</InputLabel>
          <Select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {Object.keys(budgetCategory).map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>Subcategory</InputLabel>
          <Select
            value={selectedSubCategory}
            onChange={(e) => setSelectedSubCategory(e.target.value)}
          >
            {selectedCategory &&
              Object.keys(expenses[selectedCategory]?.subExpense).map(
                (subCategory) => (
                  <MenuItem key={subCategory} value={subCategory}>
                    {subCategory}
                  </MenuItem>
                )
              )}
          </Select>
        </FormControl>

        <TextField
          label="Amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        {validationError && <p style={{ color: "red" }}>{validationError}</p>}

        <Button variant="contained" onClick={handleSave}>
          Save
        </Button>

        <Button variant="contained" onClick={onClose}>
          Close
        </Button>
      </div>
    </Modal>
  );
};

export default AddExpenseModal;
