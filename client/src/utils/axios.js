import axios from "axios";
import toast from "react-hot-toast";
import { isValid } from "./basic";

export const API_URL = "http://localhost:9000";

export const AxiosClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
    "Accept": "application/json,",
  },
});

AxiosClient.interceptors.request.use(
  (config) => {
    const userId = localStorage.getItem('user_id');
    const accessToken = localStorage.getItem("access_token");

    if (isValid(accessToken) && isValid(userId)) {
      config.headers["Authorization"] = `Bearer||${userId}||${accessToken}`;
    }
    return config;
  },
  (err) => {
    Promise.reject(err);
  }
);

const doRefreshToken = async () => {
  const refreshToken = localStorage.getItem("reresh_token");
  try {
    const resp = await AxiosClient
      .post(`${API_URL}/auth/refresh`, {
        refresh_token: refreshToken,
      });
    if (resp.status === 200) {
      localStorage.setItem("access_token", resp.data.accessToken);
    }
  } catch (err) {
    toast.error(err.message);
  }
};

AxiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (err) => {
    const orgReq = err.config;

    if (
      err.response.status === 401 &&
      orgReq.url === `${API_URL}/auth/refresh`
    ) {
      console.log('logging out');
      localStorage.setItem("logged_in", false);
      return Promise.reject(err);
    }

    if (err.response.status === 401 && !orgReq._retry) {
      orgReq._retry = true;
      await doRefreshToken();
      console.log(orgReq);
      return AxiosClient(orgReq);
    }
    localStorage.setItem("logged_in", false);
    return Promise.reject(err);
  }
);
