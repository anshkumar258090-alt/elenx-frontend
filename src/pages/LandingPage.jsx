import { motion } from 'framer-motion';
import ParticleBackground from '../components/ParticleBackground';
import Navbar from '../components/Navbar';
import PerformanceSection from '../components/PerformanceSection';
import SystemArchitecture from '../components/SystemArchitecture';
import { Link } from 'react-router-dom';

const LandingPage = () => {
    return (
        <div className="min-h-screen overflow-hidden relative font-inter selection:bg-gray-300 selection:text-gray-900">
            <ParticleBackground />
            <Navbar />

            {/* Hero Section */}
            <section className="relative z-10 pt-32 pb-20 lg:pt-48 lg:pb-32 px-4">
                <div className="max-w-7xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 font-space-grotesk bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-600 to-gray-900">
                            Unleash <span className="text-gray-400">Pure</span> Performance.
                        </h1>
                        <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
                            ElenX optimizes your system at the kernel level.
                            <span className="block mt-2">Zero latency. Maximum FPS. The ultimate competitive advantage.</span>
                        </p>
                        <div className="mt-10 flex justify-center gap-6">
                            <Link to="/register" className="relative group px-8 py-4 bg-white text-gray-800 font-bold rounded-full shadow-lg hover:shadow-glow transition-all duration-300 border border-gray-100 overflow-hidden">
                                <span className="relative z-10">Initialize ElenX</span>
                                <div className="absolute inset-0 bg-gray-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </Link>
                            <a href="#features" className="px-8 py-4 bg-transparent border border-gray-300 text-gray-600 font-medium rounded-full hover:bg-white/50 hover:border-gray-400 transition-all duration-300 backdrop-blur-sm">
                                View Features
                            </a>
                        </div>
                    </motion.div>

                    {/* Abstract Hero Visual (CSS Only since Image Gen failed) */}
                    <motion.div
                        className="mt-20 mx-auto w-64 h-64 md:w-96 md:h-96 relative flex items-center justify-center"
                        animate={{ y: [0, -20, 0] }}
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <div className="absolute inset-0 bg-white rounded-full opacity-20 blur-3xl animate-pulse"></div>
                        <div className="relative w-full h-full bg-gradient-to-tr from-gray-100 to-white rounded-full shadow-2xl border border-white/80 flex items-center justify-center backdrop-blur-md">
                            <div className="w-3/4 h-3/4 bg-white/40 rounded-full border border-white flex items-center justify-center shadow-inner">
                                <span className="text-6xl font-thin tracking-tighter text-gray-300">ELENX</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Features (System Architecture) */}
            <div id="features">
                <SystemArchitecture />
            </div>

            {/* Comparison Chart */}
            <PerformanceSection />

            {/* Products Section */}
            <section id="products" className="relative z-10 py-24 bg-gradient-to-b from-white to-gray-50">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl font-space-grotesk">Available Access</h2>
                        <p className="mt-4 text-gray-500">Choose your tier. Dominate immediately.</p>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="glass-panel rounded-3xl p-1 border border-gray-200 shadow-xl overflow-hidden hover:shadow-[0_0_30px_rgba(255,255,255,0.8)] transition-all duration-500"
                    >
                        <div className="bg-white/80 rounded-[20px] p-8 md:p-12 backdrop-blur-md">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 pb-8 border-b border-gray-100">
                                <div>
                                    <h3 className="text-3xl font-bold text-gray-900 font-space-grotesk">ElenX External Panel</h3>
                                    <p className="text-gray-500 mt-2 flex items-center gap-2">
                                        <span className="inline-block w-2 h-2 rounded-full bg-green-400 box-shadow-glow"></span>
                                        Undetected • High Performance
                                    </p>
                                </div>
                                <div className="mt-4 md:mt-0 px-4 py-1 bg-gray-100 rounded-full text-xs font-bold text-gray-500 uppercase tracking-wider">
                                    Version 2.4.0
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                <div>
                                    <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-6">Feature Set</h4>
                                    <ul className="space-y-4">
                                        {["Windows 10 & 11 Support", "Aimbot: Head Rotation, Visible Check", "Head Aim, Silent Aim, FOV, No Recoil", "Visuals/ESP: Line, Name, Health", "ESP: Distance, Skeleton", "Extras: Speed Hack", "Stream Mode (Hidden in OBS)"].map((item, i) => (
                                            <li key={i} className="flex items-start">
                                                <svg className="w-5 h-5 text-gray-900 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                                </svg>
                                                <span className="text-gray-600">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                                    <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-6">Pricing Plans</h4>

                                    <div className="grid grid-cols-2 gap-4 mb-2">
                                        <div className="text-xs font-bold text-gray-400 uppercase">International (USD)</div>
                                        <div className="text-xs font-bold text-gray-400 uppercase">India (INR)</div>
                                    </div>

                                    <div className="space-y-4">
                                        {[
                                            { dur: "1 Day", usd: "$1", inr: "₹100" },
                                            { dur: "1 Month", usd: "$8", inr: "₹700" },
                                            { dur: "1 Year", usd: "$15", inr: "₹1500" },
                                            { dur: "Permanent", usd: "$35", inr: "₹3000" },
                                        ].map((plan, i) => (
                                            <div key={i} className="flex justify-between items-center py-2 border-b border-gray-200 last:border-0 hover:bg-gray-100/50 px-2 rounded transition-colors">
                                                <span className="font-medium text-gray-500">{plan.dur}</span>
                                                <div className="flex gap-4 text-right">
                                                    <span className="font-bold text-gray-900 w-12">{plan.usd}</span>
                                                    <span className="font-bold text-gray-700 w-16">{plan.inr}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <button className="w-full mt-8 py-3 bg-gray-900 text-white font-bold rounded-xl shadow-lg hover:bg-gray-800 hover:shadow-[0_0_15px_rgba(50,50,50,0.5)] transition-all duration-300 transform hover:-translate-y-1">
                                        Purchase Access Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Footer */}
            <footer className="relative z-10 bg-white border-t border-gray-200 py-12">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <p className="text-gray-400">© 2026 ElenX Systems. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
