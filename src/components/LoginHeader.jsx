import {
  AppBar,
  Toolbar,
  Grid,
  Box,
  Typography,
  useTheme,
} from "@mui/material";

const LoginHeader = () => {
  const theme = useTheme();

  return (
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
              <Typography variant="h1" style={{ color: theme.palette.text[1] }}>
                BudgetBuddy
              </Typography>
              <Typography variant="h6" style={{ color: theme.palette.text[1] }}>
                Sign in below
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default LoginHeader;
