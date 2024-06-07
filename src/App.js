import React, { useState, useMemo } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import ItemList from './components/ItemList';
import Weather from './components/Weather';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const theme = useMemo(() =>
    createTheme({
      palette: {
        mode: isDarkMode ? 'dark' : 'light',
        primary: {
          main: isDarkMode ? '#90caf9' : '#1976d2',
        },
        background: {
          default: isDarkMode ? '#121212' : '#f5f5f5',
          paper: isDarkMode ? '#1d1d1d' : '#fff',
        },
      },
    }), [isDarkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Navbar toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
        <Routes>
          <Route path="/" element={<ItemList />} />
          <Route path="/weather" element={<Weather />} />
         
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
