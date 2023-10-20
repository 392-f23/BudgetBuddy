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
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const ExpenseChangeModal = ({ open, onClose, category, currentBudget }) => {
  const theme = useTheme();
  const [newBudget, setNewBudget] = useState(0);

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
          // onClick={() => handleExpenseUpdate()}
        >
          Update Budget
        </Button>
      </Box>
    </Modal>
  );
};

export default ExpenseChangeModal;
