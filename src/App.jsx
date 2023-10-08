import { useState } from "react";
import HomePage from "./pages/HomePage";
import ExpenseSection from "./components/ExpenseSection";
import { ThemeProvider } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Header from "./components/Header";
import { theme } from "./Theme";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Container>
        <HomePage />
        <hr />
        <ExpenseSection />
      </Container>
    </ThemeProvider>
  );
};

export default App;
