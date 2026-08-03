import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AuthSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [errorMSG, setErrorMSG] = useState(null);
  const { loginAdmin, loginClient } = useAuth();

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
          console.log("[AuthSuccess] Saving Google OAuth admin credentials...");
          loginAdmin(token);
          console.log("[AuthSuccess] Redirecting Google-authenticated admin to /admin/dashboard");
          navigate('/admin/dashboard', { replace: true });
        } else {
          console.log("[AuthSuccess] Saving Google OAuth client credentials...");
          loginClient(token, role);
          console.log("[AuthSuccess] Redirecting Google-authenticated client");
          if (sessionStorage.getItem('pending_checkout_item')) {
            navigate('/', { replace: true });
          } else {
            navigate('/user-dashboard', { replace: true });
          }
        }
      } catch (error) {
        console.error("Auth routing error:", error);
        setErrorMSG("An error occurred during authentication.");
        setTimeout(() => navigate('/login', { replace: true }), 2500);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [location, navigate, loginAdmin, loginClient]);

 return (
 <div className="min-h-screen flex flex-col items-center justify-center bg-[#0f172a] px-4 text-center">
 {errorMSG ? (
 <div className="glass-panel p-8 rounded-3xl border border-red-500/30 flex flex-col items-center shadow-lg animate-in fade-in zoom-in duration-300">
 <div className="rounded-full h-16 w-16 bg-red-900/40 border border-red-200 mb-6 flex items-center justify-center text-red-500 text-3xl font-bold shadow-sm">
 !
 </div>
 <h2 className="text-2xl font-bold tracking-wide text-red-600 mb-2">Login Failed</h2>
 <p className="text-zinc-300 font-medium">{errorMSG}</p>
 <p className="text-zinc-500 mt-4 text-sm font-medium animate-pulse">Redirecting to login...</p>
 </div>
 ) : (
 <div className="glass-panel p-10 rounded-3xl border border-white/10 flex flex-col items-center shadow-xl animate-in fade-in duration-500">
 <div className="relative mb-8 mt-4">
 <div className="absolute inset-0 rounded-full blur-md bg-amber-500/20 animate-pulse"></div>
 <div className="relative animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-amber-400 shadow-[0_0_15px_rgba(37,99,235,0.2)]"></div>
 </div>
 <h2 className="text-2xl font-black tracking-wide text-white mb-3">Authenticating</h2>
 <p className="text-zinc-400 font-medium">Please wait while we securely set up your session...</p>
 </div>
 )}
 </div>
 );
};

export default AuthSuccess;
