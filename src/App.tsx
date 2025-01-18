// Importing React and necessary hooks from React library
import React, { useMemo } from "react";
// Importing components and utilities from MUI (Material UI)
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  Container,
  Typography,
  Box,
  Switch,
  FormControlLabel,
  TextField,
  Checkbox,
  Card,
  CardContent,
  Grid,
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
} from "@mui/material";
// Importing custom components
import TaskList from "./components/TaskList";
import AddTaskForm from "./components/AddTaskForm";
// Importing dayjs for date handling
import dayjs from "dayjs";
// Importing icons
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
// Importing custom components and hooks
import TaskFilterInput from "./components/TaskFilterInput";
import useTasks from "./hooks/useTasks";
import useTheme from "./hooks/useTheme";
import useTaskFilters from "./hooks/useTaskFilters";
// Importing types
import { Task } from "./types/task";

const App: React.FC = () => {
  // Destructuring data and functions from custom hooks
  const { tasks, addTask, toggleTaskCompletion, deleteTask } = useTasks();
  const { isDarkMode, handleThemeToggle } = useTheme();
  const {
    searchQuery,
    setSearchQuery,
    dateFilter,
    setDateFilter,
    showCompleted,
    setShowCompleted,
    resetFilters,
    showFilters,
    setShowFilters,
  } = useTaskFilters();

  // Memoizing the theme based on dark mode state
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: isDarkMode ? "dark" : "light",
        },
      }),
    [isDarkMode]
  );

  // Memoizing filtered tasks based on various filters
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesSearch = task.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesDate = dateFilter
        ? dayjs(task.createdAt).isSame(dayjs(dateFilter), "day")
        : true;
      const matchesCompletion = showCompleted || !task.isCompleted;
      return matchesSearch && matchesDate && matchesCompletion;
    });
  }, [tasks, searchQuery, dateFilter, showCompleted]);

  // State variables for handling dialog state
  const [confirmDialogOpen, setConfirmDialogOpen] = React.useState(false);
  const [taskToDelete, setTaskToDelete] = React.useState<Task | null>(null);

  // Function to handle task deletion
  const handleDelete = (task: Task) => {
    if (!task.isCompleted) {
      setTaskToDelete(task);
      setConfirmDialogOpen(true);
    } else {
      deleteTask(task.id);
    }
  };

  // Function to confirm the deletion of a task
  const confirmDeleteTask = () => {
    if (taskToDelete) {
      deleteTask(taskToDelete.id);
    }
    setTaskToDelete(null);
    setConfirmDialogOpen(false);
  };

  // Rendering component
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="md">
        <Box
          sx={{
            pt: 4,
            mb: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              color: "primary.main",
              fontSize: { xs: "1.8rem", sm: "2.5rem" },
            }}
          >
            Task Manager
          </Typography>
          <FormControlLabel
            control={
              <Switch checked={isDarkMode} onChange={handleThemeToggle} />
            }
            label={isDarkMode ? "Dark Mode" : "Light Mode"}
          />
        </Box>

        {/* Filters Toggle Button */}
        <Box
          sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mb: 2 }}
        >
          {showFilters && (
            <Button
              onClick={resetFilters}
              variant="outlined"
              color="secondary"
              sx={{
                textTransform: "none",
              }}
            >
              Reset Filters
            </Button>
          )}
          <Button
            onClick={() => setShowFilters((prev) => !prev)}
            startIcon={<FilterAltIcon />}
            variant="contained"
            color="primary"
            sx={{ textTransform: "none" }}
          >
            {showFilters ? "Hide Filters" : "Show Filters"}
          </Button>
        </Box>

        {/* Filters Section */}
        {showFilters && (
          <Card sx={{ mb: 4, p: 0.5 }}>
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <TaskFilterInput
                    setSearchQuery={setSearchQuery}
                    searchQuery={searchQuery}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    label="Filter by Date"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    value={dateFilter || ""}
                    onChange={(e) => setDateFilter(e.target.value || null)}
                    fullWidth
                    sx={{ backgroundColor: "background.paper" }}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={showCompleted}
                        onChange={(e) => setShowCompleted(e.target.checked)}
                      />
                    }
                    label="Show Completed Tasks"
                    sx={{ color: "text.secondary" }}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        )}

        <AddTaskForm addTask={addTask} />

        {/* Task List */}
        <Box mt={2}>
          {filteredTasks.length > 0 ? (
            <TaskList
              tasks={filteredTasks}
              toggleTaskCompletion={toggleTaskCompletion}
              deleteTask={handleDelete}
            />
          ) : (
            <Box
              sx={{
                mt: 4,
                textAlign: "center",
                color: "text.secondary",
              }}
            >
              <EmojiEmotionsIcon
                sx={{ fontSize: 50, mb: 1, color: "primary.main" }}
              />
              <Typography
                variant="h6"
                sx={{ fontSize: { xs: "1rem", sm: "1.5rem" } }}
              >
                No tasks available.
              </Typography>
            </Box>
          )}
        </Box>

        {/* Confirmation Dialog */}
        <Dialog
          open={confirmDialogOpen}
          onClose={() => setConfirmDialogOpen(false)}
        >
          <DialogTitle>
            Are you sure you want to delete an uncompleted task?
          </DialogTitle>
          <DialogActions>
            <Button
              onClick={() => setConfirmDialogOpen(false)}
              sx={{ color: "text.secondary" }}
            >
              Cancel
            </Button>
            <Button
              onClick={confirmDeleteTask}
              color="error"
              variant="contained"
              sx={{ color: "white" }}
              data-testid="deleteButton2"
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </ThemeProvider>
  );
};

export default App;
