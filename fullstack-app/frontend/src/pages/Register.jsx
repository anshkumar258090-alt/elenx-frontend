import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { Mail, Lock, User, ArrowRight, Eye, EyeOff, Loader2 } from 'lucide-react';
import ParticleBackground from '../components/ParticleBackground';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Client-side validation
    if (username.trim().length < 3) {
      setError('Username must be at least 3 characters');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/register`, {
        username: username.trim(),
        email: email.trim().toLowerCase(),
        password
      });
      alert('Registration successful! Redirecting to login...');
      navigate('/login');
    } catch (err) {
      // Show the actual backend error instead of generic "Access Denied"
      const message = err.response?.data?.message || err.message || 'Registration failed. Please try again.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f172a] relative overflow-hidden font-inter text-zinc-200 selection:bg-amber-500/30 selection:text-white">
      <ParticleBackground />

      {/* Cyber Grid Background Accent */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(245, 158, 11,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(245, 158, 11,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-40 pointer-events-none z-0"></div>

      {/* Ethereal Glow Orbs matching storefront theme */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-amber-600/10 rounded-full blur-[120px] pointer-events-none animate-pulse-slow"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-amber-600/10 rounded-full blur-[120px] pointer-events-none animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-[120px] pointer-events-none animate-pulse"></div>

      {/* Container */}
      <div className="relative z-10 w-full max-w-md p-6 sm:p-8">

        {/* Futuristic Cyber-Security Card */}
        <div className="glass-panel-futuristic p-8 rounded-3xl border border-amber-500/15 hover:border-amber-500/30 shadow-[0_0_50px_rgba(245, 158, 11,0.08)] hover:shadow-[0_0_60px_rgba(245, 158, 11,0.18)] transition-all duration-500 relative z-10 overflow-hidden">
          
          {/* Glowing Top Scanner Laser Line */}
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-amber-500 to-transparent shadow-[0_0_8px_rgba(245, 158, 11,1)] z-10 pointer-events-none"></div>

          {/* HUD Corner Accents for Premium Cyberpunk Look */}
          <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-amber-500/40 rounded-tl-lg pointer-events-none"></div>
          <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-amber-500/40 rounded-tr-lg pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-amber-500/40 rounded-bl-lg pointer-events-none"></div>
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-amber-500/40 rounded-br-lg pointer-events-none"></div>

          {/* Header */}
          <div className="text-center mb-8 relative">
            <h1 className="text-3xl font-extrabold font-space-grotesk tracking-wider mb-2 text-white bg-clip-text text-transparent bg-gradient-to-r from-white via-zinc-200 to-amber-400">
              ELEN<span className="text-amber-400">X</span>
            </h1>
            <p className="text-xs font-bold text-amber-400/80 uppercase tracking-[0.25em] font-mono">
              INITIALIZE IDENTITY
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-950/40 border border-red-500/30 rounded-xl text-red-400 text-xs font-semibold text-center backdrop-blur-md shadow-[0_0_15px_rgba(239,68,68,0.1)]">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Username Input */}
            <div className="space-y-1.5 group">
              <label className="text-[10px] font-bold text-zinc-500 group-focus-within:text-amber-400 transition-colors uppercase tracking-wider font-mono">
                Operator Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <User className="h-4.5 w-4.5 text-zinc-600 group-focus-within:text-amber-400 transition-colors duration-300" />
                </div>
                <input
                  type="text"
                  placeholder="e.g. Agent007"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  disabled={loading}
                  className="w-full pl-10 pr-4 py-3 bg-black/40 border border-zinc-800/80 rounded-xl focus:border-amber-500/60 focus:bg-[#0f172a]/80 focus:outline-none focus:shadow-[0_0_15px_rgba(245, 158, 11,0.15)] placeholder-zinc-700 text-zinc-200 text-sm transition-all duration-300 font-medium disabled:opacity-50"
                />
              </div>
            </div>

            {/* Email Input */}
            <div className="space-y-1.5 group">
              <label className="text-[10px] font-bold text-zinc-500 group-focus-within:text-amber-400 transition-colors uppercase tracking-wider font-mono">
                System Ident (Email)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Mail className="h-4.5 w-4.5 text-zinc-600 group-focus-within:text-amber-400 transition-colors duration-300" />
                </div>
                <input
                  type="email"
                  placeholder="name@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                  className="w-full pl-10 pr-4 py-3 bg-black/40 border border-zinc-800/80 rounded-xl focus:border-amber-500/60 focus:bg-[#0f172a]/80 focus:outline-none focus:shadow-[0_0_15px_rgba(245, 158, 11,0.15)] placeholder-zinc-700 text-zinc-200 text-sm transition-all duration-300 font-medium disabled:opacity-50"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-1.5 group">
              <label className="text-[10px] font-bold text-zinc-500 group-focus-within:text-amber-400 transition-colors uppercase tracking-wider font-mono">
                Access Code (Password)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Lock className="h-4.5 w-4.5 text-zinc-600 group-focus-within:text-amber-400 transition-colors duration-300" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="min 6 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  disabled={loading}
                  className="w-full pl-10 pr-10 py-3 bg-black/40 border border-zinc-800/80 rounded-xl focus:border-amber-500/60 focus:bg-[#0f172a]/80 focus:outline-none focus:shadow-[0_0_15px_rgba(245, 158, 11,0.15)] placeholder-zinc-700 text-zinc-200 text-sm transition-all duration-300 font-mono font-medium disabled:opacity-50"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-zinc-600 hover:text-amber-400 focus:outline-none transition-colors"
                >
                  {showPassword ? <EyeOff className="h-4.5 w-4.5" /> : <Eye className="h-4.5 w-4.5" />}
                </button>
              </div>
            </div>

            {/* Register Button with Premium Glow & Shimmer */}
            <button
              type="submit"
              disabled={loading}
              className="w-full relative overflow-hidden flex items-center justify-center py-3.5 px-4 bg-amber-500 text-zinc-950 hover:bg-amber-400 font-extrabold rounded-xl shadow-lg shadow-black/20 hover:shadow-[0_0_25px_rgba(245, 158, 11,0.45)] transform hover:-translate-y-0.5 transition-all duration-300 group mt-8 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {/* Sliding shine hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out pointer-events-none" />

              {loading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  <span className="font-mono tracking-wider uppercase text-xs">Registering Ident...</span>
                </>
              ) : (
                <>
                  <span className="font-mono tracking-wider uppercase text-xs">Initialize & Join</span>
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                </>
              )}
            </button>

            {/* Login Link */}
            <div className="text-center text-xs text-zinc-600 mt-6 font-mono font-medium">
              ALREADY INITIALIZED?{' '}
              <Link to="/login" className="font-bold text-zinc-400 hover:text-amber-400 transition-colors uppercase ml-1">
                ACCESS SYSTEM
              </Link>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
