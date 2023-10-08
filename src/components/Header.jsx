import React from "react";
import logo from "../assets/budget buddy.png";
import {
  AppBar,
  Box,
  Grid,
  Toolbar,
  IconButton,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useTheme } from "@mui/material/styles";

function Header() {
  const theme = useTheme();

  return (
    <Box>
      <AppBar
        position="static"
        sx={{ backgroundColor: theme.palette.primary[1] }}
      >
        <Toolbar>
          <Grid container sx={{ pt: 4 }}>
            <Grid
              item
              xs={2}
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <IconButton edge="start" aria-label="menu">
                <MenuIcon
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
            <Grid
              item
              xs={8}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
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
                  Welcome back, David!
                </Typography>
              </Box>
            </Grid>
            <Grid
              item
              xs={2}
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              <Box
                component="img"
                src={logo}
                sx={{ maxHeight: "120px", aspectRatio: 2 / 3, }}
              ></Box>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;
