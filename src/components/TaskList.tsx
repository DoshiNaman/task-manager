import React from "react"; // importing React
import TaskItem from "./TaskItem"; // importing TaskItem component
import { Task } from "../types/task"; // importing Task type
import { FixedSizeList as List, ListChildComponentProps } from "react-window"; // importing react-window for virtualized list

// TaskListProps interface to define the props required by TaskList
interface TaskListProps {
  tasks: Task[]; // array of tasks to display
  toggleTaskCompletion: (id: string) => void; // function to toggle task completion
  deleteTask: (task: Task) => void; // function to delete the task
}

// TaskList component to render the list of tasks using react-window for virtualization
const TaskList: React.FC<TaskListProps> = ({
  tasks,
  toggleTaskCompletion,
  deleteTask,
}) => {
  // Rendering component
  return (
    <List height={400} itemCount={tasks.length} itemSize={70} width="100%">
      {({ index, style }: ListChildComponentProps) => (
        <div style={style}>
          <TaskItem
            key={index}
            task={tasks[index]}
            toggleTaskCompletion={toggleTaskCompletion}
            deleteTask={deleteTask}
          />
        </div>
      )}
    </List>
  );
};

export default TaskList;
