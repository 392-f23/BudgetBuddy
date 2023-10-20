import HomePage from "./pages/HomePage";
import { useEffect, useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { Box, CircularProgress } from "@mui/material";
import { theme } from "./Theme";
import LoginPage from "./pages/LoginPage";
import InsightsPage from "./pages/InsightsPage";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import {
  checkIfLoggedIn,
  isOnboarded as checkIfOnboarded,
} from "./utility/firebase";
import OnboardingScreen from "./pages/OnboardingScreen";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

const App = () => {
  const isSignedIn = checkIfLoggedIn();
  //keep track if user is onboarded based on back-end DB info!
  const [isOnboarded, setIsOnboarded] = useState(undefined);
  const [onboardedState, setIsOnboardedState] = useState(false);

  const privateRoutes = [
    { path: "/home", component: () => <HomePage /> },
    { path: "/insights", component: () => <InsightsPage /> },
  ];

  const publicRoutes = [{ path: "/login", component: () => <LoginPage /> }];

  useEffect(() => {
    const init = async () => {
      const onboarded = await checkIfOnboarded();
      setIsOnboarded(onboarded);
    };

    init();
  }, []);

  useEffect(() => {
    if (onboardedState) {
      setIsOnboarded(true);
    }
  }, [onboardedState]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ThemeProvider theme={theme}>
        {isOnboarded === undefined ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              width: "100%",
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <BrowserRouter forceRefresh={true}>
            {isSignedIn && !isOnboarded && <Navigate to="/onboarding" />}
            <Routes>
              <Route
                path="*"
                element={
                  isSignedIn ? (
                    <Navigate to="/home" />
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />
              <Route
                path="/"
                element={
                  isSignedIn ? (
                    <Navigate to="/home" />
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />
              <Route
                path="/onboarding"
                element={
                  isSignedIn ? (
                    onboardedState ? (
                      <Navigate to="/home" />
                    ) : (
                      <OnboardingScreen
                        setIsOnboardedState={setIsOnboardedState}
                      />
                    )
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />
              {publicRoutes.map((route) => (
                <Route
                  path={route.path}
                  key={route.path}
                  element={
                    isSignedIn ? <Navigate to="/home" /> : <route.component />
                  }
                />
              ))}
              {privateRoutes.map((route) => (
                <Route
                  path={route.path}
                  key={route.path}
                  element={
                    isSignedIn ? <route.component /> : <Navigate to="login" />
                  }
                />
              ))}
            </Routes>
          </BrowserRouter>
        )}
      </ThemeProvider>
    </LocalizationProvider>
  );
};

export default App;
