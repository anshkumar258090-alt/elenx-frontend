import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const AuthSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [errorMSG, setErrorMSG] = useState(null);

  useEffect(() => {
    // Adding a minor delay to ensure React Router is fully settled
    const timer = setTimeout(() => {
      try {
        const params = new URLSearchParams(location.search);
        const token = params.get('token');
        const role = params.get('role');

        if (!token) {
          setErrorMSG("No authentication token received.");
          setTimeout(() => navigate('/login', { replace: true }), 2500);
          return;
        }

        if (role === 'admin') {
          // Store admin credentials
          localStorage.setItem('admin_token', token);
          localStorage.setItem('role', 'admin');
          // Use predictable navigation, but fallback to window.location if navigate fails
          navigate('/admin-dashboard', { replace: true });
        } else {
          // Store user credentials
          localStorage.setItem('client_token', token);
          localStorage.setItem('role', role || 'user');
          navigate('/user-dashboard', { replace: true });
        }
      } catch (error) {
        console.error("Auth routing error:", error);
        setErrorMSG("An error occurred during authentication.");
        setTimeout(() => navigate('/login', { replace: true }), 2500);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [location, navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-900 px-4 text-center">
      {errorMSG ? (
        <div className="glass-panel p-8 rounded-3xl border border-red-500/30 flex flex-col items-center shadow-lg animate-in fade-in zoom-in duration-300">
          <div className="rounded-full h-16 w-16 bg-red-100 border border-red-200 mb-6 flex items-center justify-center text-red-500 text-3xl font-bold shadow-sm">
            !
          </div>
          <h2 className="text-2xl font-bold tracking-wide text-red-600 mb-2">Login Failed</h2>
          <p className="text-gray-700 dark:text-gray-300 font-medium">{errorMSG}</p>
          <p className="text-gray-400 mt-4 text-sm font-medium animate-pulse">Redirecting to login...</p>
        </div>
      ) : (
        <div className="glass-panel p-10 rounded-3xl border border-white/60 flex flex-col items-center shadow-xl animate-in fade-in duration-500">
          <div className="relative mb-8 mt-4">
            <div className="absolute inset-0 rounded-full blur-md bg-blue-500/20 animate-pulse"></div>
            <div className="relative animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600 dark:border-blue-400 shadow-[0_0_15px_rgba(37,99,235,0.2)]"></div>
          </div>
          <h2 className="text-2xl font-black tracking-wide text-gray-800 dark:text-white mb-3">Authenticating</h2>
          <p className="text-gray-500 font-medium">Please wait while we securely set up your session...</p>
        </div>
      )}
    </div>
  );
};

export default AuthSuccess;
