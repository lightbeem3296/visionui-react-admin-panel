import { AxiosClient } from "./AxiosClient";

export const IsLoggedIn = () => {
  return localStorage.getItem('loggedIn') === "true";
}

export const Signout = () => {
  localStorage.removeItem('loggedIn');
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
}

export const CheckSignin = (url) => {
  AxiosClient.post(`/auth/check`)
    .then(() => { })
    .catch((error) => {
      if (url === '/signout') {
      } else {
        console.log(error);
        Signout();
        window.location.href = "/signin?url=" + encodeURIComponent(url);
      }
    });
}
