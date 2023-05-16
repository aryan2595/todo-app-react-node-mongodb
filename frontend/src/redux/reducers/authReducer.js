import { LOCAL_STORAGE } from "../../constants/app";
import { LOGIN, LOG_OUT, USER_PROFILE } from "../types";

let token = localStorage.getItem(LOCAL_STORAGE.TODO_TOKEN) || null;

const initialState = {
  token,
  user: null,
  otpSent: false,
  isLoading: false,
  isAuthenticated: token ? true : false,
};

const authReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case LOGIN:
      return {
        ...state,
        user: payload,
        isAuthenticated: true,
        token: payload.token,
      };
    case USER_PROFILE:
      return { ...state, user: payload };
    case LOG_OUT:
      localStorage.clear();

      return { ...state, isAuthenticated: false, token: null, otpSent: false };
    default:
      return state;
  }
};

export default authReducer;
