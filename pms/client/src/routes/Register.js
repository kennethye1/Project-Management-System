import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import UserAPI from "../api/UserAPI";
import { Link, Redirect } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const handleSubmit = async (e) => {
    console.log("WORKING?");
    e.preventDefault();
    try {
      const response = await UserAPI.post("/register", {
        email,
        password,
        username,
      });
      console.log(response.data.token);
      localStorage.setItem("token", response.data.token);
      window.location.href = "http://localhost:3000/login";
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <>
      <div className="container mt-4">
        <h1 className="d-flex justify-content-center">Register</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else. You will login
              using your email.
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit" block>
            Submit
          </Button>
        </Form>
        <div className="d-flex justify-content-center mt-2">
          {" "}
          Already have an account? Click&nbsp;<Link to="/login">here</Link>
          &nbsp;to login.
        </div>
      </div>
    </>
  );
};

export default Register;
