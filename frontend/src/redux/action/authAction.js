import { toast } from "react-toastify";

import APIHelper from "../../helpers/APIHelper";
import { LOCAL_STORAGE } from "../../constants/app";
import { LOGIN, LOG_OUT, USER_PROFILE } from "../types";
import { redirectToLogin } from "../../helpers/commonHelper";

export const loginAction = (data) => {
  return async (dispatch) => {
    try {
      const res = await APIHelper.post("/auth/login", data);
      const user = res.data;

      localStorage.setItem(LOCAL_STORAGE.TODO_TOKEN, user.token);

      dispatch({
        type: LOGIN,
        payload: user,
      });
    } catch (error) {
      toast.error(error.message);
    }
  };
};

export const getUserProfile = (navigate) => async (dispatch) => {
  try {
    const res = await APIHelper.post("/user/profile");

    redirectToLogin(dispatch, navigate, res.status);
    dispatch({ type: USER_PROFILE, payload: res.data });
  } catch (error) {
    redirectToLogin(dispatch, navigate, error.status);
  }
};

export const logOut = () => {
  return {
    type: LOG_OUT,
  };
};
