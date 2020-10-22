import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import ProjectAPI from "../api/ProjectAPI";

const Update = ({ proj }) => {
  const [name, setName] = useState(proj.name);
  const [description, setDescription] = useState(proj.description);

  const [show, setShow] = useState(false);

  const handleShow = async (e) => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    e.preventDefault();
    setShow(true);
  };

  const handleUpdate = async (e) => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    e.preventDefault();

    try {
      const response = await ProjectAPI.put(`/${proj.id}`, {
        name,
        description,
      });
      console.log(response);
      setShow(false);
    } catch (error) {
      console.error(error, error.stack);
    }
    window.location = "/";
  };
  return (
    <>
      <Button variant="warning" onClick={(e) => handleShow(e)}>
        Update
      </Button>
      <div
        onKeyDown={(e) => e.stopPropagation()}
        onClick={(e) => e.stopPropagation()}
        onFocus={(e) => e.stopPropagation()}
        onMouseOver={(e) => e.stopPropagation()}
      >
        <Modal
          show={show}
          onHide={() => {
            setShow(false);
            setName(proj.name);
            setDescription(proj.description);
          }}
        >
          <Modal.Header
            closeButton
            onExit={(e) => {
              e.stopPropagation();
              e.nativeEvent.stopImmediatePropagation();
              e.preventDefault();
            }}
          >
            <Modal.Title>Update Project</Modal.Title>
          </Modal.Header>
          <Form>
            <Modal.Body>
              <Form.Group controlId="updateName">
                <Form.Label>Project Name</Form.Label>
                <Form.Control
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="updateDescription">
                <Form.Label>Project Description</Form.Label>
                <Form.Control
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={(e) => {
                  e.stopPropagation();
                  e.nativeEvent.stopImmediatePropagation();
                  e.preventDefault();
                  setShow(false);
                  setName(proj.name);
                  setDescription(proj.description);
                }}
              >
                Close
              </Button>
              <Button
                type="submit"
                variant="primary"
                onClick={(e) => handleUpdate(e)}
              >
                Save Changes
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
      </div>
    </>
  );
};

export default Update;
