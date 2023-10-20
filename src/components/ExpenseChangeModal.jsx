import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Grid,
  IconButton,
  Modal,
  TextField,
  Typography,
  useTheme,
  InputAdornment,
  Alert,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { changeBudgetByCategory } from "../utility/firebase";

const ExpenseChangeModal = ({
  open,
  onClose,
  category,
  currentBudget,
  setIsBudgetUpdated,
  expenses,
}) => {
  const theme = useTheme();
  const [newBudget, setNewBudget] = useState(0);
  const [showAlert, setShowAlert] = useState(false);
  const [currSum, setCurrSum] = useState(0);

  const validateField = () => {
    const expenseByCategory = expenses[category];
    const { subExpense } = expenseByCategory;

    const currSum = Object.entries(subExpense).reduce(
      (sum, [_, value]) => sum + value,
      0
    );

    setCurrSum(currSum);

    if (newBudget < currSum) {
      setShowAlert(true);
      return false;
    }

    return true;
  };

  const handleBudgetUpdate = async () => {
    if (validateField()) {
      await changeBudgetByCategory(category, newBudget);
      setIsBudgetUpdated(true);
      onClose();
    }
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
            <Typography variant="h3">Adjust your budget</Typography>
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
        <TextField
          fullWidth
          label="Your current budget"
          variant="outlined"
          value={currentBudget}
          disabled
          sx={{ pb: 2 }}
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
        />
        <TextField
          fullWidth
          label="Category"
          variant="outlined"
          value={category}
          disabled
          sx={{ pb: 2 }}
        />
        <TextField
          fullWidth
          label="New Budget"
          variant="outlined"
          onChange={(event) => setNewBudget(parseInt(event.target.value, 10))}
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
          sx={{ pb: 2 }}
        />
        <Button
          fullWidth
          variant="contained"
          onClick={() => handleBudgetUpdate()}
        >
          Update Budget
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
            {`You already spent ${currSum}. You cannot reduce your budget below ${currSum}`}
          </Alert>
        )}
      </Box>
    </Modal>
  );
};

export default ExpenseChangeModal;
