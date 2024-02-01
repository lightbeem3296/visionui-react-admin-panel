import { checkSignin } from "../utils/auth";

export const ProtectedRoute = ({ children }) => {
  checkSignin(window.location.pathname);
  return children;
};
