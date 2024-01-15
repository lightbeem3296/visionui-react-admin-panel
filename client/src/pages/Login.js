/*!

=========================================================
* Vision UI Free React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/vision-ui-free-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com/)
* Licensed under MIT (https://github.com/creativetimofficial/vision-ui-free-react/blob/master LICENSE.md)

* Design and Coded by Simmmple & Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

import { useState } from "react";

// react-router-dom components
import { Link } from "react-router-dom";

// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiInput from "components/VuiInput";
import VuiButton from "components/VuiButton";
import GradientBorder from "examples/GradientBorder";

// Vision UI Dashboard assets
import radialGradient from "assets/theme/functions/radialGradient";
import palette from "assets/theme/base/colors";
import borders from "assets/theme/base/borders";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import bgSignIn from "assets/images/signInImage.jpg";


import AxiosClient from "AxiosClient";
import VuiAlert from "components/VuiAlert";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const onUsernameHandler = (e) => {
    setUsername(e.currentTarget.value);

    setUsernameError(false);
    setPasswordError(false);

    setErrorMessage("");
  };
  const onPasswordHandler = (e) => {
    setPassword(e.currentTarget.value);

    setUsernameError(false);
    setPasswordError(false);

    setErrorMessage("");
  }

  const onSubmitHandler = (e) => {
    e.preventDefault();

    if (username === "") {
      setUsernameError(true);
      setErrorMessage("ERROR: Username is empty!");
      return;
    }
    if (password === "") {
      setPasswordError(true);
      setErrorMessage("ERROR: Password is empty!");
      return;
    }

    localStorage.setItem("loggedIn", false);

    AxiosClient.post('/auth/signin', {
      "username": username,
      "password": password,
    })
      .then(resp => {
        localStorage.setItem("accessToken", resp.data.accessToken);
        localStorage.setItem("refreshToken", resp.data.refreshToken);
        localStorage.setItem("username", username);
        localStorage.setItem("loggedIn", true);
        location.href = "/dashboard";
      })
      .catch(e => {
        console.log(e);
        setUsernameError(true);
        setPasswordError(true);
        setErrorMessage("ERROR: Username or password is invalid!");
      });
  }

  return (
    <CoverLayout
      title="Login to Dekaron Admin Page!"
      color="white"
      description="Enter your username and password to login"
      premotto="dekaron"
      motto="DEKARON ADMIN PAGE"
      image={bgSignIn}
    >
      <VuiBox component="form" role="form" onSubmit={onSubmitHandler}>
        <VuiBox mb={2}>
          <VuiBox mb={1} ml={0.5}>
            <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
              Username
            </VuiTypography>
          </VuiBox>
          <GradientBorder
            minWidth="100%"
            padding="1px"
            borderRadius={borders.borderRadius.lg}
            backgroundImage={radialGradient(
              palette.gradients.borderLight.main,
              palette.gradients.borderLight.state,
              palette.gradients.borderLight.angle
            )}
          >
            {/* <VuiInput type="userid" placeholder="Your username..." fontWeight="500" onChange={onUsernameHandler} /> */}
            <VuiInput
              type="userid"
              placeholder="Your username ..."
              sx={({ typography: { size } }) => ({
                fontSize: size.sm,
              })}
              onChange={onUsernameHandler}
              error={usernameError}
            />
          </GradientBorder>
        </VuiBox>
        <VuiBox mb={2}>
          <VuiBox mb={1} ml={0.5}>
            <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
              Password
            </VuiTypography>
          </VuiBox>
          <GradientBorder
            minWidth="100%"
            borderRadius={borders.borderRadius.lg}
            padding="1px"
            backgroundImage={radialGradient(
              palette.gradients.borderLight.main,
              palette.gradients.borderLight.state,
              palette.gradients.borderLight.angle
            )}
          >
            <VuiInput
              type="password"
              placeholder="Your password ..."
              sx={({ typography: { size } }) => ({
                fontSize: size.sm,
              })}
              onChange={onPasswordHandler}
              error={passwordError}
            />
          </GradientBorder>
        </VuiBox>
        <VuiBox>
          <VuiTypography color="error" variant="caption">
            {errorMessage}
          </VuiTypography>
        </VuiBox>
        <VuiBox mt={4} mb={1}>
          <VuiButton type="submit" color="info" fullWidth>
            LOGIN
          </VuiButton>
        </VuiBox>
      </VuiBox>
    </CoverLayout>
  );
}

export default Login;
