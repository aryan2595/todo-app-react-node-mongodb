const Todo = require("../models/todo");
const { successResponse, errorResponse } = require("../helpers/apiResponse");
const {
  TODO_LIST_FOUND_SUCCESSFULLY,
  TODO_DETAILS_FOUND_SUCCESSFULLY,
  TODO_UPDATED_SUCCESSFULLY,
  TODO_STATUS_UPDATED_SUCCESSFULLY,
  TODO_ADDED,
  TODO_DELETED_SUCCESSFULLY,
} = require("../lang/en/todo");
const { SOMETHING_WENT_WRONG } = require("../lang/en/common");

exports.list = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const todo = await Todo.paginate(
      { deleted: false },
      { page, limit, sort: { date: -1 } }
    );

    return successResponse({
      res,
      msg: TODO_LIST_FOUND_SUCCESSFULLY,
      data: todo,
    });
  } catch (error) {
    return errorResponse({ res, error });
  }
};

exports.detail = async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findById(id);
    return successResponse({
      res,
      msg: TODO_DETAILS_FOUND_SUCCESSFULLY,
      data: todo,
    });
  } catch (error) {
    return errorResponse({ res, error });
  }
};

exports.update = async (req, res) => {
  try {
    const { id, title, description, date, status } = req.body;

    const todo = await Todo.findOneAndUpdate(
      { _id: id },
      {
        $set: { title, description, date, status },
      },
      { new: true }
    );

    return successResponse({ res, msg: TODO_UPDATED_SUCCESSFULLY, data: todo });
  } catch (error) {
    return errorResponse({ res, error });
  }
};

exports.changeStatus = async (req, res) => {
  const { id, status } = req.body;

  try {
    const todo = await Todo.findOneAndUpdate(
      { _id: id },
      { $set: { status } },
      { new: true }
    );

    return successResponse({
      res,
      msg: TODO_STATUS_UPDATED_SUCCESSFULLY,
      status: 200,
      data: todo,
    });
  } catch (error) {
    return errorResponse({ res, error });
  }
};

exports.create = async (req, res) => {
  try {
    const todo = await new Todo(req.body).save();

    return successResponse({
      res,
      msg: TODO_ADDED,
      status: 201,
      data: todo,
    });
  } catch (error) {
    return errorResponse({ res, error });
  }
};

exports.destroy = async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.deleteById(id);

    if (todo && todo.modifiedCount)
      return successResponse({
        res,
        msg: TODO_DELETED_SUCCESSFULLY,
        data: null,
      });
    else
      return successResponse({
        res,
        msg: SOMETHING_WENT_WRONG,
        data: null,
      });
  } catch (error) {
    return errorResponse({ res, error });
  }
};
