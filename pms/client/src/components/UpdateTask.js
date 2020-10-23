import React from "react";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const UpdateTask = ({ task }) => {
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [status, setStatus] = useState(task.status);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { id } = useParams();

  return (
    <>
      <Modal></Modal>
    </>
  );
};

export default UpdateTask;
