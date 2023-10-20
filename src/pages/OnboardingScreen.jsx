import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Grid,
  Button,
  useTheme,
  FormControl,
  InputLabel,
  Input,
  Typography,
} from "@mui/material";
import SetupHeader from "../components/SetupHeader";
import logo from "../assets/budget_buddy_cropped.png";
import { signOut } from "firebase/auth";
import { submitOnboardingInformation, auth } from "../utility/firebase";

const OnboardingScreen = ({ setIsOnboardedState }) => {
  const theme = useTheme();
  const [income, setIncome] = useState(0);
  const [budget, setBudget] = useState(0);
  const [rent, setRent] = useState(0);
  const [food, setFood] = useState(0);
  const [transportation, setTransportation] = useState(0);

  const navigate = useNavigate();

  const [validated, setValidated] = useState(false);

  useEffect(() => {
    if (
      income > 0 &&
      budget > 0 &&
      rent > 0 &&
      food > 0 &&
      transportation > 0 &&
      budget >= rent + food + transportation &&
      income >= budget
    ) {
      setValidated(true);
    } else {
      setValidated(false);
    }
  }, [income, budget, rent, food, transportation]);

  const handleSubmitOnboarding = async () => {
    if (validated == true) {
      await submitOnboardingInformation(
        income,
        budget,
        rent,
        food,
        transportation
      );
      setIsOnboardedState(true);
    } else {
      alert(
        "Please fill in all fields and ensure that your budget is greater than the sum of your expenses."
      );
    }
  };

  const handleGoBack = () => {
    signOut(auth);
    localStorage.removeItem("isSignedIn");
    localStorage.removeItem("name");
    localStorage.removeItem("photoUrl");
    localStorage.removeItem("uid");
    navigate("/login");
  };

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
          xs={10}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            width: "100%",
            maxWidth: "100%",
            pt: 4,
            padding: "10px",
          }}
        >
          <Box
            sx={{
              backgroundColor: theme.palette.primary[2],
              width: "60%",
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
            <FormControl sx={{ width: "100%", marginTop: "20px" }}>
              <InputLabel htmlFor="monthly-budget">
                Your Total Budget This Month:
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
            <Typography
              variant={"h3"}
              sx={{ textAlign: "center", marginTop: "10px" }}
            >
              How do you want to split up?
            </Typography>
            <FormControl sx={{ width: "100%", marginTop: "20px" }}>
              <InputLabel htmlFor="monthly-rent">Rent:</InputLabel>
              <Input
                id="monthly-rent"
                defaultValue="0"
                onChange={(event) => setRent(parseInt(event.target.value, 10))}
                startAdornment="$"
              />
            </FormControl>
            <FormControl sx={{ width: "100%", marginTop: "20px" }}>
              <InputLabel htmlFor="monthly-food">Food:</InputLabel>
              <Input
                id="monthly-food"
                defaultValue="0"
                onChange={(event) => setFood(parseInt(event.target.value, 10))}
                startAdornment="$"
              />
            </FormControl>
            <FormControl sx={{ width: "100%", marginTop: "20px" }}>
              <InputLabel htmlFor="monthly-transportation">
                Transportation:
              </InputLabel>
              <Input
                id="monthly-transportation"
                defaultValue="0"
                onChange={(event) =>
                  setTransportation(parseInt(event.target.value, 10))
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
                marginTop: "20px",
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
};

export default OnboardingScreen;
