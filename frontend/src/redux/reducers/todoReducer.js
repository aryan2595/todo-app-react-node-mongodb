import { CLAER_TODO, TODO_CREATE, TODO_DETAIL, TODO_LIST } from "../types";

const initialState = {
  isLoading: false,
  todos: null,
  todo: null,
};

const todoReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case TODO_CREATE:
      return {
        ...state,
        todo: null,
      };

    case TODO_LIST:
      return {
        ...state,
        todos: payload,
      };

    case TODO_DETAIL:
      return {
        ...state,
        todo: payload,
      };

    case CLAER_TODO:
      return {
        ...state,
        todo: null,
      };

    default:
      return state;
  }
};

export default todoReducer;
