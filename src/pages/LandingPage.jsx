import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import MagicRings from '../components/MagicRings';
import LightRays from '../components/LightRays';
import { Link, useNavigate } from 'react-router-dom';
import { Monitor, Globe, Cpu, Zap, Cloud, Link2, Palette, Smartphone, Target, Shield, Eye, Wrench, Gem, Server, Radio, Film, Crosshair } from 'lucide-react';

const PRODUCTS = [
  {
    id: 1,
    name: 'EXTERNAL BASIC',
    slug: 'external-basic',
    description: 'Essential external tactical advantage with location and stream protection.',
    isPremium: false,
    compatibility: 'Windows 10 / 11',
    version: 'v1.1.2',
    features: ['Aimbot Head', 'Aimbot Drag', 'Sniper Scope', 'Sniper Switch', 'Location', 'Streamer Mode', 'No Blacklist', 'Fully Safe', 'All Server'],
    pricing: [
      { id: '1day', label: '1 Day', usd: 1, inr: 95 },
      { id: '1week', label: '1 Week', usd: 3, inr: 250 },
      { id: '1month', label: '1 Month', usd: 6, inr: 499 },
      { id: '1year', label: '1 Year', usd: 20, inr: 1900 },
      { id: 'lifetime', label: 'Lifetime', usd: 30, inr: 2800 },
    ],
    icon: Target,
  },
  {
    id: 2,
    name: 'EXTERNAL PREMIUM',
    slug: 'external-premium',
    description: 'Advanced external suite with full ESP vision, speed, and hardware resets.',
    isPremium: true,
    compatibility: 'Windows 10 / 11',
    version: 'v2.4.1',
    features: ['Aimbot Head', 'Aimbot Drag', 'Aimbot AI', 'Sniper Scope', 'Sniper Switch', 'Location', 'Wall Hack', 'Speed Hack', 'Camera Hack', 'Vision Hack', 'Guest Reset', 'Streamer Mode', 'No Blacklist', 'Fully Safe', 'All Server'],
    pricing: [
      { id: '1day', label: '1 Day', usd: 1, inr: 95 },
      { id: '1week', label: '1 Week', usd: 3, inr: 300 },
      { id: '1month', label: '1 Month', usd: 8, inr: 749 },
      { id: '1year', label: '1 Year', usd: 25, inr: 2300 },
      { id: 'lifetime', label: 'Lifetime', usd: 30, inr: 3000 },
    ],
    icon: Zap,
  },
  {
    id: 3,
    name: 'INTERNAL BASIC',
    slug: 'internal-basic',
    description: 'Core internal hooks for pure performance, direct bones mapping, and boxes.',
    isPremium: false,
    compatibility: 'Windows 10 / 11',
    version: 'v1.2.0',
    features: ['Aimbot Head', 'Aimbot Body', 'Aimbot Speed', 'Visible Check', 'ESP Bone', 'ESP Box', 'ESP Line', 'ESP Name', 'Guest Reset', 'Bypass Hook', 'No Blacklist', 'Fully Safe', 'All Server'],
    pricing: [
      { id: '1day', label: '1 Day', usd: 2, inr: 180 },
      { id: '1week', label: '1 Week', usd: 5, inr: 400 },
      { id: '1month', label: '1 Month', usd: 10, inr: 899 },
      { id: '1year', label: '1 Year', usd: 30, inr: 2800 },
      { id: 'lifetime', label: 'Lifetime', usd: 45, inr: 4000 },
    ],
    icon: Wrench,
  },
  {
    id: 4,
    name: 'INTERNAL PRO',
    slug: 'internal-pro',
    description: 'Full domination suite with silent aim, custom overlays, and high performance.',
    isPremium: true,
    compatibility: 'Windows 10 / 11',
    version: 'v3.1.0',
    features: ['Aimbot Head', 'Aimbot Body', 'Silent Aim', 'FOV Custom', 'Visible Check', 'Wall ESP', 'Bones ESP', 'Bounding Box', 'Crosshair Visual', 'Custom Theme', 'OBS Stream Proof', 'No Blacklist', 'Anti-Ban Active', 'All Server'],
    pricing: [
      { id: '1day', label: '1 Day', usd: 3, inr: 250 },
      { id: '1week', label: '1 Week', usd: 7, inr: 600 },
      { id: '1month', label: '1 Month', usd: 12, inr: 1099 },
      { id: '1year', label: '1 Year', usd: 40, inr: 3600 },
      { id: 'lifetime', label: 'Lifetime', usd: 55, inr: 5000 },
    ],
    icon: Gem,
  },
  {
    id: 5,
    name: 'BIOS STREAMER',
    slug: 'bios-streamer',
    description: 'Hardware level BIOS streamer utility with deep kernel HWID spoofing controls.',
    isPremium: true,
    compatibility: 'Windows 10 / 11 (All BIOS)',
    version: 'v1.0.5',
    features: ['BIOS Flasher', 'HWID Spoof', 'Mac Changer', 'Registry Cleaner', 'Kernel Hide', 'Safe Load', 'Instant Process', 'Anti-Leak Protect'],
    pricing: [
      { id: '1day', label: '1 Day', usd: 5, inr: 400 },
      { id: '1week', label: '1 Week', usd: 10, inr: 850 },
      { id: '1month', label: '1 Month', usd: 20, inr: 1799 },
      { id: '1year', label: '1 Year', usd: 60, inr: 5200 },
      { id: 'lifetime', label: 'Lifetime', usd: 85, inr: 7500 },
    ],
    icon: Server,
  },
  {
    id: 6,
    name: 'STREAMER BASIC',
    slug: 'streamer-basic',
    description: 'Lag-free stream protection protocols with dynamic video controller hooking.',
    isPremium: false,
    compatibility: 'Windows 10 / 11',
    version: 'v1.3.1',
    features: ['Stream Protect', 'No Frame Drop', 'OBS Hook', 'Discord Hook', 'Dynamic Control', 'Lag Free', 'Hotkeys Active'],
    pricing: [
      { id: '1day', label: '1 Day', usd: 2, inr: 180 },
      { id: '1week', label: '1 Week', usd: 5, inr: 400 },
      { id: '1month', label: '1 Month', usd: 10, inr: 899 },
      { id: '1year', label: '1 Year', usd: 30, inr: 2800 },
      { id: 'lifetime', label: 'Lifetime', usd: 45, inr: 4000 },
    ],
    icon: Radio,
  },
  {
    id: 7,
    name: 'STREAMER PRO',
    slug: 'streamer-pro',
    description: 'Ultra-premium stream bypassing for heavy software overlays and recording suites.',
    isPremium: true,
    compatibility: 'Windows 10 / 11',
    version: 'v2.0.2',
    features: ['Direct OBS Bypass', 'Discord Stream Hide', 'Kernel Overlay Masking', 'HW Acceleration', 'Lag-Free Protect', 'Custom Overlay Stream', 'Bypass Twitch Hook'],
    pricing: [
      { id: '1day', label: '1 Day', usd: 3, inr: 250 },
      { id: '1week', label: '1 Week', usd: 7, inr: 600 },
      { id: '1month', label: '1 Month', usd: 12, inr: 1099 },
      { id: '1year', label: '1 Year', usd: 40, inr: 3600 },
      { id: 'lifetime', label: 'Lifetime', usd: 55, inr: 5000 },
    ],
    icon: Film,
  },
  {
    id: 8,
    name: 'BYPASS SUPREME',
    slug: 'bypass-supreme',
    description: 'Universal bypass emulator logic with anti-ban protection overlays.',
    isPremium: true,
    compatibility: 'Windows 10 / 11 (All Anti-Cheats)',
    version: 'v1.0.1',
    features: ['Universal Bypass', 'Emulator Signature Hide', 'Anti-Ban Shields', 'Memory Encryption', 'Virtual Machine Detect', 'Log Cleaner', 'Silent Injection', 'Safe Active'],
    pricing: [
      { id: '1day', label: '1 Day', usd: 2, inr: 170 },
      { id: '1week', label: '1 Week', usd: 4, inr: 350 },
      { id: '1month', label: '1 Month', usd: 7, inr: 650 },
      { id: '1year', label: '1 Year', usd: 22, inr: 1999 },
      { id: 'lifetime', label: 'Lifetime', usd: 32, inr: 2900 },
    ],
    icon: Shield,
  },
];

