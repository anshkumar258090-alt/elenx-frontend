import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const AuthSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    try {
      const params = new URLSearchParams(location.search);
      const token = params.get('token');
      const role = params.get('role');

      if (token) {
        if (role === 'admin') {
          // Store admin credentials
          localStorage.setItem('admin_token', token);
          localStorage.setItem('role', 'admin'); // Fixed from 'admin_role' to 'role'
          window.location.href = '/admin-dashboard'; // Use predictable hard navigation to avoid React Router state bugs causing blank screens
        } else {
          // Store user credentials
          localStorage.setItem('client_token', token);
          localStorage.setItem('role', role || 'user');
          window.location.href = '/user-dashboard'; // Use predictable hard navigation
        }
      } else {
        // No token, go to login
        navigate('/login', { replace: true });
      }
    } catch (error) {
      console.error("Auth routing error:", error);
      navigate('/login', { replace: true });
    }
  }, [location, navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-900">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 dark:border-white mb-4"></div>
      <h2 className="text-2xl font-bold tracking-wide text-gray-800 dark:text-white">Authenticating...</h2>
      <p className="text-gray-500 mt-2">Please wait while we set up your session.</p>
    </div>
  );
};

export default AuthSuccess;
