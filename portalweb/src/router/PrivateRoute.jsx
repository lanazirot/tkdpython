import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

export const PrivateRoute = ({ children }) => {
  const { isLoggedIn, user } = useSelector((state) => state.auth);
  const prueba = useSelector(state=>state.auth);
  const { pathname, search } = useLocation();

  const lastPath = pathname + search;
  localStorage.setItem("lastPath", lastPath);

  console.log('xd', prueba);

  return isLoggedIn ? children : <Navigate to="/login" />;
};
