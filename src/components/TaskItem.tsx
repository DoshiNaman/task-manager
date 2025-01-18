import React from "react"; // importing React
import {
  ListItem,
  ListItemText,
  Checkbox,
  IconButton,
  Typography,
} from "@mui/material"; // importing Material-UI components
import DeleteIcon from "@mui/icons-material/Delete"; // importing Material-UI DeleteIcon
import { Task } from "../types/task"; // importing Task type
import dayjs from "dayjs"; // importing dayjs for date formatting

// TaskItemProps interface to define the props required by TaskItem
interface TaskItemProps {
  task: Task; // task object containing task details
  toggleTaskCompletion: (id: string) => void; // function to toggle task completion
  deleteTask: (task: Task) => void; // function to delete the task
}

// TaskItem component wrapped with React.memo for memoization to avoid unnecessary re-renders
const TaskItem: React.FC<TaskItemProps> = React.memo(
  ({ task, toggleTaskCompletion, deleteTask }) => {
    // Rendering component
    return (
      <ListItem
        secondaryAction={
          <IconButton
            data-testid="deleteButton"
            edge="end"
            onClick={() => deleteTask(task)}
          >
            <DeleteIcon />
          </IconButton>
        }
      >
        <Checkbox
          edge="start"
          checked={task.isCompleted}
          onChange={() => toggleTaskCompletion(task.id)}
        />
        <ListItemText
          primary={task.title}
          secondary={
            <Typography variant="body2" color="text.secondary">
              Created: {dayjs(task.createdAt).format("MMM D, YYYY h:mm A")}
            </Typography>
          }
          sx={{
            textDecoration: task.isCompleted ? "line-through" : "none",
          }}
        />
      </ListItem>
    );
  }
);

export default TaskItem;
