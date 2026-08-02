import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminProtectedRoute = ({ children }) => {
  const { adminToken, role, loading } = useAuth();

  console.log("[AdminProtectedRoute] Checking authorization:", { hasToken: !!adminToken, role, loading });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0f172a]">
        <div className="relative">
          <div className="absolute inset-0 rounded-full blur-md bg-amber-500/20 animate-pulse"></div>
          <div className="relative animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
        </div>
      </div>
    );
  }

  if (!adminToken || role !== 'admin') {
    console.warn("[AdminProtectedRoute] Access denied. Redirecting to /admin/login");
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

export default AdminProtectedRoute;
