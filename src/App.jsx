import HomePage from "./pages/HomePage";
import ExpenseSection from "./components/ExpenseSection";
import { Divider } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./Theme";

const App = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <HomePage />
        <Divider sx={{ backgroundColor: theme.palette.text.primary }} />
        <ExpenseSection />
      </ThemeProvider>
    </>
  );
};

export default App;