/* ===== Product Card Component ===== */
const ProductCard = ({ product, idx, currency, navigate }) => {
  const [selectedPlan, setSelectedPlan] = useState(2); // default 1 Month
  const plan = product.pricing[selectedPlan];
  const price = currency === 'INR' ? plan.inr : plan.usd;
  const symbol = currency === 'INR' ? '₹' : '$';
  const IconComponent = product.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 60, scale: 0.92 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, delay: idx * 0.08, type: 'spring', stiffness: 90, damping: 18 }}
      viewport={{ once: true, amount: 0.15 }}
      className="h-full"
    >
      <div className={`relative glass-card rounded-2xl p-6 h-full flex flex-col group cursor-default hover:-translate-y-2 transition-all duration-500 overflow-hidden ${product.isPremium ? 'hover:border-[#AEB6C2]/20 hover:shadow-lg hover:shadow-[#AEB6C2]/5' : 'hover:border-[#858E9A]/15'}`}>
        {/* Premium badge */}
        {product.isPremium && (
          <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border bg-[#AEB6C2]/10 text-[#D9DEE5] border-[#AEB6C2]/20">
            ★ Premium
          </div>
        )}

        {/* Gradient orb background */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-[#AEB6C2]/10 to-[#858E9A]/5 rounded-full blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

        {/* Header */}
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-[#AEB6C2]/8 border border-[#AEB6C2]/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <IconComponent size={22} className="text-[#AEB6C2]" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white font-space-grotesk group-hover:text-[#F5F7FA] transition-colors duration-300">
                {product.name}
              </h3>
              <span className="text-[10px] text-[#858E9A]/60 uppercase tracking-wider font-medium">{product.compatibility} • {product.version}</span>
            </div>
          </div>
          <p className="text-sm text-[#858E9A] leading-relaxed mb-5">{product.description}</p>
        </div>

        {/* Features */}
        <div className="relative z-10 flex-grow">
          <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 mb-5">
            {product.features.slice(0, 8).map((feat, i) => (
              <div key={i} className="flex items-center text-[11px]">
                <svg className="w-3 h-3 mr-1.5 flex-shrink-0 text-[#AEB6C2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-[#858E9A] group-hover:text-[#AEB6C2] transition-colors truncate">{feat}</span>
              </div>
            ))}
            {product.features.length > 8 && (
              <span className="text-[11px] text-[#AEB6C2] font-medium">+{product.features.length - 8} more</span>
            )}
          </div>
        </div>

        {/* Pricing */}
        <div className="relative z-10 mt-auto">
          <div className="pt-4 border-t border-[#AEB6C2]/[0.06]">
            {/* Duration selector */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {product.pricing.map((p, i) => (
                <button
                  key={p.id}
                  onClick={() => setSelectedPlan(i)}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all duration-200 border ${
                    selectedPlan === i
                      ? 'bg-[#AEB6C2]/15 text-[#F5F7FA] border-[#AEB6C2]/25'
                      : 'bg-white/[0.02] text-[#858E9A]/60 border-[#AEB6C2]/[0.06] hover:border-[#AEB6C2]/15 hover:text-[#AEB6C2]'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>

            {/* Price display */}
            <div className="flex items-end justify-between mb-4">
              <div>
                <span className="text-3xl font-black text-[#F5F7FA] font-space-grotesk">{symbol}{price}</span>
                <span className="text-xs text-[#858E9A]/60 ml-1.5">/ {plan.label}</span>
              </div>
            </div>

            {/* Buy button */}
            <button
              onClick={() => navigate('/login')}
              className={`w-full py-3 rounded-xl text-sm font-bold tracking-wider transition-all duration-300 border ${
                product.isPremium
                  ? 'bg-gradient-to-r from-[#D9DEE5] via-[#F5F7FA] to-[#D9DEE5] text-[#050608] border-white/20 shadow-[0_0_15px_rgba(174,182,194,0.15)] hover:shadow-[0_0_25px_rgba(174,182,194,0.3)] hover:scale-[1.02]'
                  : 'bg-white/[0.04] text-[#D9DEE5] border-[#AEB6C2]/[0.1] hover:bg-white/[0.08] hover:border-[#AEB6C2]/20 hover:shadow-[0_0_15px_rgba(174,182,194,0.06)]'
              }`}
            >
              {product.isPremium ? '⚡ GET PREMIUM' : 'GET STARTED'}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const SERVICES = [
  {
    icon: Monitor,
    title: 'Software Development',
    desc: 'Custom enterprise software solutions built with cutting-edge technologies to solve complex business challenges.',
    features: ['Scalable Architecture', 'Agile Development', 'Quality Assurance', 'Continuous Support'],
  },
  {
    icon: Globe,
    title: 'Web Development',
    desc: 'High-performance, responsive web applications using React, Next.js, and modern frameworks.',
    features: ['Responsive Design', 'SEO Optimized', 'Fast Loading', 'Cross-Browser'],
  },
  {
    icon: Cpu,
    title: 'AI Solutions',
    desc: 'Intelligent automation and machine learning solutions that transform data into actionable insights.',
    features: ['Machine Learning', 'NLP Processing', 'Computer Vision', 'Predictive Analytics'],
  },
  {
    icon: Zap,
    title: 'Automation',
    desc: 'Streamline workflows and eliminate manual processes with intelligent automation systems.',
    features: ['Workflow Automation', 'CI/CD Pipelines', 'Process Optimization', 'Bot Development'],
  },
  {
    icon: Cloud,
    title: 'Cloud Solutions',
    desc: 'Scalable cloud infrastructure on AWS, Azure, and GCP with 99.99% uptime guarantee.',
    features: ['Cloud Migration', 'DevOps', 'Kubernetes', 'Auto Scaling'],
  },
  {
    icon: Link2,
    title: 'API Development',
    desc: 'Robust, secure, and well-documented RESTful & GraphQL APIs for seamless integration.',
    features: ['REST & GraphQL', 'Authentication', 'Rate Limiting', 'Documentation'],
  },
  {
    icon: Palette,
    title: 'UI/UX Design',
    desc: 'Beautiful, intuitive interfaces designed with a focus on user experience and conversion.',
    features: ['User Research', 'Wireframing', 'Prototyping', 'Design Systems'],
  },
  {
    icon: Smartphone,
    title: 'Digital Products',
    desc: 'End-to-end digital product development from ideation to launch and beyond.',
    features: ['Product Strategy', 'MVP Development', 'Market Fit', 'Growth Hacking'],
  },
];

const STATS = [
  { value: '150+', label: 'Projects Delivered' },
  { value: '98%', label: 'Client Satisfaction' },
  { value: '50+', label: 'Active Clients' },
  { value: '24/7', label: 'Support Available' },
];

const TESTIMONIALS = [
  { name: 'Rajesh Kumar', role: 'CTO, TechStart India', rating: 5, text: 'Elenx transformed our legacy system into a modern cloud-native application. Their team delivered on time and exceeded our expectations. Highly recommended for enterprise projects.', avatar: 'RK' },
  { name: 'Sarah Mitchell', role: 'Product Manager, GlobalTech', rating: 5, text: 'The AI solution Elenx built for us reduced our data processing time by 80%. Their expertise in machine learning and automation is truly world-class.', avatar: 'SM' },
  { name: 'Amit Patel', role: 'Founder, FinFlow', rating: 5, text: 'Working with Elenx on our fintech platform was an exceptional experience. Their attention to security, performance, and user experience was outstanding.', avatar: 'AP' },
  { name: 'Priya Sharma', role: 'CEO, HealthBridge', rating: 5, text: 'The web application Elenx developed for our healthcare startup is robust, scalable, and beautifully designed. They understood our vision perfectly.', avatar: 'PS' },
  { name: 'David Chen', role: 'Director, CloudNine Solutions', rating: 5, text: 'Elenx helped us migrate our entire infrastructure to AWS. The transition was seamless with zero downtime. Their DevOps expertise is top-notch.', avatar: 'DC' },
  { name: 'Neha Gupta', role: 'VP Engineering, DataSync', rating: 5, text: 'The API architecture designed by Elenx handles millions of requests daily without any issues. Their technical depth and professionalism are remarkable.', avatar: 'NG' },
];

const PROCESS_STEPS = [
  { step: '01', title: 'Discovery', desc: 'We analyze your requirements, business goals, and technical landscape to craft the perfect solution.' },
  { step: '02', title: 'Design', desc: 'Our designers create intuitive wireframes and prototypes, ensuring the best user experience.' },
  { step: '03', title: 'Development', desc: 'Our engineers build your solution using modern technologies with agile methodology.' },
  { step: '04', title: 'Delivery', desc: 'We deploy, test, and optimize your solution with ongoing support and maintenance.' },
];

/* ===== MAIN LANDING PAGE ===== */
const LandingPage = () => {
  const navigate = useNavigate();
  const [userToken, setUserToken] = useState(() => {
    const token = localStorage.getItem('client_token');
    return token && token !== 'null' && token !== 'undefined' ? token : null;
  });

  const handleLogout = () => {
    localStorage.removeItem('client_token');
    localStorage.removeItem('role');
    setUserToken(null);
  };

  const [currency, setCurrency] = useState('INR');

  return (
    <div className="min-h-screen overflow-hidden relative font-inter selection:bg-[#AEB6C2]/20 selection:text-white bg-[#050608]">
      {/* Ambient orbs */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[#AEB6C2]/[0.03] rounded-full blur-[150px] pointer-events-none -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#858E9A]/[0.03] rounded-full blur-[150px] pointer-events-none translate-x-1/2 translate-y-1/2" />

      {/* MagicRings — fixed full-page background */}
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0, width: '100vw', height: '100vh' }}>
        <MagicRings
          color="#AEB6C2"
          colorTwo="#858E9A"
          ringCount={6}
          speed={1}
          attenuation={10}
          lineThickness={2}
          baseRadius={0.35}
          radiusStep={0.1}
          scaleRate={0.1}
          opacity={0.4}
          blur={0}
          noiseAmount={0.1}
          rotation={0}
          ringGap={1.5}
          fadeIn={0.7}
          fadeOut={0.5}
          followMouse={false}
          mouseInfluence={0.2}
          hoverScale={1.2}
          parallax={0.05}
          clickBurst={false}
        />
      </div>
      
      <Navbar userToken={userToken} onLogout={handleLogout} />

      {/* ===== HERO ===== */}
      <section id="home" className="relative z-10 pt-32 pb-20 lg:pt-48 lg:pb-32 px-4 flex flex-col items-center justify-center min-h-[90vh]">
        <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
          <div className="absolute top-1/2 left-1/2 w-[80vw] h-[80vw] max-w-[900px] max-h-[900px] bg-[radial-gradient(circle,rgba(174,182,194,0.05)_0%,rgba(0,0,0,0)_70%)] transform -translate-x-1/2 -translate-y-1/2 animate-glow-pulse" />
          <div className="absolute inset-0 bg-grid-pattern [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_10%,transparent_100%)]" />
        </div>

        {/* Floating geometric shapes */}
        <div className="absolute top-32 left-[10%] w-20 h-20 border border-[#AEB6C2]/[0.08] rounded-lg rotate-45 animate-float pointer-events-none hidden lg:block" />
        <div className="absolute top-52 right-[12%] w-16 h-16 border border-[#858E9A]/[0.08] rounded-full animate-float-reverse pointer-events-none hidden lg:block" />

        <div className="max-w-7xl mx-auto text-center w-full z-10 relative">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="absolute top-0 left-[15%] hidden lg:flex items-center gap-2 bg-white/[0.03] backdrop-blur-md border border-[#AEB6C2]/10 px-4 py-2 rounded-full"
          >
            <span className="w-2 h-2 rounded-full bg-[#AEB6C2] animate-pulse" />
            <span className="text-xs font-bold text-[#AEB6C2] tracking-wider">IT SERVICES</span>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="absolute top-10 right-[15%] hidden lg:flex items-center gap-2 bg-white/[0.03] backdrop-blur-md border border-[#AEB6C2]/10 px-4 py-2 rounded-full"
          >
            <span className="w-2 h-2 rounded-full bg-[#D9DEE5] animate-pulse" style={{ animationDelay: '1s' }} />
            <span className="text-xs font-bold text-[#D9DEE5] tracking-wider">DIGITAL INNOVATION</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center mt-12"
          >
            <div className="inline-flex items-center gap-2 bg-white/[0.03] border border-[#AEB6C2]/[0.08] rounded-full px-5 py-2 mb-8">
              <div className="w-1.5 h-1.5 rounded-full bg-[#AEB6C2] animate-pulse" />
              <span className="text-[11px] font-bold text-[#858E9A] uppercase tracking-widest">Premium IT Solutions</span>
            </div>

            <h1 className="text-6xl md:text-[100px] lg:text-[120px] leading-[0.85] font-black tracking-tighter mb-6 font-space-grotesk uppercase">
              <span className="text-gradient-metal">ELENX</span>
            </h1>
            
            <p className="mt-8 max-w-3xl mx-auto text-[17px] font-medium text-[#858E9A] leading-relaxed">
              We build exceptional software, design stunning interfaces, and deliver<br className="hidden md:block" />
              cutting-edge AI & cloud solutions that transform businesses.
            </p>
            
            <div className="mt-14 flex flex-col sm:flex-row justify-center gap-5 w-full sm:w-auto">
              <a href="#services" onClick={(e) => { e.preventDefault(); document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' }); }} className="relative group px-10 py-4 bg-gradient-to-r from-[#D9DEE5] via-[#F5F7FA] to-[#D9DEE5] text-[#050608] text-sm font-bold rounded-full shadow-[0_0_20px_rgba(174,182,194,0.2)] hover:shadow-[0_0_35px_rgba(174,182,194,0.4)] transition-all duration-300 border border-white/20 overflow-hidden hover:scale-105 cursor-pointer">
                <span className="relative z-10 flex items-center justify-center gap-2 tracking-wider">
                  OUR SERVICES <span className="text-lg leading-none group-hover:translate-x-1 transition-transform">→</span>
                </span>
              </a>
              
              <Link to="/contact" className="px-10 py-4 bg-white/[0.03] backdrop-blur-xl border border-[#AEB6C2]/[0.1] hover:border-[#AEB6C2]/25 text-[#AEB6C2] hover:text-[#F5F7FA] text-sm font-bold rounded-full transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.5)] hover:shadow-[0_0_20px_rgba(174,182,194,0.08)] tracking-wider text-center">
                GET IN TOUCH
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== STATS ===== */}
      <section className="relative z-10 py-16 border-t border-[#AEB6C2]/[0.04]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <span className="text-4xl md:text-5xl font-black text-gradient-metal font-space-grotesk">{stat.value}</span>
                <span className="block text-xs text-[#858E9A]/60 uppercase tracking-wider mt-2 font-medium">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== ABOUT / WHY CHOOSE US ===== */}
      <section id="about" className="relative z-10 py-28 overflow-hidden border-t border-[#AEB6C2]/[0.04]">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-[#AEB6C2]/[0.02] rounded-full blur-[120px]" />
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
              whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true, amount: 0.5 }}
              className="inline-flex items-center gap-2 bg-white/[0.03] border border-[#AEB6C2]/[0.08] rounded-full px-5 py-2 mb-6"
            >
              <span className="text-[11px] font-bold text-[#858E9A] uppercase tracking-widest">Why Choose Elenx</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 40, scale: 0.85, filter: 'blur(8px)' }}
              whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true, amount: 0.5 }}
              className="text-4xl md:text-6xl font-bold text-white font-space-grotesk tracking-tight"
            >
              Built for <span className="text-gradient-metal">Excellence</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30, filter: 'blur(5px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true, amount: 0.5 }}
              className="mt-6 text-lg text-[#858E9A] max-w-2xl mx-auto"
            >
              We combine technical expertise with creative innovation to deliver solutions that drive real business results.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { 
                icon: (
                  <svg className="w-7 h-7 text-[#AEB6C2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                ),
                title: 'Rapid Delivery', 
                desc: 'Agile development methodology ensures fast delivery without compromising quality.', 
                stat: '2x', 
                statLabel: 'Faster Delivery' 
              },
              { 
                icon: (
                  <svg className="w-7 h-7 text-[#AEB6C2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                ),
                title: 'Enterprise Security', 
                desc: 'Bank-grade security practices, SSL encryption, and compliance-ready architecture.', 
                stat: '100%', 
                statLabel: 'Secure Solutions' 
              },
              { 
                icon: (
                  <svg className="w-7 h-7 text-[#AEB6C2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                title: 'Global Reach', 
                desc: 'Serving clients worldwide with 24/7 support and multi-timezone availability.', 
                stat: '50+', 
                statLabel: 'Happy Clients' 
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40, filter: 'blur(6px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.8, delay: idx * 0.15, type: 'spring', stiffness: 80, damping: 20 }}
                viewport={{ once: true, amount: 0.3 }}
                className="glass-card rounded-2xl p-8 group"
              >
                <div className="w-12 h-12 rounded-xl bg-[#AEB6C2]/[0.06] border border-[#AEB6C2]/[0.08] flex items-center justify-center mb-5 group-hover:border-[#AEB6C2]/20 transition-colors">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3 font-space-grotesk">{item.title}</h3>
                <p className="text-[#858E9A] text-sm leading-relaxed mb-6">{item.desc}</p>
                <div className="pt-5 border-t border-[#AEB6C2]/[0.06]">
                  <span className="text-3xl font-bold text-gradient-metal font-space-grotesk">{item.stat}</span>
                  <span className="block text-[11px] text-[#858E9A]/60 uppercase tracking-wider mt-1 font-medium">{item.statLabel}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SERVICES SECTION ===== */}
      <section id="services" className="relative z-10 py-28 overflow-hidden border-t border-[#AEB6C2]/[0.04]">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-[#AEB6C2]/[0.02] rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#858E9A]/[0.02] rounded-full blur-[120px]" />
        </div>
        {/* LightRays background for Services */}
        <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }}>
          <LightRays
            raysOrigin="top-left"
            raysColor="#AEB6C2"
            raysSpeed={1}
            lightSpread={0.7}
            rayLength={1.2}
            followMouse={false}
            noiseAmount={0.05}
            distortion={0.03}
          />
        </div>

        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
              whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true, amount: 0.5 }}
              className="inline-flex items-center gap-2 bg-white/[0.03] border border-[#AEB6C2]/[0.08] rounded-full px-5 py-2 mb-6"
            >
              <span className="text-[11px] font-bold text-[#858E9A] uppercase tracking-widest">Our Services</span>
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 50, scale: 0.85, filter: 'blur(8px)' }}
              whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true, amount: 0.5 }}
              className="text-4xl md:text-6xl font-bold text-white font-space-grotesk tracking-tight"
            >
              What We <span className="text-gradient-metal">Offer</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 30, filter: 'blur(5px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true, amount: 0.5 }}
              className="mt-6 text-lg text-[#858E9A]"
            >
              Comprehensive IT solutions tailored to accelerate your digital transformation.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {SERVICES.map((service, idx) => {
              const ServiceIcon = service.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 60, scale: 0.9, filter: 'blur(4px)' }}
                  whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                  transition={{ duration: 0.7, delay: idx * 0.08, type: 'spring', stiffness: 100, damping: 18 }}
                  viewport={{ once: true, amount: 0.15 }}
                  className="h-full"
                >
                  <div className="glass-card rounded-2xl p-6 h-full flex flex-col group cursor-default hover:-translate-y-2 transition-all duration-500">
                    <div className="w-12 h-12 rounded-xl bg-[#AEB6C2]/[0.06] border border-[#AEB6C2]/[0.08] flex items-center justify-center mb-4 group-hover:border-[#AEB6C2]/20 group-hover:bg-[#AEB6C2]/10 transition-all duration-300">
                      <ServiceIcon size={22} className="text-[#AEB6C2]" />
                    </div>
                    <h3 className="text-lg font-bold text-white font-space-grotesk mb-2 group-hover:text-[#F5F7FA] transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-sm text-[#858E9A] leading-relaxed mb-5 flex-grow">{service.desc}</p>
                    <ul className="space-y-2 pt-4 border-t border-[#AEB6C2]/[0.06]">
                      {service.features.map((feat, i) => (
                        <li key={i} className="flex items-center text-[12px]">
                          <svg className="w-3.5 h-3.5 mr-2 flex-shrink-0 text-[#AEB6C2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-[#858E9A] group-hover:text-[#AEB6C2] transition-colors">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== PRODUCTS SECTION ===== */}
      <section id="products" className="relative z-10 py-28 overflow-hidden border-t border-[#AEB6C2]/[0.04]">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/3 left-1/3 w-[500px] h-[500px] bg-[#AEB6C2]/[0.02] rounded-full blur-[140px]" />
          <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-[#858E9A]/[0.02] rounded-full blur-[120px]" />
        </div>
        {/* LightRays background for Products */}
        <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }}>
          <LightRays
            raysOrigin="top-right"
            raysColor="#858E9A"
            raysSpeed={0.8}
            lightSpread={0.5}
            rayLength={1.3}
            followMouse={false}
            noiseAmount={0.04}
            distortion={0.02}
          />
        </div>

        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
              whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true, amount: 0.5 }}
              className="inline-flex items-center gap-2 bg-white/[0.03] border border-[#AEB6C2]/[0.08] rounded-full px-5 py-2 mb-6"
            >
              <span className="text-[11px] font-bold text-[#858E9A] uppercase tracking-widest">Our Products</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 50, scale: 0.85, filter: 'blur(8px)' }}
              whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true, amount: 0.5 }}
              className="text-4xl md:text-6xl font-bold text-white font-space-grotesk tracking-tight"
            >
              Premium <span className="text-gradient-metal">Solutions</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30, filter: 'blur(5px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true, amount: 0.5 }}
              className="mt-6 text-lg text-[#858E9A] max-w-2xl mx-auto"
            >
              Choose from our professional-grade software solutions with flexible pricing.
            </motion.p>

            {/* Currency Toggle */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              viewport={{ once: true }}
              className="mt-8 inline-flex items-center bg-[#101318]/60 border border-[#AEB6C2]/[0.08] rounded-full p-1 gap-1"
            >
              <button
                onClick={() => setCurrency('INR')}
                className={`px-5 py-2 rounded-full text-xs font-bold tracking-wider transition-all duration-300 ${
                  currency === 'INR'
                    ? 'bg-gradient-to-r from-[#AEB6C2]/20 to-[#858E9A]/15 text-[#F5F7FA] shadow-[0_0_12px_rgba(174,182,194,0.12)] border border-[#AEB6C2]/15'
                    : 'text-[#858E9A] hover:text-[#AEB6C2] border border-transparent'
                }`}
              >
                ₹ INR
              </button>
              <button
                onClick={() => setCurrency('USD')}
                className={`px-5 py-2 rounded-full text-xs font-bold tracking-wider transition-all duration-300 ${
                  currency === 'USD'
                    ? 'bg-gradient-to-r from-[#AEB6C2]/20 to-[#858E9A]/15 text-[#F5F7FA] shadow-[0_0_12px_rgba(174,182,194,0.12)] border border-[#AEB6C2]/15'
                    : 'text-[#858E9A] hover:text-[#AEB6C2] border border-transparent'
                }`}
              >
                $ USD
              </button>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {PRODUCTS.map((product, idx) => (
              <ProductCard key={product.id} product={product} idx={idx} currency={currency} navigate={navigate} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== PROCESS ===== */}
      <section className="relative z-10 py-28 overflow-hidden border-t border-[#AEB6C2]/[0.04]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
              whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, amount: 0.5 }}
              className="inline-flex items-center gap-2 bg-white/[0.03] border border-[#AEB6C2]/[0.08] rounded-full px-5 py-2 mb-6"
            >
              <span className="text-[11px] font-bold text-[#858E9A] uppercase tracking-widest">How We Work</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true, amount: 0.5 }}
              className="text-4xl md:text-6xl font-bold text-white font-space-grotesk tracking-tight"
            >
              Our <span className="text-gradient-metal">Process</span>
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PROCESS_STEPS.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.12 }}
                viewport={{ once: true }}
                className="glass-card rounded-2xl p-6 group text-center relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#AEB6C2]/[0.03] rounded-full blur-[40px] pointer-events-none group-hover:bg-[#AEB6C2]/[0.06] transition-all" />
                <span className="text-5xl font-black font-space-grotesk text-[#AEB6C2]/[0.06] group-hover:text-[#AEB6C2]/15 transition-colors block mb-4">{step.step}</span>
                <h3 className="text-xl font-bold text-white font-space-grotesk mb-3 group-hover:text-[#F5F7FA] transition-colors">{step.title}</h3>
                <p className="text-sm text-[#858E9A] leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section id="reviews" className="relative z-10 py-28 overflow-hidden border-t border-[#AEB6C2]/[0.04]">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute bottom-1/3 left-1/3 w-[500px] h-[500px] bg-[#AEB6C2]/[0.02] rounded-full blur-[120px]" />
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
              whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, amount: 0.5 }}
              className="inline-flex items-center gap-2 bg-white/[0.03] border border-[#AEB6C2]/[0.08] rounded-full px-5 py-2 mb-6"
            >
              <span className="text-[11px] font-bold text-[#858E9A] uppercase tracking-widest">Client Testimonials</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true, amount: 0.5 }}
              className="text-4xl md:text-6xl font-bold text-white font-space-grotesk tracking-tight"
            >
              Trusted by <span className="text-gradient-metal">Industry Leaders</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              viewport={{ once: true, amount: 0.5 }}
              className="mt-6 text-lg text-[#858E9A]"
            >
              Real feedback from businesses we've helped transform.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((review, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true, amount: 0.2 }}
                className="glass-card rounded-2xl p-6 group relative"
              >
                <div className="absolute left-0 top-6 bottom-6 w-[2px] bg-gradient-to-b from-[#AEB6C2]/30 via-[#858E9A]/15 to-transparent rounded-full" />
                
                <div className="pl-4">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#AEB6C2]/15 to-[#858E9A]/10 border border-[#AEB6C2]/[0.1] flex items-center justify-center text-xs font-bold text-[#D9DEE5]">
                      {review.avatar}
                    </div>
                    <div>
                      <span className="text-sm font-bold text-white block">{review.name}</span>
                      <span className="text-[10px] text-[#AEB6C2] uppercase tracking-wider font-semibold">{review.role}</span>
                    </div>
                  </div>
                  <div className="flex gap-0.5 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className={`w-3.5 h-3.5 ${i < review.rating ? 'text-[#D9DEE5]' : 'text-zinc-800'}`} fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-[#858E9A] text-sm leading-relaxed italic">"{review.text}"</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="relative z-10 py-28 border-t border-[#AEB6C2]/[0.04]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="glass-card rounded-3xl p-12 md:p-16 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#AEB6C2]/[0.03] to-[#858E9A]/[0.02] pointer-events-none" />
            <div className="absolute top-0 right-0 w-60 h-60 bg-[#AEB6C2]/[0.05] rounded-full blur-[80px] pointer-events-none" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-bold text-white font-space-grotesk mb-6 tracking-tight">
                Ready to Build Something<br /><span className="text-gradient-metal">Amazing?</span>
              </h2>
              <p className="text-[#858E9A] mb-10 max-w-xl mx-auto text-lg">
                Let's discuss your project and discover how Elenx can transform your business with technology.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-gradient-to-r from-[#D9DEE5] via-[#F5F7FA] to-[#D9DEE5] text-[#050608] font-bold rounded-full shadow-[0_0_20px_rgba(174,182,194,0.2)] hover:shadow-[0_0_30px_rgba(174,182,194,0.35)] transition-all text-sm tracking-wider hover:scale-105"
                >
                  START YOUR PROJECT
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link
                  to="/about"
                  className="inline-flex items-center justify-center px-10 py-4 bg-white/[0.04] border border-[#AEB6C2]/[0.1] hover:border-[#AEB6C2]/25 text-[#AEB6C2] hover:text-[#F5F7FA] font-bold rounded-full transition-all text-sm tracking-wider"
                >
                  LEARN MORE
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LandingPage;
