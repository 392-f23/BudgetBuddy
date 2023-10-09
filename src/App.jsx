import HomePage from "./pages/HomePage";
import { ThemeProvider } from "@mui/material/styles";
import Header from "./components/Header";
import { theme } from "./Theme";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <HomePage />
    </ThemeProvider>
  );
};

export default App;
