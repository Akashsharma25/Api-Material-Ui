import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';
import { CssBaseline, Switch } from '@mui/material';
import { useState } from 'react';

const Navbar = ({ toggleTheme, isDarkMode }) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          API Integration App
        </Typography>
        <Link to="/" style={{ color: 'inherit', textDecoration: 'none', marginRight: 16 }}>Home</Link>
        <Link to="/weather" style={{ color: 'inherit', textDecoration: 'none', marginRight: 16 }}>Weather</Link>
        <Switch checked={isDarkMode} onChange={toggleTheme} />
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
