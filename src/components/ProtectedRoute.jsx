import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
export default function ProtectedRoute({ role, children }) {
  const { user, loading } = useAuth();
  const location = useLocation();
  if (loading)
    return (
      <div className="container page-content">
        <div className="skeleton skeleton-lg" />
      </div>
    );
  if (!user) return <Navigate to="/login" state={{ from: location }} replace />;
  if (role && user.role !== role)
    return <Navigate to="/unauthorized" replace />;
  return children;
}
