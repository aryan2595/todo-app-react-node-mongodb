import React from "react";
import { Card } from "react-bootstrap";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <>
      <Card className="shadow">
        <Card.Body className="h3 text-center">
          Welcome {user?.firstName}!
        </Card.Body>
      </Card>
    </>
  );
};

export default Dashboard;
