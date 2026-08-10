import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ShieldCheck } from 'lucide-react';
import ParticleBackground from '../components/ParticleBackground';
import { useAuth } from '../context/AuthContext';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { adminToken, role, loginAdmin, loading } = useAuth();

  // If already logged in, automatically redirect to dashboard
  useEffect(() => {
    if (!loading && adminToken && role === 'admin') {
      console.log("[AdminLogin] Already authenticated. Auto-redirecting to /admin/dashboard");
      navigate('/admin/dashboard', { replace: true });
    }
  }, [adminToken, role, loading, navigate]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const error = params.get('error');
    if (error) {
      setErrorMsg(decodeURIComponent(error).replace(/_/g, ' '));
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, [location]);

  const handleGoogleLogin = () => {
    window.location.href = `${import.meta.env.VITE_API_URL}/api/auth/google/admin`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("[AdminLogin] Submit triggered. Starting authentication process...");
    setErrorMsg('');
    setIsLoading(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/admin/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: email.trim(), password }),
      });

      const data = await response.json();
      console.log("[AdminLogin] Login API response received:", { status: response.status, data });

      if (response.ok) {
        if (!data.token) {
          throw new Error("No token received from backend login API.");
        }

        console.log("[AdminLogin] Saving token to AuthContext state and localStorage...");
        loginAdmin(data.token);
        console.log("[AdminLogin] Token stored successfully in AuthContext.");

        console.log("[AdminLogin] Redirect started to: /admin/dashboard");
        navigate('/admin/dashboard', { replace: true });
      } else {
        console.warn("[AdminLogin] Access denied:", data.message || "Invalid Credentials");
        setErrorMsg(data.message || "Invalid Credentials");
      }
    } catch (error) {
      console.error("[AdminLogin] API connection error:", error);
      setErrorMsg(error.message || "Server Error! Is Backend Running?");
    } finally {
      setIsLoading(false);
    }
  };

 return (
 <div className="min-h-screen flex items-center justify-center bg-[#050608] relative overflow-hidden font-inter text-zinc-200">
 <ParticleBackground />

  {/* Animated Glow Orbs */}
  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-[#D9DEE5] via-[#F5F7FA] to-[#D9DEE5]/10 rounded-full blur-[120px] pointer-events-none animate-pulse"></div>

 {/* Container */}
 <div className="relative z-10 w-full max-w-md p-8 sm:p-10">

 {/* Glass Card */}
 <div className="glass-panel p-8 rounded-3xl border border-white/5 hover:border-white/10 shadow-2xl transition-all duration-500 relative z-10 bg-[#1e293b]/60 backdrop-blur-xl">

 {/* Header */}
 <div className="text-center mb-10">
 <div className="flex justify-center mb-4">
 <ShieldCheck className="h-12 w-12 text-zinc-400" />
 </div>
 <h1 className="text-3xl font-bold font-space-grotesk tracking-wide mb-2 text-white">
 Elenx <span className="text-zinc-500">ADMIN</span>
 </h1>
 <p className="text-sm font-bold text-red-500/80 uppercase tracking-widest">Restricted Access</p>
 </div>

 {errorMsg && (
 <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-center backdrop-blur-sm shadow-[0_0_15px_rgba(239,68,68,0.3)]">
 <p className="text-red-500 font-bold text-sm tracking-wide drop-shadow-md">{errorMsg}</p>
 </div>
 )}

 <form onSubmit={handleSubmit} className="space-y-8">

 {/* Email Input */}
 <div className="relative group">
 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
 <Mail className="h-5 w-5 text-zinc-500 group-focus-within:text-zinc-300 transition-colors duration-300" />
 </div>
 <input
 type="email"
 placeholder="Admin Email"
 value={email}
 onChange={(e) => setEmail(e.target.value)}
 required
 className="w-full pl-10 pr-4 py-3 bg-[#1e293b]/50 border border-zinc-700/50 rounded-xl focus:border-zinc-500 focus:bg-zinc-800/80 focus:outline-none placeholder-zinc-500 text-zinc-200 transition-all duration-300 shadow-inner shadow-black/20"
 />
 </div>

 {/* Password Input */}
 <div className="relative group">
 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
 <Lock className="h-5 w-5 text-zinc-500 group-focus-within:text-zinc-300 transition-colors duration-300" />
 </div>
 <input
 type={showPassword ? "text" : "password"}
 placeholder="Access Key"
 value={password}
 onChange={(e) => setPassword(e.target.value)}
 required
 className="w-full pl-10 pr-10 py-3 bg-[#1e293b]/50 border border-zinc-700/50 rounded-xl focus:border-zinc-500 focus:bg-zinc-800/80 focus:outline-none placeholder-zinc-500 text-zinc-200 transition-all duration-300 shadow-inner shadow-black/20"
 />
 <button
 type="button"
 onClick={() => setShowPassword(!showPassword)}
 className="absolute inset-y-0 right-0 pr-3 flex items-center text-zinc-500 hover:text-zinc-300 focus:outline-none transition-colors"
 >
 {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
 </button>
 </div>

 {/* Login Button */}
 <button
 type="submit"
 disabled={isLoading}
 className={`w-full flex items-center justify-center py-3.5 px-4 bg-[#D9DEE5] text-zinc-950 hover:bg-[#AEB6C2] gold-glow font-bold rounded-xl shadow-lg shadow-black/20 transform hover:-translate-y-0.5 transition-all duration-300 group ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
 >
 <span>{isLoading ? "Authenticating..." : "Authenticate"}</span>
 </button>
 <div className="relative my-6">
 <div className="absolute inset-0 flex items-center">
 <div className="w-full border-t border-zinc-700"></div>
 </div>
 <div className="relative flex justify-center text-sm">
 <span className="px-2 bg-[#1e293b]/80 text-zinc-500 rounded-full">Or continue with</span>
 </div>
 </div>

 <button
 type="button"
 onClick={handleGoogleLogin}
 className="w-full flex items-center justify-center py-3 px-4 bg-[#1e293b]/50 hover:bg-zinc-800 text-zinc-200 font-medium rounded-xl shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 border border-zinc-600/50 group"
 >
 <svg className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform duration-300" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
 <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
 <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
 <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
 <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
 </svg>
 Google
 </button>

 </form>
 </div>
 </div>
 </div>
 );
};

export default AdminLogin;
