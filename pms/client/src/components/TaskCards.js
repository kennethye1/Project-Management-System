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
  for (let i = 0; i < taskStatus.length; i++) {
    curr_id = taskStatus[i].id;
    initialState.curr_id = false;
  }

  const [open, setOpen] = useState(initialState);
  const handleOpen = (id) => {
    const st = 
    setOpen((open) =>);
  };
  const handleClose = (id) => {
    setOpen((open) => {
      let;
    });
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
                    setOpen(true);
                  }}
                >
                  {" "}
                  <UpdateTask
                    open={open.todos.id}
                    close={handleClose}
                    task={todos}
                  />
                  {todos.title}{" "}
                </ListGroup.Item>
              );
            })}
        </ListGroup>
      </Card>
    </>
  );
};

export default TaskCards;
