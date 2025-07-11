import React, { useState } from 'react';
import { Box, Typography, Button, Container, Alert, Snackbar } from '@mui/material';
import ShortenForm from '../components/ShortenForm'; // Our individual form component
import ShortenedUrlCard from '../components/ShortenedUrlCard'; // Component to display shortened URL result
import { shortenUrl } from '../api/urlApi'; // Our API call function
import useLocalStorage from '../hooks/useLocalStorage'; // Custom hook for localStorage

const MAX_URLS_TO_SHORTEN = 5; // As per requirements, allow up to 5 concurrent URLs

function UrlShortenerPage() {
  // State to manage the input forms for up to 5 URLs
  const [forms, setForms] = useState(
    Array(MAX_URLS_TO_SHORTEN).fill({ longUrl: '', validityMinutes: '', customShortcode: '' })
  );
  // State to store the results of successfully shortened URLs (for immediate display)
  const [results, setResults] = useState([]);
  // States for the Snackbar (pop-up message)
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  // Use local storage to persist *all* shortened URLs for the statistics page
  // This will store URLs even after the browser is closed and reopened
  const [allShortenedUrls, setAllShortenedUrls] = useLocalStorage('shortenedUrls', []);

  // Handler for input changes in any of the 5 forms
  const handleInputChange = (index, field, value) => {
    const newForms = [...forms]; // Create a copy of the forms array
    newForms[index] = { ...newForms[index], [field]: value }; // Update the specific form at 'index'
    setForms(newForms); // Update the state
  };

  // Handler for submitting a specific form (after client-side validation)
  const handleSubmit = async (index) => {
    const { longUrl, validityMinutes, customShortcode } = forms[index];

    // Client-side validation is already handled within ShortenForm before calling onSubmit.
    // So, we can assume the data passed here is validated on the client side.

    try {
      // Make the API call to your backend
      const response = await shortenUrl(longUrl, validityMinutes, customShortcode);

      // Create a new result object, including a unique ID and initial clicks
      const newResult = {
        id: Date.now() + Math.random(), // Simple unique ID for list keys
        originalUrl: longUrl,
        shortUrl: response.shortUrl, // From backend response
        expiryDate: response.expiryDate, // From backend response
        clicks: 0, // Initialize clicks for newly shortened URL
      };

      setResults((prevResults) => [...prevResults, newResult]); // Add to results for immediate display
      setAllShortenedUrls((prevUrls) => [...prevUrls, newResult]); // Add to global list for statistics page persistence

      // Show success message
      setSnackbarMessage('URL shortened successfully!');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);

      // Clear the form fields after successful submission
      const newForms = [...forms];
      newForms[index] = { longUrl: '', validityMinutes: '', customShortcode: '' };
      setForms(newForms);

    } catch (error) {
      // Show error message
      setSnackbarMessage(`Error: ${error.message}`);
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  // Handler to close the Snackbar
  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <Container maxWidth="md"> {/* Material UI Container for centering and max-width */}
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Shorten Your URLs
      </Typography>

      <Typography variant="body1" align="center" sx={{ mb: 4 }}>
        Enter up to {MAX_URLS_TO_SHORTEN} URLs to shorten concurrently.
      </Typography>

      <Box sx={{ display: 'grid', gap: 3 }}> {/* Grid layout for the forms with spacing */}
        {forms.map((form, index) => (
          <ShortenForm
            key={index} // Unique key for list items
            index={index}
            form={form}
            onInputChange={handleInputChange}
            onSubmit={handleSubmit}
          />
        ))}
      </Box>

      {results.length > 0 && ( // Only show results section if there are results
        <Box sx={{ mt: 5 }}>
          <Typography variant="h5" component="h2" gutterBottom>
            Your Shortened URLs
          </Typography>
          <Box sx={{ display: 'grid', gap: 2 }}>
            {results.map((result) => (
              <ShortenedUrlCard key={result.id} result={result} /> // Display each shortened URL
            ))}
          </Box>
        </Box>
      )}

      {/* Snackbar component for showing notifications */}
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default UrlShortenerPage;