import { Navigate, useLocation } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  var loggedIn = localStorage.getItem("loggedIn");
  if (loggedIn) {
    return children;
  } else {
    return <Navigate to={"/signin?url=" + encodeURIComponent(location.pathname)} replace />;
  }
};
