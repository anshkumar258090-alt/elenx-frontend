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
            <p className="text-sm font-medium text-gray-500 uppercase tracking-widest text-glow">Join the Elite</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Username Input */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-1 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400 group-focus-within:text-gray-800 transition-colors duration-300" />
              </div>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                disabled={loading}
                className="w-full pl-10 pr-4 py-3 bg-transparent border-b border-gray-300 focus:border-white focus:ring-0 focus:outline-none placeholder-gray-400 transition-all duration-300 group-focus-within:border-white group-focus-within:shadow-[0_1px_10px_rgba(255,255,255,0.8)] disabled:opacity-50"
              />
            </div>

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
                disabled={loading}
                className="w-full pl-10 pr-4 py-3 bg-transparent border-b border-gray-300 focus:border-white focus:ring-0 focus:outline-none placeholder-gray-400 transition-all duration-300 group-focus-within:border-white group-focus-within:shadow-[0_1px_10px_rgba(255,255,255,0.8)] disabled:opacity-50"
              />
            </div>

            {/* Password Input */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-1 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-gray-800 transition-colors duration-300" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password (min 6 characters)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                disabled={loading}
                className="w-full pl-10 pr-10 py-3 bg-transparent border-b border-gray-300 focus:border-white focus:ring-0 focus:outline-none placeholder-gray-400 transition-all duration-300 group-focus-within:border-white group-focus-within:shadow-[0_1px_10px_rgba(255,255,255,0.8)] disabled:opacity-50"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-2 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>

            {/* Register Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center py-4 px-4 bg-gradient-to-r from-gray-100 to-white text-gray-800 font-bold rounded-lg shadow-[0_0_20px_rgba(255,255,255,0.5)] hover:shadow-[0_0_30px_rgba(255,255,255,0.9)] transform hover:-translate-y-0.5 transition-all duration-300 border border-white/80 group mt-8 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  <span>Creating Account...</span>
                </>
              ) : (
                <>
                  <span>Initialize & Join</span>
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </>
              )}
            </button>

            {/* Login Link */}
            <div className="text-center text-sm text-gray-500 mt-6">
              Already initialized?{' '}
              <Link to="/login" className="font-semibold text-gray-700 hover:text-gray-900 transition-colors duration-300 underline decoration-transparent hover:decoration-gray-400 underline-offset-4">
                Access System
              </Link>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
