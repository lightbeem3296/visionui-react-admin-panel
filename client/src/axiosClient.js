import axios from "axios";

const API = "http://localhost:9000";

const AxiosClient = axios.create({
  baseURL: API,
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

AxiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  function (error) {
    const originalRequest = error.config;

    if (
      error.response.status === 401 &&
      originalRequest.url === `${API}/refresh`
    ) {
      localStorage.setItem("loggedIn", false);
      return Promise.reject(error);
    }

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem("refreshToken");
      const username = localStorage.getItem("username");
      return axios
        .post(`/auth/refresh`, {
          username: username,
          refreshToken: refreshToken,
        })
        .then((res) => {
          if (res.status === 201) {
            localStorage.setItem("accessToken", res.data.accessToken);
            axios.defaults.headers.common["Authorization"] = "Bearer " + localStorage.getItem("accessToken");
            return axios(originalRequest);
          }
        })
        .catch((error) => {
          console.log(error);
          localStorage.setItem("loggedIn", false);
          return Promise.reject(error);
        });
    }
    localStorage.setItem("loggedIn", false);
    return Promise.reject(error);
  }
);

export default AxiosClient;
