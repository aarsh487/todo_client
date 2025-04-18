import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Spinner } from './Spinner';

interface ProtectedRouteProps {
  allowedRole?: number;
}

const ProtectedRoute = ({ allowedRole }: ProtectedRouteProps) => {
  const { user, loading, isAuthenticated } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRole !== undefined && user?.role !== allowedRole) {
    const redirectPath = user?.role === 0 ? "/admin" : "/client";
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
