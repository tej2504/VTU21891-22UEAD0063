import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material'; // Material UI components
import { Link } from 'react-router-dom'; // For navigation links

function NavBar() {
  return (
    <AppBar position="static"> {/* AppBar is like a header bar */}
      <Toolbar> {/* Toolbar holds items in the AppBar */}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          URL Shortener {/* Title of our app */}
        </Typography>
        <Box>
          {/* Button that links to the home page ('/') */}
          <Button color="inherit" component={Link} to="/">
            Shorten URL
          </Button>
          {/* Button that links to the statistics page ('/statistics') */}
          <Button color="inherit" component={Link} to="/statistics">
            Statistics
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar; // Export the component for use in App.js