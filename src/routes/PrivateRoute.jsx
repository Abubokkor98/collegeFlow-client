import useAuth from "../hooks/useAuth";
import { Navigate, useLocation } from "react-router";
import Loading from "../components/loader/Loading";

export default function PrivateRoute({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <Loading />;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
