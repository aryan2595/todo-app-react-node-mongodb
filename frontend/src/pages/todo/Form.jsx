import moment from "moment";
import { Form, Button } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { STATUS } from "../../constants/app";

import {
  createTodoAction,
  updateTodoAction,
} from "../../redux/action/todoAction";

const initialTodo = {
  title: "",
  description: "",
  date: "",
  status: "pending",
};

const TodoForm = ({ page, limit, handleClose }) => {
  const dispatch = useDispatch();

  const [todo, setTodo] = useState(initialTodo);
  const { todo: oldTodo } = useSelector((state) => state.todo);

  useEffect(() => {
    if (oldTodo) {
      setTodo(oldTodo);
    }
  }, [oldTodo]);

  const handleTodo = (e) => {
    const { name, value } = e.target;

    setTodo({
      ...todo,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (oldTodo) {
      dispatch(updateTodoAction(todo, page, limit, handleClose));
    } else {
      dispatch(createTodoAction(todo, page, limit, handleClose));
    }
  };

  return (
    <>
      <Form className="row">
        <Form.Group className="col-sm-12 mt-3">
          <Form.Label>
            <h5>Title</h5>
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Title"
            name="title"
            value={todo.title}
            onChange={handleTodo}
          />
        </Form.Group>

        <Form.Group className="col-sm-6 mt-3">
          <Form.Label>
            <h5>Date</h5>
          </Form.Label>
          <Form.Control
            type="date"
            name="date"
            onChange={handleTodo}
            value={moment(todo.date).format("YYYY-MM-DD")}
          />
        </Form.Group>

        <Form.Group className="col-sm-6 mt-3">
          <Form.Label>
            <h5>Status</h5>
          </Form.Label>
          <Form.Select name="status" onChange={handleTodo} value={todo.status}>
            {Object.keys(STATUS).map((item) => (
              <option value={item}>{STATUS[item]}</option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="col-sm-12 mt-3">
          <Form.Label>
            <h5>Description</h5>
          </Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            placeholder="Description"
            name="description"
            value={todo.description}
            onChange={handleTodo}
          />
        </Form.Group>

        <div className="text-end mt-3">
          <Button
            variant="secondary"
            className="me-3 px-5"
            onClick={handleClose}
          >
            Close
          </Button>
          <Button
            className="px-5 py-2"
            variant={oldTodo ? "warning" : "primary"}
            type="button"
            onClick={handleSubmit}
          >
            {oldTodo ? "Update" : "Create"}
          </Button>
        </div>

        {/* {oldTodo ? (
          <Button
            className="mt-3 mb-5 px-5 py-2 float-end"
            variant="warning"
            type="button"
            onClick={handleSubmit}
          >
            Update Todo
          </Button>
        ) : (
          <Button
            className="mt-3 mb-5 px-5 py-2 float-end"
            variant="primary"
            type="button"
            onClick={handleSubmit}
          >
            Add Todo
          </Button>
        )} */}
      </Form>
    </>
  );
};

export default TodoForm;
