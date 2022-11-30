import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

export const PrivateRoute = ({ children }) => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { pathname, search } = useLocation();

  const lastPath = pathname + search;
  localStorage.setItem("lastPath", lastPath);

  //Request to the backend to validate the token
  //If the token is valid, the user is logged in
  //If the token is not valid, the user is not logged in




  return isLoggedIn ? children : <Navigate to="/login" />;
};
