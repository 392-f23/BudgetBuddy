import HomePage from "./pages/HomePage";
import {useState} from 'react'
import { ThemeProvider } from "@mui/material/styles";
import Header from "./components/Header";
import { theme } from "./Theme";
import LoginPage from './pages/LoginPage';
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />}></Route>
          <Route path="/home" element={<HomePage />}></Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
