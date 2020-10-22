import React, { useState } from "react";
import { useContext } from "react";
import { TaskContext } from "../context/TaskContext";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "./AddTask.css";

const AddTask = () => {
  const [show, setShow] = useState(false);

  //const { addTask } = useContext(TaskContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Task Type");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <Button variant="primary" onClick={handleShow}>
        Create New Task
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create New Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                size="lg"
                value={title}
                placeholder="Short title/description"
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                value={description}
                placeholder="Description of Bug/TODO task"
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Task Type</Form.Label>
              <link
                href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.1/css/font-awesome.min.css"
                rel="stylesheet"
              />
              <Form.Control
                as="select"
                custom
                onChange={(e) => setStatus(e.target.value)}
                value={status}
              >
                <option hidden disabled>
                  Task Type
                </option>
                <option value="Bug"> &#xf188; &nbsp; Bug </option>
                <option value="Todo"> &#xf0ae; &nbsp; Todo </option>
              </Form.Control>

              {/* <link
                href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.1/css/font-awesome.min.css"
                rel="stylesheet"
              />
              <select
                value={status}
                className="form-control"
                onChange={(e) => setStatus(e.target.value)}
                defaultValue="Task Type"
              >
                <option selected disabled>
                  Task Type
                </option>

                <option value="Bug"> &#xf188; &nbsp; Bug </option>
                <option value="Todo"> &#xf0ae; &nbsp; Todo </option>
              </select> */}
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" type="submit" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AddTask;
