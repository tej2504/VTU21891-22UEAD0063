import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Paper, Typography } from '@mui/material';
import { isValidUrl, isValidValidityMinutes, isValidShortcode } from '../utils/validation'; // Our validation functions

function ShortenForm({ index, form, onInputChange, onSubmit }) {
  // State to manage error messages for each input field
  const [urlError, setUrlError] = useState('');
  const [validityError, setValidityError] = useState('');
  const [shortcodeError, setShortcodeError] = useState('');

  // Effect to clear errors whenever the form input changes
  useEffect(() => {
    setUrlError('');
    setValidityError('');
    setShortcodeError('');
  }, [form.longUrl, form.validityMinutes, form.customShortcode]);

  const validateAndSubmit = () => {
    let isValid = true; // Flag to track if all inputs are valid

    // Validate Long URL
    if (!form.longUrl) {
      setUrlError('Original URL is required.');
      isValid = false;
    } else if (!isValidUrl(form.longUrl)) {
      setUrlError('Please enter a valid URL (e.g., https://example.com).');
      isValid = false;
    } else {
      setUrlError(''); // Clear error if valid
    }

    // Validate Validity Period
    if (!isValidValidityMinutes(form.validityMinutes)) {
      setValidityError('Validity must be a positive integer in minutes.');
      isValid = false;
    } else {
      setValidityError('');
    }

    // Validate Custom Shortcode
    if (!isValidShortcode(form.customShortcode)) {
      setShortcodeError('Shortcode must be alphanumeric and 4-10 characters long.');
      isValid = false;
    } else {
      setShortcodeError('');
    }

    if (isValid) {
      onSubmit(index); // If all validations pass, submit the form for this index
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3 }}> {/* Paper is a Material UI component for elevated surfaces */}
      <Typography variant="h6" gutterBottom>
        URL #{index + 1} {/* Display which form number it is */}
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}> {/* Box for layout with spacing */}
        <TextField
          label="Original Long URL" // Label for the input
          variant="outlined" // Style of the input field
          fullWidth // Takes full width
          value={form.longUrl} // The current value of the input
          onChange={(e) => onInputChange(index, 'longUrl', e.target.value)} // Update state on change
          error={!!urlError} // Show error state if urlError is present
          helperText={urlError} // Display the error message
          placeholder="e.g., https://verylongexample.com/some/path/to/resource"
        />
        <TextField
          label="Validity Period (minutes, optional, default 30)"
          variant="outlined"
          fullWidth
          type="number" // Restricts input to numbers
          value={form.validityMinutes}
          onChange={(e) => onInputChange(index, 'validityMinutes', e.target.value)}
          error={!!validityError}
          helperText={validityError}
          placeholder="e.g., 60"
        />
        <TextField
          label="Custom Shortcode (optional)"
          variant="outlined"
          fullWidth
          value={form.customShortcode}
          onChange={(e) => onInputChange(index, 'customShortcode', e.target.value)}
          error={!!shortcodeError}
          helperText={shortcodeError}
          placeholder="e.g., mycode123"
        />
        <Button variant="contained" onClick={validateAndSubmit}>
          Shorten URL {/* Button to trigger submission */}
        </Button>
      </Box>
    </Paper>
  );
}

export default ShortenForm;