import { LOG_OUT } from "../redux/types";

export const redirectToLogin = (dispatch, navigate, status) => {
  if ([401, 403].includes(status)) {
    dispatch({ type: LOG_OUT });
    navigate("/login");
  }
};

export const shortName = (oldName) => {
  const arrName = oldName.split(" ");

  return arrName
    .map((item) => {
      if (arrName.length === 1) {
        return `${item
          .replace(/[^\w\s]/gi, "")
          .substr(0, 2)
          .toUpperCase()}${item.charAt(item.length - 1).toUpperCase()}`;
      }
      return item.charAt(0).toUpperCase();
    })
    .join("");
};
