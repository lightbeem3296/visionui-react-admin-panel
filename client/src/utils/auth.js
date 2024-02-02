import toast from "react-hot-toast";
import { AxiosClient } from "./axios";
import { goToUrl, handleResponse } from './net';

export const isLoggedIn = () => {
  return localStorage.getItem('logged_in') === "true";
}

export const signout = () => {
  localStorage.removeItem('logged_in');
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  localStorage.removeItem('user_id');
}

export const checkSignin = (url) => {
  AxiosClient.post(`/auth/check`)
    .then((resp) => {
      handleResponse(resp,
        null,
        (msg) => {
          console.log(msg);
          signout();
          goToUrl("/signin?url=" + encodeURIComponent(url));
        });
    })
    .catch((ex) => {
      toast.error(ex.message);
      signout();
      goToUrl("/signin?url=" + encodeURIComponent(url));
    });
}
