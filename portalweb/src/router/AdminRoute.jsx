import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const AdminRoute = ({ children }) => {
  const { isLoggedIn, user } = useSelector((state) => state.auth);
  return user.admin ? children : isLoggedIn ?  <Navigate to="/home" /> : <Navigate to="/login" />;
};
