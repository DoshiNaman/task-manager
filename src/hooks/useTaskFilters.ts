import { useState } from "react";

// Custom hook to manage task filters
const useTaskFilters = () => {
  // State to control the visibility of filters
  const [showFilters, setShowFilters] = useState<boolean>(true);

  // State to store the search query for filtering tasks by title
  const [searchQuery, setSearchQuery] = useState("");

  // State to store the selected date filter (could be a date string or null)
  const [dateFilter, setDateFilter] = useState<string | null>(null);

  // State to control whether completed tasks should be shown
  const [showCompleted, setShowCompleted] = useState<boolean>(true);

  // Function to reset all filters to their default values
  const resetFilters = () => {
    setSearchQuery(""); // Clear search query
    setDateFilter(null); // Clear date filter
    setShowCompleted(true); // Show completed tasks by default
  };

  // Returning all states and functions related to task filters
  return {
    searchQuery, // current search query
    setSearchQuery, // function to update search query
    dateFilter, // current date filter
    setDateFilter, // function to update date filter
    showCompleted, // flag to show completed tasks
    setShowCompleted, // function to toggle completed task visibility
    resetFilters, // function to reset filters
    showFilters, // flag to show or hide filters
    setShowFilters, // function to toggle filter visibility
  };
};

export default useTaskFilters;
