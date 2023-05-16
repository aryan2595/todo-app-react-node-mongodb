import { toast } from "react-toastify";
import APIHelper from "../../helpers/APIHelper";

import { TODO_LIST, TODO_DETAIL, CLAER_TODO } from "../types";

export const createTodoAction = (data, page, limit, hideModal) => {
  return async (dispatch) => {
    try {
      const resp = await APIHelper.post("/todo/create", data);

      if (resp.status === 201) {
        hideModal();

        const res = await APIHelper.get("/todo/list", {
          params: { limit, page },
        });

        dispatch({
          type: TODO_LIST,
          payload: res.data,
        });
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
};

export const updateTodoAction = (data, page, limit, hideModal) => {
  return async (dispatch) => {
    try {
      const resp = await APIHelper.put("/todo/update", data);

      if (resp.status === 200) {
        hideModal();

        const res = await APIHelper.get("/todo/list", {
          params: { limit, page },
        });

        dispatch({
          type: TODO_LIST,
          payload: res.data,
        });
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
};

export const todoListAction = ({ limit, page }) => {
  return async (dispatch) => {
    try {
      const res = await APIHelper.get("/todo/list", {
        params: { limit, page },
      });

      dispatch({
        type: TODO_LIST,
        payload: res.data,
      });
    } catch (error) {
      toast.error(error.message);
    }
  };
};

export const todoDetailAction = (id) => {
  return async (dispatch) => {
    try {
      const res = await APIHelper.get(`/todo/detail/${id}`);

      const todo = res.data;

      dispatch({
        type: TODO_DETAIL,
        payload: todo,
      });
    } catch (error) {
      toast.error(error.message);
    }
  };
};

export const changeStatusAction = (data, page, limit) => {
  return async (dispatch) => {
    try {
      const resp = await APIHelper.put(`/todo/change-status`, data);

      if (resp.status === 200) {
        const res = await APIHelper.get("/todo/list", {
          params: { limit, page },
        });

        dispatch({
          type: TODO_LIST,
          payload: res.data,
        });
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
};

export const clearTodoAction = () => {
  return {
    type: CLAER_TODO,
  };
};
