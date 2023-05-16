import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";

import Login from "./pages/auth/Login";
import Topbar from "./components/Topbar";
import AdminLayout from "./components/AdminLayout";

import { ToastContainer } from "react-toastify";

const App = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <>
      <Topbar />

      <Routes>
        {isAuthenticated ? (
          <>
            <Route exact path="/admin/*" element={<AdminLayout />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Login />} />
          </>
        )}

        <Route
          path="*"
          exact
          element={<Navigate to={isAuthenticated ? "/admin" : "/"} />}
        />
      </Routes>
      <ToastContainer position="top-center" theme="colored" />
    </>
  );
};

export default App;
