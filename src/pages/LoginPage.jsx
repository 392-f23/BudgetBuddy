import { Box, Button, Grid, useTheme } from "@mui/material";
import logo from "../assets/budget_buddy_cropped.png";
import GoogleIcon from "@mui/icons-material/Google";
import SetupHeader from "../components/SetupHeader";
import { useNavigate } from "react-router-dom";
import { signUpWithGoogle } from "../utility/firebase";

function LoginPage() {
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <>
      <SetupHeader text={"Sign in below"} />
      <Grid
        container
        sx={{
          height: "80vh",
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
            id="google-auth-button"
          >
            Sign in with Google
          </Button>
        </Grid>
        <Grid
          item
          id="logo-grid"
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
