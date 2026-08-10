import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { clientToken, role, loading } = useAuth();

  console.log("[ProtectedRoute] Checking authorization:", { hasToken: !!clientToken, role, loading });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0f172a]">
        <div className="relative">
          <div className="absolute inset-0 rounded-full blur-md bg-[#AEB6C2]/20 animate-pulse"></div>
          <div className="relative animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#AEB6C2]"></div>
        </div>
      </div>
    );
  }

  if (!clientToken || (role !== 'user' && role !== 'client')) {
    console.warn("[ProtectedRoute] Access denied. Redirecting to /login");
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
