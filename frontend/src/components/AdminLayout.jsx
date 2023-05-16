import React from "react";
import { Container } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";

import TodoList from "../pages/todo";
import Dashboard from "../pages/Dashboard";

const AdminLayout = () => {
  return (
    <>
      <Container className="mt-4">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/todo">
            <Route index element={<TodoList />} />
          </Route>
        </Routes>
      </Container>
    </>
  );
};

export default AdminLayout;
