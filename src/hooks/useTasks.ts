// hooks/useTasks.ts
import { useState, useEffect, useCallback } from "react";
import { Task } from "../types/task";

// Custom hook to manage tasks
const useTasks = () => {
  // State to store the tasks, initializing with saved tasks from localStorage (if any)
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem("tasks"); // Retrieve saved tasks from localStorage
    return savedTasks ? JSON.parse(savedTasks) : []; // If tasks exist, parse and use them, otherwise, initialize as an empty array
  });

  // Effect to update localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks)); // Save the updated tasks array to localStorage
  }, [tasks]); // This effect will run whenever the tasks state changes

  // Function to add a new task
  const addTask = useCallback((title: string) => {
    const newTask: Task = {
      id: Date.now().toString(), // Unique ID based on the current timestamp
      title, // The title of the task passed in
      isCompleted: false, // New tasks are not completed by default
      createdAt: new Date().toISOString(), // Current date and time when the task is created
    };
    setTasks((prev) => [...prev, newTask]); // Add the new task to the list of tasks
  }, []);

  // Function to toggle the completion state of a task
  const toggleTaskCompletion = useCallback((id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
      )
    ); // Toggle the completion status of the task with the given id
  }, []);

  // Function to delete a task by its ID
  const deleteTask = useCallback((id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id)); // Remove the task with the given id from the list
  }, []);

  // Returning the tasks and the functions for adding, toggling completion, and deleting tasks
  return { tasks, addTask, toggleTaskCompletion, deleteTask };
};

export default useTasks;
