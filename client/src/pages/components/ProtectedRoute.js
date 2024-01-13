import React from 'react'
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ component: Comp, path, ...rest }) => {
  var loggedIn = localStorage.getItem("loggedIn");
  return (
    <Route
      path={path}
      {...rest}
      render={(props) => {
        return loggedIn === "true" ? (
          <Comp {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: {
                prevLocation: path,
                error: "You need to login first!",
              },
            }}
          />
        );
      }}
    />
  );
};

export default ProtectedRoute;
