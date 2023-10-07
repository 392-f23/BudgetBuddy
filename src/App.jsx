import { useState } from 'react';
import HomePage from './pages/HomePage';
import ExpenseSection from './components/ExpenseSection';
import './App.css';
import { ThemeProvider } from '@mui/material/styles';
import {theme} from './Theme';

const App = () => {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <HomePage />
        <hr/>
        <ExpenseSection />
      </ThemeProvider>
    </div>
  );
};

export default App;
