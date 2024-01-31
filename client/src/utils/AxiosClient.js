import axios from "axios";
import toast from "react-hot-toast";

export const API_URL = "http://localhost:9000";

export const AxiosClient = axios.create({
  baseURL: API_URL,
  headers: {
    "content-type": "application/json;charset=UTF-8",
    accept: "application/json,",
  },
});

AxiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

const doRefreshToken = async () => {
  const refreshToken = localStorage.getItem("refreshToken");
  const user_id = localStorage.getItem("user_id");
  try {
    const resp = await AxiosClient
      .post(`${API_URL}/auth/refresh`, {
        user_id: user_id,
        refreshToken: refreshToken,
      });
    if (resp.status === 200) {
      localStorage.setItem("accessToken", resp.data.accessToken);
    }
  } catch (e) {
    toast.error(e.message);
  }
};

AxiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response.status === 401 &&
      originalRequest.url === `${API_URL}/auth/refresh`
    ) {
      console.log('logging out');
      localStorage.setItem("loggedIn", false);
      return Promise.reject(error);
    }

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      await doRefreshToken();
      console.log(originalRequest);
      return AxiosClient(originalRequest);
    }
    localStorage.setItem("loggedIn", false);
    return Promise.reject(error);
  }
);
