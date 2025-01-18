import { useState, useEffect } from "react";

// Custom hook to manage theme (dark or light mode)
const useTheme = () => {
  // State to store whether dark mode is enabled, initialized from localStorage
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    return localStorage.getItem("theme") === "dark"; // Retrieve theme from localStorage (defaults to dark mode if stored)
  });

  // Function to toggle the theme between dark and light
  const handleThemeToggle = () => {
    setIsDarkMode((prevMode) => !prevMode); // Toggle the theme
  };

  // Effect to update localStorage whenever the theme changes
  useEffect(() => {
    localStorage.setItem("theme", isDarkMode ? "dark" : "light"); // Save the current theme to localStorage
  }, [isDarkMode]); // This effect runs whenever the `isDarkMode` state changes

  // Returning the current theme state and the function to toggle it
  return { isDarkMode, handleThemeToggle };
};

export default useTheme;
