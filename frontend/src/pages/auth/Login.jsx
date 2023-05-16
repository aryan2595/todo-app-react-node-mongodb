import React, { useState } from "react";
import { useDispatch } from "react-redux";

import Swal from "sweetalert2";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Col, Container, Row } from "react-bootstrap";

import { loginAction } from "../../redux/action/authAction";

const Login = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState({ email: "", password: "" });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (user.password.length < 8) {
      Swal.fire(
        "Invalid Input!",
        "Password should be at least 8 characters!",
        "error"
      );
    } else {
      dispatch(loginAction(user));
    }
  };

  return (
    <>
      <Container className="mt-5">
        <Row>
          <Col xs={6} className="mx-auto">
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={user.email}
                  onChange={(e) =>
                    setUser((prev) => {
                      return { ...prev, email: e.target.value };
                    })
                  }
                  placeholder="Email"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  value={user.password}
                  onChange={(e) =>
                    setUser((prev) => {
                      return { ...prev, password: e.target.value };
                    })
                  }
                  type="password"
                  placeholder="Password"
                />
              </Form.Group>
              <Button
                variant="primary"
                type="submit"
                className="px-5 py-3 w-100"
              >
                LOGIN NOW
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Login;
