import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { Mail, Lock, Eye, EyeOff, User, ArrowRight, Loader2 } from 'lucide-react';
import ParticleBackground from '../components/ParticleBackground';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

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

      if (!res.ok) {
        setError(data.message || 'Login failed. Please check credentials.');
        setLoading(false);
        return;
      }

      // Success Logic
      if (data.role === 'admin') {
        localStorage.setItem('admin_token', data.token);
      } else {
        localStorage.setItem('client_token', data.token);
      }
      localStorage.setItem('role', data.role);

      // Redirect based on role
      if (data.role === 'admin') {
        window.location.href = '/admin-dashboard';
      } else {
        window.location.href = '/user-dashboard';
      }
    } catch (error) {
      console.error('Login Error:', error);
      setError('Server error. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-white relative overflow-hidden font-inter text-gray-800">
      <ParticleBackground />

      {/* Container */}
      <div className="relative z-10 w-full max-w-md p-8 sm:p-10">

        {/* Glass Card */}
        <div className="glass-panel backdrop-blur-xl bg-white/40 border-white/60 p-8 rounded-3xl shadow-[0_0_30px_rgba(255,255,255,0.8)] border hover:shadow-[0_0_40px_rgba(255,255,255,1)] transition-all duration-500">

          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold font-space-grotesk tracking-wide mb-2">
              ELEN<span className="text-gray-400">X</span>
            </h1>
            <p className="text-sm font-medium text-gray-500 uppercase tracking-widest text-glow">Welcome Back</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">

            {/* Email Input */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-1 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-gray-800 transition-colors duration-300" />
              </div>
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-3 bg-transparent border-b border-gray-300 focus:border-white focus:ring-0 focus:outline-none placeholder-gray-400 transition-all duration-300 group-focus-within:border-white group-focus-within:shadow-[0_1px_10px_rgba(255,255,255,0.8)]"
              />
            </div>

            {/* Password Input */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-1 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-gray-800 transition-colors duration-300" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-10 pr-10 py-3 bg-transparent border-b border-gray-300 focus:border-white focus:ring-0 focus:outline-none placeholder-gray-400 transition-all duration-300 group-focus-within:border-white group-focus-within:shadow-[0_1px_10px_rgba(255,255,255,0.8)]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-2 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>

            {/* Extras: Remember Me & Forgot Password */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center cursor-pointer group">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="sr-only"
                  />
                  <div className={`block w-8 h-5 rounded-full border border-gray-300 transition-colors duration-300 ${rememberMe ? 'bg-gray-200 border-white shadow-[0_0_10px_rgba(255,255,255,0.6)]' : 'bg-transparent'}`}></div>
                  <div className={`absolute left-1 top-1 bg-gray-400 w-3 h-3 rounded-full transition-transform duration-300 ${rememberMe ? 'transform translate-x-3 bg-white shadow-glow' : ''}`}></div>
                </div>
                <span className="ml-2 text-gray-500 group-hover:text-gray-700 transition-colors">Remember me</span>
              </label>
              <a href="#" className="text-gray-400 hover:text-white hover:drop-shadow-[0_0_5px_rgba(255,255,255,0.8)] transition-all duration-300">
                Forgot Password?
              </a>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center py-4 px-4 bg-gradient-to-r from-gray-100 to-white text-gray-800 font-bold rounded-lg shadow-[0_0_20px_rgba(255,255,255,0.5)] hover:shadow-[0_0_30px_rgba(255,255,255,0.9)] transform hover:-translate-y-0.5 transition-all duration-300 border border-white/80 group disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  <span>Connecting...</span>
                </>
              ) : (
                <>
                  <span>Initialize Session</span>
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </>
              )}
            </button>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-transparent text-gray-500 bg-white/40 backdrop-blur-xl rounded-full">Or continue with</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center py-3 px-4 bg-white/80 hover:bg-white text-gray-700 font-medium rounded-lg shadow-sm hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 border border-gray-200 group"
            >
              <svg className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform duration-300" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Google
            </button>

            {/* Register Link */}
            <div className="text-center text-sm text-gray-500 mt-6">
              Don't have an account?{' '}
              <Link to="/register" className="font-semibold text-gray-700 hover:text-gray-900 transition-colors duration-300 underline decoration-transparent hover:decoration-gray-400 underline-offset-4">
                Create Access
              </Link>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
