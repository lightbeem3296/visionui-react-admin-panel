import { useState } from "react";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";
import { API_URL, AxiosClient } from "../utils/axios";
import { handleResponse } from "../utils/net";
import { signout } from "../utils/auth";
import axios from "axios";

/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
export const SignInPage = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [pending, setPending] = useState(false);

  const location = useLocation();
  const query = new URLSearchParams(location.search);
  var destUrl = query.get("url");
  destUrl = destUrl ? destUrl : "/dashboard";

  const onUsernameHandler = (e) => {
    setUsername(e.currentTarget.value);

    setUsernameError(false);
    setPasswordError(false);
  };
  const onPasswordHandler = (e) => {
    setPassword(e.currentTarget.value);

    setUsernameError(false);
    setPasswordError(false);
  }

  const onSubmitHandler = (e) => {
    e.preventDefault();

    setUsernameError(false);
    setPasswordError(false);
    signout();
    setPending(true);

    axios.post(`${API_URL}/auth/signin`, {
      "username": username,
      "password": password,
    })
      .then((resp) => {
        handleResponse(resp,
          (data) => {
            localStorage.setItem("user_id", username);
            localStorage.setItem("access_token", data.access_token);
            localStorage.setItem("refresh_token", data.refresh_token);
            localStorage.setItem("logged_in", true);

            window.location.href = destUrl;
          },
          (msg) => {
            setUsernameError(true);
            setPasswordError(true);
            toast.error(msg);
          });
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
      })
      .finally(() => {
        setPending(false);
      });
  }

  return (
    <div className="h-[100vh] bg-[url('./assets/bg-signin.jpg')] bg-cover bg-center">
      <div className="size-full backdrop-blur-sm sm:pt-[10rem]">
        <div className="flex flex-col justify-center flex-1 h-full sm:h-[30rem] w-full sm:w-[24rem] mx-auto px-6 py-20 rounded-xl sm:px-16 backdrop-blur-sm bg-gray-900/70">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="text-2xl font-bold leading-9 tracking-tight text-center text-gray-100">
              Dekaron Admin
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" onSubmit={onSubmitHandler}>
              <div>
                <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-100">
                  Username
                </label>
                <div className="mt-2">
                  <input
                    id="username"
                    name="username"
                    required
                    className={"block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-sm sm:leading-6" + (usernameError
                      ? " border-2 border-red-500"
                      : " ")}
                    onChange={onUsernameHandler}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-100">
                    Password
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className={"block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-sm sm:leading-6" + (passwordError
                      ? " border-2 border-red-500"
                      : " ")}
                    onChange={onPasswordHandler}
                  />
                </div>
              </div>

              <div className="pt-6">
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  <div className="flex items-center justify-center mx-auto">
                    {
                      pending
                        ? <svg className="w-5 h-5 mr-3 -ml-1 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        : null
                    }
                    Sign in
                  </div>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
