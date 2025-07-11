import React from 'react';
import { Routes, Route } from 'react-router-dom'; // Used to define our routes
import UrlShortenerPage from './pages/UrlShortenerPage'; // Our main URL shortening page
import UrlStatisticsPage from './pages/UrlStatisticsPage'; // Our statistics page
import RedirectPage from './pages/RedirectPage'; // Page to handle short URL redirection
import NavBar from './components/NavBar'; // Our navigation bar component
import { Box } from '@mui/material'; // A Material UI component for layout

function App() {
  return (
    <Box sx={{ flexGrow: 1 }}> {/* Main container, grows to fill space */}
      <NavBar /> {/* The navigation bar will always be at the top */}
      <Box component="main" sx={{ p: 3 }}> {/* Main content area with some padding */}
        {/* Routes define which component to show for which URL path */}
        <Routes>
          {/* When the path is just '/', show the UrlShortenerPage */}
          <Route path="/" element={<UrlShortenerPage />} />
          {/* When the path is '/statistics', show the UrlStatisticsPage */}
          <Route path="/statistics" element={<UrlStatisticsPage />} />
          {/* This route handles the redirection logic. ':shortcode' is a dynamic part of the URL */}
          <Route path="/:shortcode" element={<RedirectPage />} />
        </Routes>
      </Box>
    </Box>
  );
}

export default App; // Export App so index.js can use it