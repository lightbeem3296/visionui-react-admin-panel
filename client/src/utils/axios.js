import axios from "axios";
import toast from "react-hot-toast";
import { isInvalid, isValid } from "./basic";
import { handleResponse } from "./net";
import { signout } from "./auth";

export const API_URL = "http://localhost:9000";

export const AxiosClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
    "Accept": "application/json",
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
  const refreshToken = localStorage.getItem("refresh_token");
  const userId = localStorage.getItem('user_id');
  try {
    const resp = await AxiosClient
      .post(`${API_URL}/auth/refresh`, {
        user_id: userId,
        refresh_token: refreshToken,
      });
    if (resp.status === 200) {
      handleResponse(resp,
        (body) => {
          localStorage.setItem("access_token", body.access_token);
        });
    }
  } catch (err) {
    toast.error(err.message);
  }
};

AxiosClient.interceptors.response.use(
  async (resp) => {
    return handleResponse(resp,
      () => {
        return resp;
      },
      async (msg) => {
        const orgReq = resp.config;

        if (orgReq.url === `${API_URL}/auth/refresh`) {
          signout();
          window.location.href = "/sign-in?url=" + encodeURIComponent(window.location.pathname);

          return Promise.reject({ message: 'token refresh failed' });
        }

        if (isInvalid(orgReq._retry) && (!orgReq._retry)) {
          orgReq._retry = true;
          await doRefreshToken();
          return AxiosClient(orgReq);
        }

        return Promise.reject({ message: msg });
      });
  },
  (err) => {
    toast.error(err.message);
  }
);
