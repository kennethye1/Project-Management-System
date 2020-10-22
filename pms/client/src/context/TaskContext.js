import React, { useState } from "react";

export const TaskContext = React.createContext();

export const TaskProvider = (props) => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);

  const createTask = (task) => {
    setTasks([...tasks, task]);
  };

  return (
    <TaskContext.Provider
      value={{ tasks, setTasks, selectedTask, setSelectedTask, createTask }}
    >
      {props.children}
    </TaskContext.Provider>
  );
};
