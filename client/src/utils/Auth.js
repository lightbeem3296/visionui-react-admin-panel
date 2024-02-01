import toast from "react-hot-toast";
import { AxiosClient } from "./axios";
import { handleResponse } from './net';

export function isLoggedIn() {
  return localStorage.getItem('logged_in') === "true";
}

export function signout() {
  localStorage.removeItem('logged_in');
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  localStorage.removeItem('user_id');
  localStorage.removeItem('user_no');
}

export function checkSignin(url) {
  AxiosClient.post(`/auth/check`)
    .then((resp) => {
      handleResponse(resp);
    })
    .catch((e) => {
      if (url === '/sign-out') {
      } else {
        toast.error(e.message);
        signout();
        window.location.href = "/sign-in?url=" + encodeURIComponent(url);
      }
    });
}
