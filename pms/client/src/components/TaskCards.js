import React from "react";
import { useContext } from "react";
import Card from "react-bootstrap/Card";

import ListGroup from "react-bootstrap/ListGroup";
import { ProjectContext } from "../context/ProjectContext";

const TaskCards = ({ task }) => {
  const { selectedProj, setSelectedProj } = useContext(ProjectContext);
  let taskStatus;
  if (selectedProj && selectedProj.tasks) {
    taskStatus = selectedProj.tasks.filter(
      (todos) => todos.status === task.title
    );
  }
  return (
    <>
      <Card>
        <Card.Header>{task.title}</Card.Header>
        <ListGroup variant="flush">
          {taskStatus &&
            taskStatus.map((todos) => {
              return (
                <ListGroup.Item key={todos.id}> {todos.title} </ListGroup.Item>
              );
            })}
        </ListGroup>
      </Card>
    </>
  );
};

export default TaskCards;
