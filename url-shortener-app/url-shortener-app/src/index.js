import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Import our global CSS
import App from './App'; // Import our main App component
import { BrowserRouter } from 'react-router-dom'; // For routing
import { ThemeProvider, createTheme } from '@mui/material/styles'; // For Material UI styling
import CssBaseline from '@mui/material/CssBaseline'; // For consistent Material UI styles

// Define a basic Material UI theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // A nice blue color for primary elements
    },
    secondary: {
      main: '#dc004e', // A red accent color
    },
  },
});

// This is where your React app gets attached to the HTML page
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* BrowserRouter enables routing in our app */}
    <BrowserRouter>
      {/* ThemeProvider applies our Material UI theme */}
      <ThemeProvider theme={theme}>
        {/* CssBaseline provides a consistent CSS baseline across browsers */}
        <CssBaseline />
        {/* Our main App component will be rendered here */}
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);