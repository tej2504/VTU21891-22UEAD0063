import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // Hook to get URL parameters (like :shortcode)
import { Box, CircularProgress, Typography, Alert, Container } from '@mui/material';
import useLocalStorage from '../hooks/useLocalStorage'; // Custom hook to access stored URLs
// import { getOriginalUrl } from '../api/urlApi'; // Uncomment if fetching original URL from backend

function RedirectPage() {
  const { shortcode } = useParams(); // Get the 'shortcode' from the URL (e.g., 'abcd1' from /abcd1)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // Access the list of shortened URLs stored in local storage
  const [shortenedUrls, setShortenedUrls] = useLocalStorage('shortenedUrls', []);

  useEffect(() => {
    const redirectToOriginal = async () => {
      setLoading(true);
      setError(null);

      if (!shortcode) {
        setError('Invalid shortcode provided.');
        setLoading(false);
        return;
      }

      // **1. Client-Side Lookup:** Try to find the original URL in our local storage
      const foundUrl = shortenedUrls.find(
        (url) => url.shortUrl.endsWith(`/${shortcode}`) // Check if the short URL ends with our shortcode
      );

      if (foundUrl) {
        // Check expiry date if available and if it's in the past
        if (foundUrl.expiryDate && new Date(foundUrl.expiryDate) < new Date()) {
          setError('Short URL has expired.');
          setLoading(false);
          return;
        }

        // Increment clicks (this is a client-side update for demonstration).
        // For robust click tracking, this should be done on the backend.
        setShortenedUrls(prevUrls =>
          prevUrls.map(url =>
            url.shortUrl === foundUrl.shortUrl
              ? { ...url, clicks: (url.clicks || 0) + 1 } // Increment clicks
              : url
          )
        );

        // Perform the redirection! This replaces the current history entry.
        window.location.replace(foundUrl.originalUrl);
      } else {
        // **2. Fallback to Backend Lookup (Optional, but good practice for robustness):**
        // If the URL is not found client-side (e.g., browser cache cleared, or it was shortened by another user's session),
        // you might want to try fetching it from your backend.
        /*
        try {
          const backendResponse = await getOriginalUrl(shortcode); // API call to backend
          if (backendResponse && backendResponse.originalUrl) {
            window.location.replace(backendResponse.originalUrl);
          } else {
            setError('Short URL not found or expired.');
          }
        } catch (err) {
          setError('Failed to retrieve original URL: ' + err.message);
        } finally {
          setLoading(false);
        }
        */
        // If not using backend fallback, just set the error
        setError('Short URL not found or expired.');
        setLoading(false);
      }
    };

    redirectToOriginal();
  }, [shortcode, shortenedUrls, setShortenedUrls]); // Dependencies for useEffect: re-run if shortcode or URLs change

  return (
    <Container maxWidth="sm" sx={{ mt: 5, textAlign: 'center' }}>
      {loading && ( // Show loading spinner and message while redirecting
        <Box>
          <CircularProgress />
          <Typography variant="h6" sx={{ mt: 2 }}>
            Redirecting...
          </Typography>
        </Box>
      )}

      {error && ( // Show error alert if redirection fails
        <Alert severity="error" sx={{ mt: 4 }}>
          {error}
        </Alert>
      )}

      {!loading && !error && ( // Message if redirection is not automatic (shouldn't happen often)
        <Typography variant="body1" sx={{ mt: 4 }}>
          If you are not redirected automatically, please check the URL.
        </Typography>
      )}
    </Container>
  );
}

export default RedirectPage;