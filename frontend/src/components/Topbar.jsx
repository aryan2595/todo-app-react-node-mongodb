import React, { useEffect } from "react";

import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavDropdown } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { getUserProfile, logOut } from "../redux/action/authAction";

const Topbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { isAuthenticated, user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user && isAuthenticated) {
      dispatch(getUserProfile(navigate));
    }
  }, [user, isAuthenticated, dispatch, navigate]);

  return (
    <>
      <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand as={Link} to="/" className="fw-bold">
            TODO APP
          </Navbar.Brand>
          <Nav className="me-auto">
            {isAuthenticated ? (
              <Nav.Link
                as={Link}
                to="/admin/todo"
                className={pathname.includes("todo") ? "active" : ""}
              >
                Todo
              </Nav.Link>
            ) : null}
          </Nav>
          <Nav className="ms-auto">
            {isAuthenticated ? (
              <NavDropdown title={user?.firstName} id="userDropdown">
                <NavDropdown.Item onClick={() => dispatch(logOut())}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : null}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default Topbar;
