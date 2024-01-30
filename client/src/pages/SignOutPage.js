import { Navigate } from "react-router-dom";
import { Signout } from "../utils/Auth";

export const SignoutPage = () => {
  Signout();
  return (
    <Navigate to='/sign-in'/>
  );
}
