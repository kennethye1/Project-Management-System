import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import UserAPI from "../api/UserAPI";
import { Link } from "react-router-dom";

const Login = ({ setAuth }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [valid, setValid] = useState(true);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await UserAPI.post("/login", { email, password })
        .then((response) => {
          setValid(true);
          setAuth(true);
          localStorage.setItem("token", response.data.token);
        })
        .catch((error) => {
          setValid(false);
          setAuth(false);
        });
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <>
      <div className="container mt-3">
        <h1 className="d-flex justify-content-center">Login</h1>

        <Form onSubmit={handleSubmit}>
          {!valid && <p style={{ color: "red" }}>Invalid Email or Password</p>}
          <Form.Group controlId="formGroupEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formGroupPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Button type="submit" block>
            {" "}
            Sign in
          </Button>
        </Form>
        <div className="d-flex justify-content-center mt-2">
          {" "}
          Don't have an account? Click&nbsp;<Link to="/register">here</Link>
          &nbsp;to register.
        </div>
      </div>
    </>
  );
};

export default Login;
