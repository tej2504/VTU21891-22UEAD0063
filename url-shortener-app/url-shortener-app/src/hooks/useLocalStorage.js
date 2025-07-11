// src/hooks/useLocalStorage.js

import { useState, useEffect } from 'react';

// A custom React Hook to easily save and load data from the browser's localStorage
function useLocalStorage(key, initialValue) {
  // State to store our value. We calculate the initial value once.
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key); // Try to get item from localStorage
      return item ? JSON.parse(item) : initialValue; // Parse if found, otherwise use initialValue
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return initialValue; // Return initial value on error
    }
  });

  // useEffect to update local storage whenever the storedValue changes
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue)); // Save the value as a JSON string
    } catch (error) {
      console.error('Error writing to localStorage:', error);
    }
  }, [key, storedValue]); // Dependency array: run this effect when key or storedValue changes

  return [storedValue, setStoredValue]; // Return the value and its setter function
}

export default useLocalStorage;