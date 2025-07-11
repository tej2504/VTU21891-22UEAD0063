import React, { useEffect, useState } from 'react';
import { Box, Typography, Container, CircularProgress, Alert } from '@mui/material';
import StatisticsTable from '../components/StatisticsTable'; // Our table component
import useLocalStorage from '../hooks/useLocalStorage'; // Custom hook for localStorage

function UrlStatisticsPage() {
  // Retrieve all shortened URLs from local storage. This is our source of truth for statistics.
  const [shortenedUrls, setShortenedUrls] = useLocalStorage('shortenedUrls', []);
  const [loading, setLoading] = useState(false); // State for loading indicator
  const [error, setError] = useState(null); // State for error messages

  // Note: For this exam, the prompt implies client-side management of data (persistence).
  // So, we primarily rely on localStorage for this part. If you had a backend
  // that was the definitive source of all URLs, you would fetch them here.
  /*
  useEffect(() => {
    const fetchUrls = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getAllShortenedUrls(); // If you fetch from backend
        setShortenedUrls(data); // This would overwrite local storage, or you'd merge them.
      } catch (err) {
        setError('Failed to load statistics: ' + err.message);
      } finally {
        setLoading(false);
      }
    };
    // If you were fetching from backend, you'd uncomment this line:
    // fetchUrls();
  }, []);
  */

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" component="h1" gutterBottom align="center">
        URL Shortener Statistics
      </Typography>

      {loading && ( // Show loading spinner if loading
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {error && ( // Show error alert if there's an error
        <Alert severity="error" sx={{ mt: 4 }}>
          {error}
        </Alert>
      )}

      {!loading && !error && shortenedUrls.length === 0 && ( // Show message if no URLs found
        <Typography variant="body1" align="center" sx={{ mt: 4 }}>
          No shortened URLs created yet. Go to the "Shorten URL" page to create some!
        </Typography>
      )}

      {!loading && !error && shortenedUrls.length > 0 && ( // Show table if URLs exist
        <Box sx={{ mt: 4 }}>
          <StatisticsTable urls={shortenedUrls} />
        </Box>
      )}
    </Container>
  );
}

export default UrlStatisticsPage;