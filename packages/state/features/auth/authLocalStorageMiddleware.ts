import Cookies from "js-cookie";
import { Action } from "redux";
import { clearCredentials, setCredentials } from "./authSlice";

export const authLocalStorageMiddleware = () => (next) => (
  action: Action<unknown>
) => {
  if (setCredentials.match(action)) {
    localStorage.setItem("access_token", action.payload.access_token);
    Cookies.set("access_token", action.payload.access_token);
  } else if (clearCredentials.match(action)) {
    localStorage.removeItem("access_token");
    Cookies.remove("access_token");
  }
  return next(action);
};