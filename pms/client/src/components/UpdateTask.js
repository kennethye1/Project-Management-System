import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { ProjectContext } from "../context/ProjectContext";
import ProjectAPI from "../api/ProjectAPI";

function UpdateTask({ open, close, task }) {
  const { selectedProj, setSelectedProj } = useContext(ProjectContext);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [status, setStatus] = useState(task.status);
  const { id } = useParams();
  const [checked, setChecked] = useState(false);

  const handleUpdate = async (e) => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    e.preventDefault();

    try {
      const response = await ProjectAPI.put(
        `/${id}/${task.id}`,
        {
          title,
          description,
          status,
        },
        { headers: { token: localStorage.token } }
      );
      console.log(status);
    } catch (error) {
      console.error(error, error.stack);
    }
    window.location.reload();
  };

  const handleDelete = async (e) => {
    e.stopPropagation();

    try {
      const response = await ProjectAPI.delete(`/${id}/${task.id}`, {
        headers: { token: localStorage.token },
      });
      const updatedTaskList = selectedProj.tasks.filter(
        (todo) => task.id != todo.id
      );
      setSelectedProj({ ...selectedProj, tasks: updatedTaskList });
    } catch (error) {
      console.error(error, error.stack);
    }
  };
  const handleChange = () => {
    if (!checked) {
      setStatus("Completed");
    } else {
      setStatus(task.status);
    }
    setChecked(!checked);
  };
  return (
    <div
      onKeyDown={(e) => e.stopPropagation()}
      onClick={(e) => e.stopPropagation()}
      onFocus={(e) => e.stopPropagation()}
      onMouseOver={(e) => e.stopPropagation()}
    >
      <Modal
        show={open}
        onHide={() => {
          close(task.id);
          setDescription(task.description);
          setTitle(task.title);
          setStatus(task.status);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Update a Task</Modal.Title>
        </Modal.Header>
        <Form>
          <Modal.Body>
            <Form.Group>
              <Form.Label>A title or short description</Form.Label>
              <Form.Control
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Description of the task</Form.Label>

              <Form.Control
                as="textarea"
                rows={5}
                value={description}
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
                <option value="Bugs"> &#xf188; &nbsp; Bug </option>
                <option value="TODOs"> &#xf0ae; &nbsp; Todo </option>
              </Form.Control>
            </Form.Group>

            <Form.Group id="formGridCheckbox">
              <Form.Check
                type="checkbox"
                label="Mark as Complete"
                checked={checked}
                onChange={handleChange}
              />
            </Form.Group>
          </Modal.Body>
        </Form>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              close(task.id);
              setDescription(task.description);
              setTitle(task.title);
              setStatus(task.status);
            }}
          >
            Close
          </Button>
          <Button
            variant="danger"
            onClick={(e) => {
              handleDelete(e);
              close(task.id);
            }}
          >
            Delete Task
          </Button>
          <Button
            variant="primary"
            onClick={(e) => {
              console.log(status);
              handleUpdate(e);
              close(task.id);
              // setDescription(description);
              // setTitle(title);
              // setStatus(status);
            }}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
export default UpdateTask;
