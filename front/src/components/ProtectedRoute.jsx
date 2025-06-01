import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { usuario } = useSelector((state) => state.usuarios);
  return usuario ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
