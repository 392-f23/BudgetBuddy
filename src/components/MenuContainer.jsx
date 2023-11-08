import { useState } from "react";
import {
  Box,
  Drawer,
  Toolbar,
  IconButton,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  styled,
  useTheme,
  Grid,
  AppBar as MuiAppBar,
} from "@mui/material";
import { ChevronLeft, Menu, Home, Logout, Insights } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import logo from "../assets/budget buddy.png";
import { handleLogOut } from "../utility/firebase";
import logoNeutral from "../assets/budget buddy.png";
import logoGood from "../assets/budget_buddy_good.png";
import logoEvil from "../assets/budget_buddy_evil.png";

const drawerWidth = 360;

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "space-between",
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Main = styled("div", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: "10% 0",
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const MenuContainer = (props) => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const navigate = useNavigate();
  const userName = localStorage.getItem("name");
  const photoUrl = localStorage.getItem("photoUrl");

  const budget = props.data.budget ? props.data.budget : 0;
  const totalSpent = props.totalExpenses ? props.totalExpenses : 0;

  const spendingBreakpoints = [budget / 3, (budget * 2) / 3, budget];

  var logo =
    totalSpent <= spendingBreakpoints[0]
      ? logoGood
      : totalSpent <= spendingBreakpoints[1]
      ? logoNeutral
      : logoEvil;

  const handleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: "flex", height: "100%" }}>
      <AppBar data-testid="MenuComp" sx={{ backgroundColor: theme.palette.primary[1] }} open={open}>
        <Toolbar>
          <Grid container >
            <Grid
              item
              xs={2}
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <IconButton
                data-cy="Menu"
                onClick={handleDrawer}
                edge="start"
                sx={{ mr: 2, ...(open && { display: "none" }) }}
              >
                <Menu 
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
              xs={7}
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
                  style={{ color: theme.palette.text[1], textAlign: "center" }}
                >
                  {`Welcome back, ${userName}!`}
                </Typography>
              </Box>
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
              <Box
                component="img"
                src={logo}
                sx={{ maxHeight: "120px", aspectRatio: 2 / 3 }}
              ></Box>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: theme.palette.primary[1],
            color: "#ffffff",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader sx={{ minHeight: "120px" }}>
          <Box
            component="img"
            src={photoUrl}
            sx={{ width: "40px", height: "40px", borderRadius: "50%" }}
          />
          <Typography data-cy="Name" variant="h6" style={{ color: theme.palette.text[2] }}>
            {`Hello, ${userName}!`}
          </Typography>
          <IconButton onClick={handleDrawer}>
            <ChevronLeft
              style={{
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.primary[2],
                padding: "8px",
                borderRadius: "50%",
                fontSize: "1.8rem",
              }}
            />
          </IconButton>
        </DrawerHeader>
        <Divider sx={{ backgroundColor: "#ffffff" }} />
        <List>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => navigate("/home")}
              sx={{
                minHeight: "80px",
                "&:hover": {
                  backgroundColor: theme.palette.primary.main,
                },
              }}
            >
              <ListItemIcon sx={{ color: "#ffffff" }}>
                <Home />
              </ListItemIcon>
              <ListItemText primary={"Home"} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              data-cy="insights"
              onClick={() => navigate("/insights")}
              sx={{
                minHeight: "80px",
                "&:hover": {
                  backgroundColor: theme.palette.primary.main,
                },
              }}
            >
              <ListItemIcon sx={{ color: "#ffffff" }}>
                <Insights />
              </ListItemIcon>
              <ListItemText primary={"Insights"} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => handleLogOut(navigate)}
              sx={{
                minHeight: "80px",
                "&:hover": {
                  backgroundColor: theme.palette.primary.main,
                },
              }}
            >
              <ListItemIcon sx={{ color: "#ffffff" }}>
                <Logout />
              </ListItemIcon>
              <ListItemText primary={"Logout"} />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        {props.children}
      </Main>
    </Box>
  );
};

export default MenuContainer;
