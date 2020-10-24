import React, { useState, useContext } from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { ProjectContext } from "../context/ProjectContext";
import UpdateTask from "./UpdateTask";

const TaskCards = ({ task }) => {
  const { selectedProj, setSelectedProj } = useContext(ProjectContext);
  let taskStatus;

  if (selectedProj && selectedProj.tasks) {
    taskStatus = selectedProj.tasks.filter(
      (todos) => todos.status === task.title
    );
  }
  let initialState = {};
  if (taskStatus) {
    for (let i = 0; i < taskStatus.length; i++) {
      initialState[taskStatus[i].id] = false;
    }
  }
  const [open, setOpen] = useState(initialState);
  const close = (task_id) => {
    setOpen({ ...open, [task_id]: false });
  };
  return (
    <>
      <Card>
        <Card.Header>{task.title}</Card.Header>
        <ListGroup variant="flush">
          {taskStatus &&
            taskStatus.map((todos) => {
              return (
                <ListGroup.Item
                  key={todos.id}
                  onClick={() => {
                    setOpen({ ...open, [todos.id]: true });
                  }}
                >
                  <UpdateTask
                    open={open[todos.id]}
                    close={close}
                    task={todos}
                  />
                  {todos.title}
                </ListGroup.Item>
              );
            })}
        </ListGroup>
      </Card>
    </>
  );
};

export default TaskCards;
