// src/api/urlApi.js

// **IMPORTANT: Replace this with the actual URL of your backend server.**
// Example: If your backend is running on your machine on port 8080, it might be 'http://localhost:8080'
const API_BASE_URL = 'YOUR_BACKEND_API_URL';

/**
 * **YOUR EXAM REQUIREMENT: MANDATORY LOGGING INTEGRATION**
 * You MUST replace this console.log with your actual Logging Middleware you created.
 * Example: yourLoggingMiddleware.log(level, message, data);
 */
const logEvent = (level, message, data = {}) => {
  console.log(`[${level.toUpperCase()}] ${message}`, data); // Placeholder for your actual logging
  // Example if you had a logging library:
  // if (level === 'info') logger.info(message, data);
  // else if (level === 'error') logger.error(message, data);
  // else if (level === 'critical') logger.critical(message, data);
};


// Function to send a request to your backend to shorten a URL
export const shortenUrl = async (longUrl, validityMinutes, customShortcode) => {
  try {
    logEvent('info', 'Attempting to shorten URL', { longUrl, validityMinutes, customShortcode });
    const response = await fetch(`${API_BASE_URL}/shorten`, {
      method: 'POST', // We're sending data, so it's a POST request
      headers: {
        'Content-Type': 'application/json', // Telling the server we're sending JSON
      },
      // Convert our data into a JSON string for the request body
      body: JSON.stringify({
        longUrl,
        validityMinutes,
        customShortcode,
      }),
    });

    const data = await response.json(); // Parse the JSON response from the server

    if (!response.ok) { // If the server response was not successful (e.g., 400, 500 status)
      logEvent('error', 'Failed to shorten URL', { status: response.status, data });
      throw new Error(data.message || 'Failed to shorten URL'); // Throw an error with the server's message
    }

    logEvent('info', 'URL shortened successfully', data);
    return data; // Return the successful data (short URL, expiry, etc.)
  } catch (error) {
    logEvent('critical', 'Error during URL shortening API call', { error: error.message });
    throw error; // Re-throw the error so calling components can handle it
  }
};

// Function to fetch all shortened URLs from your backend
export const getAllShortenedUrls = async () => {
  try {
    logEvent('info', 'Fetching all shortened URLs');
    const response = await fetch(`${API_BASE_URL}/urls`); // Assuming your backend has an endpoint for this
    const data = await response.json();

    if (!response.ok) {
      logEvent('error', 'Failed to fetch all shortened URLs', { status: response.status, data });
      throw new Error(data.message || 'Failed to fetch URLs');
    }

    logEvent('info', 'Successfully fetched all shortened URLs', data);
    return data; // Return the list of URLs
  } catch (error) {
    logEvent('critical', 'Error during fetching all URLs API call', { error: error.message });
    throw error;
  }
};

// Function to get the original URL for a given shortcode (used for redirection)
export const getOriginalUrl = async (shortcode) => {
  try {
    logEvent('info', `Fetching original URL for shortcode: ${shortcode}`);
    const response = await fetch(`${API_BASE_URL}/resolve/${shortcode}`); // Assuming backend endpoint
    const data = await response.json();

    if (!response.ok) {
      logEvent('error', `Failed to resolve shortcode: ${shortcode}`, { status: response.status, data });
      throw new Error(data.message || 'Shortcode not found or expired');
    }

    logEvent('info', `Original URL resolved for ${shortcode}`, data);
    return data; // Expected: { originalUrl: "..." }
  } catch (error) {
    logEvent('critical', `Error during resolving shortcode API call for ${shortcode}`, { error: error.message });
    throw error;
  }
};