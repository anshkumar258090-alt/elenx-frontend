import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { Mail, Lock, Eye, EyeOff, User, ArrowRight, Loader2 } from 'lucide-react';
import ParticleBackground from '../components/ParticleBackground';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { loginAdmin, loginClient } = useAuth();
  const { addToCart } = useCart();

  const handleGoogleLogin = () => {
    window.location.href = `${import.meta.env.VITE_API_URL}/api/auth/google/client`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), password })
      });

      const data = await res.json();
      console.log("[Login] API response received:", { status: res.status, data });

      if (!res.ok) {
        setError(data.message || 'Login failed. Please check credentials.');
        setLoading(false);
        return;
      }

      // Success Logic using context
      if (data.role === 'admin') {
        console.log("[Login] Saving admin credentials...");
        loginAdmin(data.token);
        console.log("[Login] Redirect started to: /admin/dashboard");
        navigate('/admin/dashboard', { replace: true });
      } else {
        console.log("[Login] Saving client credentials...");
        loginClient(data.token, data.role);
        console.log("[Login] Redirect started to client dashboard");
        const pendingItem = sessionStorage.getItem('pending_checkout_item');
        if (pendingItem) {
          try {
            const item = JSON.parse(pendingItem);
            // Build a product-like object for addToCart
            const product = {
              id: item.productId,
              name: item.name,
              slug: item.slug,
              isPremium: item.isPremium,
              pricing: item.pricing,
            };
            addToCart(product, item.selectedPlanIndex, item.currency);
            sessionStorage.removeItem('pending_checkout_item');
            console.log("[Login] Pending item added to cart, redirecting to cart tab");
          } catch (parseErr) {
            console.error("[Login] Error parsing pending checkout item:", parseErr);
            sessionStorage.removeItem('pending_checkout_item');
          }
          navigate('/user-dashboard?tab=cart', { replace: true });
        } else {
          navigate('/user-dashboard', { replace: true });
        }
      }
    } catch (error) {
      console.error('Login Error:', error);
      setError('Server error. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050608] relative overflow-hidden font-inter text-zinc-200 selection:bg-[#D9DEE5]/30 selection:text-white">
      <ParticleBackground />

      {/* Cyber Grid Background Accent */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(174, 182, 194,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(174, 182, 194,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-40 pointer-events-none z-0"></div>

      {/* Ethereal Glow Orbs matching storefront theme */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-gradient-to-r from-[#D9DEE5] via-[#F5F7FA] to-[#D9DEE5]/10 rounded-full blur-[120px] pointer-events-none animate-pulse-slow"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-gradient-to-r from-[#D9DEE5] via-[#F5F7FA] to-[#D9DEE5]/10 rounded-full blur-[120px] pointer-events-none animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#D9DEE5]/5 rounded-full blur-[120px] pointer-events-none animate-pulse"></div>

      {/* Container */}
      <div className="relative z-10 w-full max-w-md p-6 sm:p-8">

        {/* Futuristic Cyber-Security Card */}
        <div className="glass-panel-futuristic p-8 rounded-3xl border border-[#AEB6C2]/12 hover:border-[#AEB6C2]/20 shadow-[0_0_50px_rgba(174, 182, 194,0.08)] hover:shadow-[0_0_60px_rgba(174, 182, 194,0.18)] transition-all duration-500 relative z-10 overflow-hidden">
          
          {/* Glowing Top Scanner Laser Line */}
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#AEB6C2] to-transparent shadow-[0_0_8px_rgba(174, 182, 194,1)] z-10 pointer-events-none"></div>

          {/* HUD Corner Accents for Premium Cyberpunk Look */}
          <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-[#AEB6C2]/40 rounded-tl-lg pointer-events-none"></div>
          <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-[#AEB6C2]/40 rounded-tr-lg pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-[#AEB6C2]/40 rounded-bl-lg pointer-events-none"></div>
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-[#AEB6C2]/40 rounded-br-lg pointer-events-none"></div>

          {/* Header */}
          <div className="text-center mb-8 relative">
            <h1 className="text-3xl font-extrabold font-space-grotesk tracking-wider mb-2 text-white bg-clip-text text-transparent bg-gradient-to-r from-white via-zinc-200 to-[#D9DEE5]">
              ELEN<span className="text-[#AEB6C2]">X</span>
            </h1>
            <p className="text-xs font-bold text-[#AEB6C2]/80 uppercase tracking-[0.25em] font-mono">
              CLIENT SECURE GATEWAY
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-950/40 border border-red-500/30 rounded-xl text-red-400 text-xs font-semibold text-center backdrop-blur-md shadow-[0_0_15px_rgba(239,68,68,0.1)]">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Email Input */}
            <div className="space-y-1.5 group">
              <label className="text-[10px] font-bold text-zinc-500 group-focus-within:text-[#AEB6C2] transition-colors uppercase tracking-wider font-mono">
                System Ident (Email)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Mail className="h-4.5 w-4.5 text-zinc-600 group-focus-within:text-[#AEB6C2] transition-colors duration-300" />
                </div>
                <input
                  type="email"
                  placeholder="name@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3 bg-black/40 border border-zinc-800/80 rounded-xl focus:border-[#AEB6C2]/60 focus:bg-[#050608]/80 focus:outline-none focus:shadow-[0_0_15px_rgba(174, 182, 194,0.15)] placeholder-zinc-700 text-zinc-200 text-sm transition-all duration-300 font-medium"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-1.5 group">
              <label className="text-[10px] font-bold text-zinc-500 group-focus-within:text-[#AEB6C2] transition-colors uppercase tracking-wider font-mono">
                Access Code (Password)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Lock className="h-4.5 w-4.5 text-zinc-600 group-focus-within:text-[#AEB6C2] transition-colors duration-300" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-10 pr-10 py-3 bg-black/40 border border-zinc-800/80 rounded-xl focus:border-[#AEB6C2]/60 focus:bg-[#050608]/80 focus:outline-none focus:shadow-[0_0_15px_rgba(174, 182, 194,0.15)] placeholder-zinc-700 text-zinc-200 text-sm transition-all duration-300 font-mono font-medium"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-zinc-600 hover:text-[#AEB6C2] focus:outline-none transition-colors"
                >
                  {showPassword ? <EyeOff className="h-4.5 w-4.5" /> : <Eye className="h-4.5 w-4.5" />}
                </button>
              </div>
            </div>

            {/* Extras: Remember Me & Forgot Password */}
            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center cursor-pointer group">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="sr-only"
                  />
                  <div className={`block w-8 h-4.5 rounded-full border transition-colors duration-300 ${rememberMe ? 'bg-[#D9DEE5]/20 border-[#AEB6C2]/40' : 'bg-black/60 border-zinc-800'}`}></div>
                  <div className={`absolute left-0.5 top-0.5 bg-zinc-600 w-3.5 h-3.5 rounded-full transition-transform duration-300 ${rememberMe ? 'transform translate-x-3.5 bg-[#AEB6C2] shadow-[0_0_8px_rgba(174, 182, 194,0.6)]' : ''}`}></div>
                </div>
                <span className="ml-2 text-zinc-500 group-hover:text-zinc-300 transition-colors font-medium">Keep Sync Active</span>
              </label>
              <a href="#" className="text-zinc-500 hover:text-[#AEB6C2] hover:drop-shadow-[0_0_3px_rgba(174, 182, 194,0.4)] transition-all font-medium">
                Reset Keys
              </a>
            </div>

            {/* Login Button with Premium Glow & Shimmer */}
            <button
              type="submit"
              disabled={loading}
              className="w-full relative overflow-hidden flex items-center justify-center py-3.5 px-4 bg-[#D9DEE5] text-zinc-950 hover:bg-[#AEB6C2] font-extrabold rounded-xl shadow-lg shadow-black/20 hover:shadow-[0_0_25px_rgba(174, 182, 194,0.45)] transform hover:-translate-y-0.5 transition-all duration-300 group disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {/* Sliding shine hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out pointer-events-none" />

              {loading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  <span className="font-mono tracking-wider uppercase text-xs">Establishing Link...</span>
                </>
              ) : (
                <>
                  <span className="font-mono tracking-wider uppercase text-xs">Initialize Session</span>
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                </>
              )}
            </button>

            {/* Separator */}
            <div className="relative py-3">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-zinc-800/80"></div>
              </div>
              <div className="relative flex justify-center text-[10px] font-bold uppercase tracking-widest">
                <span className="px-3 bg-[#111116] text-zinc-500 font-mono text-[9px]">Secure Connector</span>
              </div>
            </div>

            {/* Premium Google Auth Button */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center py-2 px-4 bg-black/40 hover:bg-[#1e293b]/60 border border-zinc-800/80 hover:border-[#AEB6C2]/15 text-zinc-400 hover:text-white font-mono uppercase text-[10px] tracking-wider rounded-xl shadow-md hover:shadow-[0_0_15px_rgba(174, 182, 194,0.08)] transform hover:-translate-y-0.5 transition-all duration-300 group"
            >
              <svg className="w-3.5 h-3.5 mr-2 group-hover:scale-110 transition-transform duration-300" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Continue with Google
            </button>

            {/* Register Link */}
            <div className="text-center text-xs text-zinc-600 mt-6 font-mono font-medium">
              NO CURRENT IDENT?{' '}
              <Link to="/register" className="font-bold text-zinc-400 hover:text-[#AEB6C2] transition-colors uppercase ml-1">
                CREATE ACCESS
              </Link>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
