import HomePage from "./pages/HomePage";
import { useEffect, useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./Theme";
import LoginPage from "./pages/LoginPage";
import InsightsPage from "./pages/InsightsPage";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { checkIfLoggedIn } from "./utility/firebase";

const privateRoutes = [
  { path: "/home", component: () => <HomePage /> },
  { path: "/insights", component: () => <InsightsPage /> },
];

const publicRoutes = [{ path: "/login", component: () => <LoginPage /> }];

const App = () => {
  const isSignedIn = checkIfLoggedIn();

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route
            path="*"
            element={
              isSignedIn ? <Navigate to="/home" /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/"
            element={
              isSignedIn ? <Navigate to="/home" /> : <Navigate to="/login" />
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
                isSignedIn ? <route.component /> : <Navigate to="/login" />
              }
            />
          ))}
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
