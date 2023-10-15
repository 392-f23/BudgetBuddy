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
import logo from "../assets/budget_buddy_cropped.png";
import GoogleIcon from "@mui/icons-material/Google";
import LoginHeader from "../components/LoginHeader";
import readData from "../utility/query";
import { NavLink, useNavigate } from "react-router-dom";
import {
  useAuthState,
  handleLogin,
  signUpWithGoogle,
} from "../utility/firebase";
import { signInWithPopup } from "firebase/auth";

function LoginPage() {
  //const [user] = useAuthState();

  useEffect(() => {
    const read = async () => {
      await readData("users");
    };
    read();
  }, []);
  //SETUP NAVIGATE HERE
  const navigate = useNavigate();
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
      <LoginHeader />
      <Grid
        container
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
        <Grid
          item
          xs={6}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            width: "100%",
            maxWidth: "100%",
            pt: 6,
          }}
        >
          <Button
            variant="contained"
            startIcon={<GoogleIcon />}
            onClick={() => signUpWithGoogle(navigate)}
            sx={{
              backgroundColor: theme.palette.primary[1],
              border: `1px solid ${theme.palette.primary[5]}`,
              borderRadius: "10px",
            }}
          >
            Sign in with Google
          </Button>
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
    </>
  );
}

export default LoginPage;
