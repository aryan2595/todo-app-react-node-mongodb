import moment from "moment";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import React, { useCallback, useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Form,
  Pagination,
  Row,
  Table,
} from "react-bootstrap";

import DoneIcon from "@mui/icons-material/Done";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import {
  changeStatusAction,
  clearTodoAction,
  todoDetailAction,
  todoListAction,
} from "../../redux/action/todoAction";

import TodoForm from "./Form";
import { STATUS } from "../../constants/app";
import APIHelper from "../../helpers/APIHelper";
import CustomModal from "../../components/CustomModal";

const TodoList = () => {
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [show, setShow] = useState(false);

  const { todos } = useSelector((state) => state.todo);

  const createPagination = useCallback((totalPage, page) => {
    let items = [];

    for (let number = 1; number <= totalPage; number++) {
      items.push(
        <Pagination.Item
          key={number}
          active={number === page}
          onClick={(e, x) => setPage(number)}
        >
          {number}
        </Pagination.Item>
      );
    }

    return items;
  }, []);

  const handleClose = () => {
    setShow(false);
    dispatch(clearTodoAction());
    dispatch(todoListAction({ limit, page }));
  };

  const handleShow = () => setShow(true);

  useEffect(() => {
    dispatch(todoListAction({ limit, page }));
  }, [dispatch, limit, page]);

  const handleLimit = (value) => {
    setLimit(value);
    setPage(1);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Are you sure you want to delete this?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await APIHelper.delete(`/todo/delete/${id}`);
          if (res.status === 200) {
            dispatch(todoListAction({ limit, page }));
            Swal.fire("Deleted!", res.message, "info");
          }
        } catch (error) {
          toast.error(error.message);
        }
      }
    });
  };

  const handleEdit = (id) => {
    dispatch(todoDetailAction(id));
    handleShow();
  };

  const handleChangeStatus = (id) => {
    dispatch(changeStatusAction({ id, status: "completed" }, page, limit));
  };

  return (
    <>
      <Row>
        <Col xs={12}>
          <Button
            variant="info"
            type="button"
            className="px-5 float-end mb-3"
            onClick={handleShow}
          >
            ADD NEW
          </Button>

          <CustomModal
            show={show}
            title="Add - Edit Todo"
            onHide={() => handleClose(false)}
          >
            <TodoForm page={page} limit={limit} handleClose={handleClose} />
          </CustomModal>
        </Col>

        <Col xs={12}>
          <Card className="shadow">
            <Card.Body className="p-0">
              <Table className="m-0" striped bordered hover>
                <thead>
                  <tr>
                    <th className="text-center">#</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {todos && todos.totalDocs ? (
                    todos.docs.map((item, i) => {
                      return (
                        <tr key={item.id}>
                          <th className="text-center">
                            {limit * (page - 1) + (i + 1)}
                          </th>
                          <td>{item.title}</td>
                          <td>{item.description || "-"}</td>
                          <td>{moment(item.date).format("Do MMM, YYYY")}</td>
                          <td>{STATUS[item.status]}</td>
                          <td>
                            <Button
                              variant="warning"
                              className="btn-sm"
                              onClick={() => handleEdit(item.id)}
                            >
                              <EditIcon />
                            </Button>
                            <Button
                              className="ms-3 btn-sm"
                              variant="danger"
                              onClick={() => handleDelete(item.id)}
                            >
                              <DeleteIcon />
                            </Button>
                            {item.status !== "completed" ? (
                              <Button
                                className="ms-3 btn-sm"
                                variant="success"
                                onClick={() => handleChangeStatus(item.id)}
                              >
                                <DoneIcon />
                              </Button>
                            ) : (
                              <></>
                            )}
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <th className="text-center" colSpan={6}>
                        No data found!
                      </th>
                    </tr>
                  )}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {todos && (
        <Row className="mt-3">
          <Col xs={2}>
            <Form.Select
              name="limit"
              onChange={(e) => handleLimit(e.target.value)}
              defaultValue={limit}
            >
              <option value={1}>1</option>
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </Form.Select>
          </Col>
          <Col xs={10}>
            {todos.totalPages > 1 ? (
              <Pagination className="float-end">
                {createPagination(todos.totalPages, page)}
              </Pagination>
            ) : null}
          </Col>
        </Row>
      )}
    </>
  );
};

export default TodoList;
