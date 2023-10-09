import { useEffect, useState } from "react";
import { auth, provider } from "../utility/firebase";
import {
  AppBar,
  Box,
  Button,
  Grid,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import logo from "../assets/budget buddy.png";
import GoogleIcon from "@mui/icons-material/Google";
import readData from "../utility/query";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuthState, handleLogin } from "../utility/firebase";
import { signInWithPopup } from "firebase/auth";

function LoginPage() {
  //const [user] = useAuthState();

  useEffect(() => {
    const read = async () => {
      await readData("users");
    };
    read();
  }, []);

  // const navigate = useNavigate();
  /*
  const handleLogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const uid = result["user"]["uid"];
        // Redirect to home page upon successful sign-in
        navigate("/home");
      })
      .catch((error) => {
        console.error(error);
      });
  };*/

  //might need to interact with DB here!

  const theme = useTheme();

  return (
    <>
      <AppBar
        position="static"
        sx={{ backgroundColor: theme.palette.primary[1] }}
      >
        <Toolbar>
          <Grid container sx={{ pt: 4, pb: 2 }}>
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <Box
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  justifyContent: "flex-start",
                }}
              >
                <Typography
                  variant="h1"
                  style={{ color: theme.palette.text[1] }}
                >
                  BudgetBuddy
                </Typography>
                <Typography
                  variant="h6"
                  style={{ color: theme.palette.text[1] }}
                >
                  Sign in below
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Box
        sx={{
          height: "100%",
          width: "100%",
          background: `linear-gradient(to top, ${theme.palette.primary[2]} 0%, ${theme.palette.primary[1]} 100%)`,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Button
          variant="contained"
          startIcon={<GoogleIcon />}
          onClick={handleLogin}
          sx={{
            backgroundColor: theme.palette.primary[1],
            border: `1px solid ${theme.palette.primary[5]}`,
            borderRadius: "10px",
          }}
        >
          Sign in with Google
        </Button>
        <Box sx={{ justifyContent: "flex-end" }}>
            <Box sx={{ position: "relative"}}>
                <Box component="img" src={logo} sx={{ position: "absolute", transform: "translateY(10%) translateX(-50%)" }}/>
            </Box>
        </Box>
      </Box>

      {/* <div>
        <NavLink to="/home">click to go home</NavLink>
      </div> */}
    </>
  );
}

export default LoginPage;
