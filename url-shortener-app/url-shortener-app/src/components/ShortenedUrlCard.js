import React from 'react';
import { Card, CardContent, Typography, Box, Link as MuiLink } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy'; // Icon for copy
import LaunchIcon from '@mui/icons-material/Launch'; // Icon for launching
import { IconButton } from '@mui/material';
import { useState } from 'react';
import { Snackbar, Alert } from '@mui/material'; // For showing success messages

function ShortenedUrlCard({ result }) {
  const { originalUrl, shortUrl, expiryDate } = result;
  const [snackbarOpen, setSnackbarOpen] = useState(false); // State for snackbar visibility

  const handleCopyClick = () => {
    navigator.clipboard.writeText(shortUrl); // Copies the text to clipboard
    setSnackbarOpen(true); // Show success snackbar
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return; // Don't close if clicked away
    }
    setSnackbarOpen(false); // Close snackbar
  };

  // Extract shortcode from the full short URL for client-side redirection
  // Example: 'http://localhost:3000/abcd1' -> 'abcd1'
  const shortcode = shortUrl.split('/').pop();
  // Construct the client-side URL which our React app handles
  const clientSideShortUrl = `${window.location.origin}/${shortcode}`;

  return (
    <Card variant="outlined"> {/* Card component for displaying information */}
      <CardContent>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Original URL:
        </Typography>
        <Typography variant="body1" sx={{ wordWrap: 'break-word', mb: 1 }}>
          {/* Link to the original URL, opens in a new tab */}
          <MuiLink href={originalUrl} target="_blank" rel="noopener noreferrer">
            {originalUrl}
          </MuiLink>
        </Typography>

        <Typography variant="body2" color="text.secondary" gutterBottom>
          Shortened URL:
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Typography variant="h6" color="primary" sx={{ flexGrow: 1, wordWrap: 'break-word' }}>
            {/* Link to the client-side route, which will then redirect */}
            <MuiLink href={clientSideShortUrl} target="_blank" rel="noopener noreferrer">
              {shortUrl}
            </MuiLink>
          </Typography>
          {/* Button to copy the short URL */}
          <IconButton onClick={handleCopyClick} aria-label="copy short URL" size="small">
            <ContentCopyIcon fontSize="small" />
          </IconButton>
          {/* Button to open the short URL (which triggers our client-side redirect) */}
          <IconButton href={clientSideShortUrl} target="_blank" rel="noopener noreferrer" aria-label="open short URL" size="small">
            <LaunchIcon fontSize="small" />
          </IconButton>
        </Box>

        <Typography variant="body2" color="text.secondary">
          Expires: {new Date(expiryDate).toLocaleString()} {/* Display formatted expiry date */}
        </Typography>
      </CardContent>
      {/* Snackbar for copy success message */}
      <Snackbar open={snackbarOpen} autoHideDuration={2000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          Short URL copied!
        </Alert>
      </Snackbar>
    </Card>
  );
}

export default ShortenedUrlCard;