import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ShieldCheck } from 'lucide-react';
import ParticleBackground from '../components/ParticleBackground';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleGoogleLogin = () => {
        window.location.href = `${import.meta.env.VITE_API_URL}/api/auth/google/admin`;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Button Clicked");

        setIsLoading(true);

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/admin/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username: email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                // Success
                localStorage.setItem('admin_token', data.token);
                localStorage.setItem('admin_role', 'admin'); // Force admin role for now to match UI expectations

                // Force Navigation
                alert("Login Successful! Redirecting...");
                navigate('/admin-dashboard', { replace: true });

                // Fallback if navigate fails
                setTimeout(() => {
                    if (window.location.pathname !== '/admin-dashboard') {
                        window.location.href = '/admin-dashboard';
                    }
                }, 500);
            } else {
                // Failure
                alert(data.message || "Invalid Credentials");
            }
        } catch (error) {
            console.error(error);
            alert("Server Error! Is Backend Running on Port 5000?");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900 relative overflow-hidden font-inter text-gray-800 dark:text-gray-100">
            <ParticleBackground />

            {/* Container */}
            <div className="relative z-10 w-full max-w-md p-8 sm:p-10">

                {/* Glass Card */}
                <div className="glass-panel backdrop-blur-xl bg-white/40 border-white/60 p-8 rounded-3xl shadow-[0_0_30px_rgba(255,255,255,0.8)] border hover:shadow-[0_0_40px_rgba(255,255,255,1)] transition-all duration-500">

                    {/* Header */}
                    <div className="text-center mb-10">
                        <div className="flex justify-center mb-4">
                            <ShieldCheck className="h-12 w-12 text-gray-900 drop-shadow-glow" />
                        </div>
                        <h1 className="text-3xl font-bold font-space-grotesk tracking-wide mb-2">
                            ELENX <span className="text-gray-400">ADMIN</span>
                        </h1>
                        <p className="text-sm font-bold text-red-500 uppercase tracking-widest text-glow animate-pulse">Restricted Access</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-8">

                        {/* Email Input */}
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-1 flex items-center pointer-events-none">
                                <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-gray-800 transition-colors duration-300" />
                            </div>
                            <input
                                type="email"
                                placeholder="Admin Email"
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
                                placeholder="Access Key"
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

                        {/* Login Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full flex items-center justify-center py-4 px-4 bg-gradient-to-r from-gray-100 to-white text-gray-900 font-bold rounded-lg shadow-[0_0_20px_rgba(255,255,255,0.5)] hover:shadow-[0_0_30px_rgba(255,255,255,0.9)] transform hover:-translate-y-0.5 transition-all duration-300 border border-white/80 group ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                            <span>{isLoading ? "Authenticating..." : "Authenticate"}</span>
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
                            className="w-full flex items-center justify-center py-3 px-4 bg-white/80 hover:bg-white text-gray-700 font-medium rounded-lg shadow-[0_0_10px_rgba(255,255,255,0.5)] hover:shadow-[0_0_20px_rgba(255,255,255,0.9)] transform hover:-translate-y-0.5 transition-all duration-300 border border-white/80 group"
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
