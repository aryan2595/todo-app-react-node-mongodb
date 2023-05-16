import axios from "axios";

import { API_BASE_URL, LOCAL_STORAGE } from "../constants/app";

const APIHelper = axios.create({
  baseURL: API_BASE_URL,
});

APIHelper.interceptors.request.use(
  (config) => {
    config.headers["authorization"] = `Bearer ${localStorage.getItem(
      LOCAL_STORAGE.TODO_TOKEN
    )}`;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

APIHelper.interceptors.response.use(
  (response) => response.data,

  (error) => {
    if (error.response.status === 401) {
      localStorage.clear();
      window.location.href = "/login";
    }

    return Promise.reject(error.response.data);
  }
);

export default APIHelper;
