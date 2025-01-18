import { TextField } from "@mui/material"; // importing MUI TextField component
import { useState, useEffect } from "react"; // importing useState and useEffect hooks

const TaskFilterInput: React.FC<{
  // declaring the TaskFilterInput functional component
  setSearchQuery: (query: string) => void; // prop to update the search query
  searchQuery: string; // prop to hold the current search query
}> = ({ setSearchQuery, searchQuery }) => {
  // destructuring props in the component

  const [debouncedSearch, setDebouncedSearch] = useState(""); // state to store the debounced search value

  // Update debouncedSearch when searchQuery prop changes
  useEffect(() => {
    setDebouncedSearch(searchQuery);
  }, [searchQuery]);

  // Debounce effect to update the search query after 500ms delay
  useEffect(() => {
    const timeout = setTimeout(() => {
      setSearchQuery(debouncedSearch);
    }, 500); // Debounce for 500ms

    return () => clearTimeout(timeout);
  }, [debouncedSearch]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDebouncedSearch(e.target.value);
  };

  // Rendering component
  return (
    <TextField
      label="Search Task Title"
      variant="outlined"
      placeholder="Search tasks"
      value={debouncedSearch}
      onChange={handleSearchChange}
      fullWidth
      sx={{ backgroundColor: "background.paper" }}
    />
  );
};

export default TaskFilterInput;
