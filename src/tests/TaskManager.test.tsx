// TaskManager.test.tsx

// Importing necessary libraries for testing
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "../App";

// Describing the test suite for the App component
describe("App Component", () => {
  // Test to verify if the App component renders correctly
  test("renders the App component", () => {
    render(<App />);
    const linkElement = screen.getByText(/Task Manager/i); // Check if the Task Manager text is rendered
    expect(linkElement).toBeInTheDocument(); // Assert that the link element is present in the document
  });

  // Test to ensure that the initial state has no tasks
  test("initial state contains no tasks", () => {
    render(<App />);
    const linkElement = screen.getByText(/No tasks available./i); // Check for the text indicating no tasks
    expect(linkElement).toBeInTheDocument(); // Assert that the 'No tasks available' message is displayed
  });

  // Test to add a new task and check if it's displayed
  test("add a new task and display it", () => {
    render(<App />);

    const inputElement = screen.getByPlaceholderText("Task Title"); // Get the input element for task title
    const buttonElement = screen.getByText(/Add/i); // Get the button to add a task

    // Simulate entering text into the input field and clicking the add button
    fireEvent.change(inputElement, { target: { value: "Test Task" } });
    fireEvent.click(buttonElement);

    // Assert that the new task is displayed on the screen
    expect(screen.getByText("Test Task")).toBeInTheDocument();
  });

  // Test to verify that a task can be deleted
  test("delete a task", async () => {
    render(<App />);

    const inputElement = screen.getByPlaceholderText("Task Title");
    const buttonElement = screen.getByText(/Add/i);

    // Add a task first
    fireEvent.change(inputElement, { target: { value: "Task to Delete" } });
    fireEvent.click(buttonElement);

    const checkBoxes = screen.getAllByRole("checkbox"); // Get all checkboxes for tasks
    fireEvent.click(checkBoxes[3]); // Click the checkbox of the task

    const deleteButton = screen.getAllByTestId("deleteButton"); // Get all delete buttons for tasks
    fireEvent.click(deleteButton[1]); // Click the delete button of the task

    // Assert that the task has been removed from the screen
    expect(screen.queryByText("Task to Delete")).not.toBeInTheDocument();
  });

  // Test to ensure that tasks are not added when the input is empty or just contains whitespace
  test("does not add task when input is empty", () => {
    render(<App />);

    const inputElement = screen.getByPlaceholderText("Task Title");
    const buttonElement = screen.getByText(/Add/i);

    // Simulate entering only whitespace and clicking add
    fireEvent.change(inputElement, { target: { value: "\u00A0\u00A0" } });
    fireEvent.click(buttonElement);
    fireEvent.change(inputElement, { target: { value: "" } });

    // Ensure that no task is added when input is empty or just whitespace
    expect(screen.queryByText("\u00A0\u00A0")).not.toBeInTheDocument();
  });

  // Test to check that multiple tasks can be added and displayed correctly
  test("handles multiple tasks correctly", () => {
    render(<App />);

    const inputElement = screen.getByPlaceholderText("Task Title");
    const buttonElement = screen.getByText(/Add/i);

    // Add two tasks and check if both appear
    fireEvent.change(inputElement, { target: { value: "Task 1" } });
    fireEvent.click(buttonElement);

    fireEvent.change(inputElement, { target: { value: "Task 2" } });
    fireEvent.click(buttonElement);

    // Assert both tasks are displayed
    expect(screen.getByText("Task 1")).toBeInTheDocument();
    expect(screen.getByText("Task 2")).toBeInTheDocument();
  });
});
