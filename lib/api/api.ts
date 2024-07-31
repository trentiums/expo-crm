import { logout } from "@redux/slices/auth";
import store from "@redux/store";
import { StatusCode } from "@type/api/api";
import axios from "axios";

export const baseURL = "https://crm.trentiums.com/api/v1/";
export const api = axios.create({
  baseURL,
});

export const setAuthenticationToken = (token?: string) => {
  api.defaults.headers.common.Authorization = token
    ? `Bearer ${token}`
    : undefined;
};

api.interceptors.response.use(undefined, (error) => {
  if (error?.response?.status === StatusCode.Unauthorized) {
    store.dispatch(logout());
  }
  return Promise.reject(error);
});
