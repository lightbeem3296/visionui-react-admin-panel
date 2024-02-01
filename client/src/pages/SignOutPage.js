import { Navigate } from "react-router-dom";
import { signout } from "../utils/auth";

export const SignoutPage = () => {
  signout();
  return (
    <Navigate to='/signin'/>
  );
}
