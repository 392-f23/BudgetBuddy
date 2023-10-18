import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Grid,
  Button,
  useTheme,
  FormControl,
  InputLabel,
  Input,
} from "@mui/material";
import SetupHeader from "../components/SetupHeader";
import logo from "../assets/budget_buddy_cropped.png";
import { signOut } from "firebase/auth";
import { submitOnboardingInformation, auth } from "../utility/firebase";

const OnboardingScreen = ({ setIsOnboardedState }) => {
  const theme = useTheme();
  const [income, setIncome] = useState(0);
  const [budget, setBudget] = useState(0);
  const navigate = useNavigate();

  const handleSubmitOnboarding = async () => {
    await submitOnboardingInformation(income, budget, auth.currentUser.uid);
    setIsOnboardedState(true);
  };

  const handleGoBack = () => {
    signOut(auth);
    localStorage.removeItem("isSignedIn");
    localStorage.removeItem("name");
    localStorage.removeItem("photoUrl");
    localStorage.removeItem("uid");
    navigate("/login")
  }

  return (
    <Box>
      <SetupHeader text={"Fill in your information"} />
      <Grid
        container
        sx={{
          height: "80vh",
          width: "100%",
          background: `linear-gradient(to top, ${theme.palette.primary[2]} 0%, ${theme.palette.primary[1]} 100%)`,
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Button
              variant="contained"
              onClick={handleGoBack}
              sx={{
                backgroundColor: theme.palette.primary[2],
                color: theme.palette.text.primary,
                border: `1px solid ${theme.palette.primary[5]}`,
                borderRadius: "10px",
                "&:hover": {
                  backgroundColor: theme.palette.primary[3],
                },
              }}
            >
              Go Back
            </Button>
        <Grid
          item
          xs={6}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            width: "100%",
            maxWidth: "100%",
            pt: 4,
          }}
        >
          <Box
            sx={{
              backgroundColor: theme.palette.primary[2],
              width: "60%",
              height: "250px",
              borderRadius: "15px",
              padding: "30px",
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "column",
            }}
          >
            <FormControl sx={{ width: "100%" }}>
              <InputLabel htmlFor="monthly-income">
                Your Monthly Income:
              </InputLabel>
              <Input
                id="monthly-income"
                defaultValue="0"
                onChange={(event) =>
                  setIncome(parseInt(event.target.value, 10))
                }
                startAdornment="$"
              />
            </FormControl>
            <FormControl sx={{ width: "100%" }}>
              <InputLabel htmlFor="monthly-budget">
                Your Budget This Month:
              </InputLabel>
              <Input
                id="monthly-budget"
                defaultValue="0"
                onChange={(event) =>
                  setBudget(parseInt(event.target.value, 10))
                }
                startAdornment="$"
              />
            </FormControl>
            <Button
              variant="contained"
              onClick={() => handleSubmitOnboarding()}
              sx={{
                backgroundColor: theme.palette.primary[1],
                border: `1px solid ${theme.palette.primary[5]}`,
                borderRadius: "10px",
              }}
            >
              Let's Go!
            </Button>
          </Box>
        </Grid>
        <Grid
          item
          xs={6}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            verticalAlign: "bottom",
            margin: 0,
            position: "fixed",
            bottom: "0px",
          }}
        >
          <Box component="img" src={logo} />
        </Grid>
      </Grid>
    </Box>
  );
}

export default OnboardingScreen;
