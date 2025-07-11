// src/utils/validation.js

// Function to check if a string is a valid URL
export const isValidUrl = (url) => {
  try {
    new URL(url); // JavaScript's built-in URL constructor validates URLs
    return true;
  } catch (e) {
    return false;
  }
};

// Function to check if validity minutes input is valid
export const isValidValidityMinutes = (minutes) => {
  // If the input is empty or undefined, it's valid (because it's optional and will default to 30)
  if (minutes === null || minutes === undefined || minutes === '') {
    return true;
  }
  const num = parseInt(minutes, 10); // Convert to integer
  return !isNaN(num) && num > 0; // Must be a number and greater than 0
};

// Function to check if a custom shortcode is valid
export const isValidShortcode = (shortcode) => {
  // If empty, it's valid (because it's optional and backend will generate one)
  if (shortcode === null || shortcode === undefined || shortcode === '') {
    return true;
  }
  // Use a regular expression:
  // ^[a-zA-Z0-9]{4,10}$
  // ^      - start of the string
  // [a-zA-Z0-9] - allows only alphanumeric characters (letters a-z, A-Z, and numbers 0-9)
  // {4,10} - must be between 4 and 10 characters long
  // $      - end of the string
  return /^[a-zA-Z0-9]{4,10}$/.test(shortcode);
};