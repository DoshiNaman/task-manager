import React, { useState } from "react"; // importing React and useState hook
import { Box, Button, TextField } from "@mui/material"; // importing MUI components

// declaring interface for AddTaskFormProps
interface AddTaskFormProps {
  addTask: (title: string) => void; // function to add task with title as argument
}

const AddTaskForm: React.FC<AddTaskFormProps> = ({ addTask }) => {
  const [title, setTitle] = useState(""); // state to store task title
  const [error, setError] = useState(""); // state to store error message

  // handleSubmit function to handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError("Task title is required");
      return;
    }
    if (title.length > 40) {
      setError("Task title max length of 40 characters reached");
      return;
    }
    addTask(title.trim());
    setTitle("");
    setError("");
  };

  // Rendering component
  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: "flex", gap: 2 }}
    >
      <TextField
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        label="Task Title"
        error={!!error}
        helperText={error}
        aria-label="task-input"
        fullWidth
        placeholder="Task Title"
      />
      <Button type="submit" variant="contained" sx={{ flexShrink: 0 }}>
        Add
      </Button>
    </Box>
  );
};

export default AddTaskForm;
