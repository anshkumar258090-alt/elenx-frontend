import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ParticleBackground from '../components/ParticleBackground';
import Navbar from '../components/Navbar';
import PerformanceSection from '../components/PerformanceSection';
import { Link, useNavigate } from 'react-router-dom';

const PAYMENT_METHODS = [
  { id: 'upi', label: 'UPI' },
  { id: 'crypto', label: 'Crypto' },
  { id: 'paytm', label: 'Paytm' },
  { id: 'phonepe', label: 'PhonePe' },
  { id: 'card', label: 'Card' },
  { id: 'netbanking', label: 'Net Banking' }
];

const VALID_COUPONS = {
  'ELENX10': 0.10,
  'DOMINATE20': 0.20
};

const PRODUCTS = [
  {
    id: 1,
    name: 'EXTERNAL BASIC',
    description: 'Essential external tactical advantage.',
    status: 'UNDETECTED',
    isPremium: false,
    version: 'v1.1.2',
    image: '/uploads/cyber_product.png',
    compatibility: 'Windows 10 / 11 (All Versions)',
    delivery: 'Instant Delivery',
    features: ['Aimbot Head', 'Aimbot Drag', 'Sniper Scope', 'Sniper Switch', 'Location', 'Streamer Mode', 'No Blacklist', 'Fully Safe', 'All Server'],
    pricing: [
      { id: '1day', label: '1 Day', usd: 1, inr: 95 },
      { id: '1week', label: '1 Week', usd: 3, inr: 250 },
      { id: '1month', label: '1 Month', usd: 6, inr: 499 },
      { id: '1year', label: '1 Year', usd: 20, inr: 1900 },
      { id: 'lifetime', label: 'Lifetime', usd: 30, inr: 2800 }
    ]
  },
  {
    id: 2,
    name: 'EXTERNAL PREMIUM',
    description: 'Advanced external suite with full vision.',
    status: 'UNDETECTED',
    isPremium: true,
    version: 'v2.4.1',
    image: '/uploads/cyber_product.png',
    compatibility: 'Windows 10 / 11 (All Versions)',
    delivery: 'Instant Delivery',
    features: ['Aimbot Head', 'Aimbot Drag', 'Aimbot AI', 'Sniper Scope', 'Sniper Switch', 'Location', 'Wall Hack', 'Speed Hack', 'Camera Hack', 'Vision Hack', 'Guest Reset', 'Streamer Mode', 'No Blacklist', 'Fully Safe', 'All Server'],
    pricing: [
      { id: '1day', label: '1 Day', usd: 1, inr: 95 },
      { id: '1week', label: '1 Week', usd: 3, inr: 300 },
      { id: '1month', label: '1 Month', usd: 8, inr: 749 },
      { id: '1year', label: '1 Year', usd: 25, inr: 2300 },
      { id: 'lifetime', label: 'Lifetime', usd: 30, inr: 3000 }
    ]
  },
  {
    id: 3,
    name: 'INTERNAL BASIC',
    description: 'Core internal hooks for pure performance.',
    status: 'UNDETECTED',
    isPremium: false,
    version: 'v1.2.0',
    image: '/uploads/cyber_product.png',
    compatibility: 'Windows 10 (20H2 - 22H2)',
    delivery: 'Instant Delivery',
    features: ['Aimbot Head', 'Visible Drag', 'Silent Aim', 'No Recoil', 'Ignore Knocked', 'ESP Line', 'ESP Bone', 'ESP Name', 'ESP Health', 'ESP Weapon Name', 'ESP Box', 'ESP Weapon', 'ESP Level', 'ESP Color', 'ESP FOV', 'No Blacklist', 'Fully Safe', 'All Server'],
    pricing: [
      { id: '1day', label: '1 Day', usd: 1, inr: 95 },
      { id: '1week', label: '1 Week', usd: 3, inr: 250 },
      { id: '1month', label: '1 Month', usd: 6, inr: 499 },
      { id: '1year', label: '1 Year', usd: 25, inr: 2300 },
      { id: 'lifetime', label: 'Lifetime', usd: 30, inr: 2800 }
    ]
  },
  {
    id: 4,
    name: 'INTERNAL PRO',
    description: 'The ultimate internal domination toolkit.',
    status: 'UNDETECTED',
    isPremium: true,
    version: 'v3.1.0',
    image: '/uploads/cyber_product.png',
    compatibility: 'Windows 10 / 11 (All Versions)',
    delivery: 'Manual Setup',
    features: ['Aimbot Head', 'Visible Drag', 'Silent Aim', 'Silent Aim 360', 'Aimbot Head 360', 'Enemy Pull', 'Enemy Pull 360', 'No Recoil', 'Ignore Knocked', 'Enable FOV', 'Wall Hack', 'Speed Hack', 'Rapid Fire', 'Fast Reload', 'Unlimited Ammo', 'Mark Teleport', 'Spin Bot', 'ESP Features', 'Streamer Mode', 'Theme Change', 'No Blacklist', 'Fully Safe', 'All Server'],
    pricing: [
      { id: '1day', label: '1 Day', usd: 1, inr: 95 },
      { id: '1week', label: '1 Week', usd: 3, inr: 300 },
      { id: '1month', label: '1 Month', usd: 9, inr: 800 },
      { id: '1year', label: '1 Year', usd: 27, inr: 2500 },
      { id: 'lifetime', label: 'Lifetime', usd: 37, inr: 2800 }
    ]
  },
  {
    id: 5,
    name: 'BIOS STREMER',
    description: 'Hardware-level stealth for creators.',
    status: 'UNDETECTED',
    isPremium: false,
    version: 'v1.0.5',
    image: '/uploads/cyber_product.png',
    compatibility: 'Custom BIOS Flash',
    delivery: '24h Delivery',
    features: ['Aimbot Head', 'Instant On/Off', 'No FPS Drop', 'No CPU Usage', 'No Lag Issue', 'Fully Hidden', 'No Blacklist', 'Fully Safe', 'All Server'],
    pricing: [
      { id: '1month', label: '1 Month', usd: 10, inr: 950 },
      { id: '1year', label: '1 Year', usd: 27, inr: 2500 },
      { id: 'lifetime', label: 'Lifetime', usd: 45, inr: 4000 }
    ]
  },
  {
    id: 6,
    name: 'STREMER BASIC',
    description: 'Remote-controlled streaming essentials.',
    status: 'UNDETECTED',
    isPremium: false,
    version: 'v1.3.1',
    image: '/uploads/cyber_product.png',
    compatibility: 'Requires Secondary Phone',
    delivery: 'Instant Delivery',
    features: ['Phone Controllable', 'Aimbot Head', 'Aimbot Drag', 'Instant On/Off', 'No FPS Drop', 'No CPU Usage', 'No Lag Issue', 'No Blacklist', 'Fully Safe', 'All Server'],
    pricing: [
      { id: '1month', label: '1 Month', usd: 8, inr: 749 },
      { id: '1year', label: '1 Year', usd: 25, inr: 2500 },
      { id: 'lifetime', label: 'Lifetime', usd: 37, inr: 3500 }
    ]
  },
  {
    id: 7,
    name: 'STREMER PRO',
    description: 'Advanced streaming features with visual hacks.',
    status: 'UNDETECTED',
    isPremium: true,
    version: 'v2.0.2',
    image: '/uploads/cyber_product.png',
    compatibility: 'Windows 10 / 11 (All Versions)',
    delivery: 'Instant Delivery',
    features: ['Aimbot Head', 'Aimbot Drag', 'Sniper Scope', 'Sniper Switch', 'Instant On/Off', 'No FPS Drop', 'No CPU Usage', 'No Lag Issue', 'Wall Hack', 'Speed Hack', 'Camera Hack', 'Fully Hidden', 'No Blacklist', 'Fully Safe', 'All Server'],
    pricing: [
      { id: '1month', label: '1 Month', usd: 14, inr: 1299 },
      { id: '1year', label: '1 Year', usd: 39, inr: 3900 },
      { id: 'lifetime', label: 'Lifetime', usd: 55, inr: 5500 }
    ]
  },
  {
    id: 8,
    name: 'UID BYPASS',
    description: 'Exclusive ban protection layer.',
    status: 'SECURE',
    isPremium: false,
    version: 'v1.0.1',
    image: '/uploads/cyber_product.png',
    compatibility: 'Universal',
    delivery: 'Instant Delivery',
    features: ['No Ban', 'No Blacklist', 'Fully Safe', 'All Server'],
    pricing: [
      { id: '1month', label: '1 Month', usd: 11, inr: 999 },
      { id: '1year', label: '1 Year', usd: 49, inr: 4500 },
      { id: 'lifetime', label: 'Lifetime', usd: 65, inr: 6000 }
    ]
  }
];

/* ===== PRODUCT CARD ===== */
const ProductCard = ({ product, onOpenModal, onBuyNow }) => {
  const [expanded, setExpanded] = useState(false);
  const displayFeatures = expanded ? product.features : product.features.slice(0, 4);
  const startingPriceUsd = product.pricing[0].usd;
  const startingPriceInr = product.pricing[0].inr;

  return (
    <div
      onClick={() => onOpenModal(product)}
      className="relative group rounded-2xl h-full flex flex-col cursor-pointer transition-all duration-500 hover:-translate-y-2"
    >
      {/* Card with glass effect */}
      <div className="relative h-full flex-grow glass-card rounded-2xl p-6 flex flex-col z-10 overflow-hidden">
        {/* Top shimmer on hover */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-amber-400/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        
        {/* Ambient glow for premium */}
        {product.isPremium && (
          <div className="absolute top-0 right-0 w-40 h-40 bg-orange-500/10 rounded-full blur-[60px] animate-glow-pulse pointer-events-none" />
        )}

        {/* Header */}
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="text-lg font-bold text-white font-space-grotesk tracking-wide group-hover:text-amber-300 transition-colors duration-300">{product.name}</h3>
            <p className="text-[11px] text-zinc-500 mt-1 leading-relaxed">{product.description}</p>
          </div>
          {product.isPremium && (
            <span className="px-2.5 py-1 text-[9px] font-black uppercase tracking-widest text-orange-300 bg-orange-500/15 border border-orange-500/25 rounded-full whitespace-nowrap">
              PRO
            </span>
          )}
        </div>

        {/* Status + Version */}
        <div className="mb-5 flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
            </span>
            <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">{product.status}</span>
          </div>
          <span className="text-[10px] text-zinc-600 font-jetbrains">{product.version}</span>
        </div>

        {/* Features List */}
        <div className="flex-grow mb-5">
          <ul className="space-y-1.5">
            {displayFeatures.map((feat, idx) => (
              <li key={idx} className="flex items-center text-[12px]">
                <svg className={`w-3.5 h-3.5 mr-2 flex-shrink-0 ${product.isPremium ? 'text-orange-400' : 'text-amber-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-zinc-400 group-hover:text-zinc-300 transition-colors">{feat}</span>
              </li>
            ))}
          </ul>
          {product.features.length > 4 && (
            <button 
              onClick={(e) => { e.stopPropagation(); setExpanded(!expanded); }} 
              className="mt-3 text-[10px] font-bold text-zinc-600 hover:text-amber-400 transition-colors flex items-center gap-1 uppercase tracking-wider py-1.5 px-3 rounded-lg border border-white/5 hover:border-amber-500/20 w-fit relative z-20"
            >
              {expanded ? 'Show Less' : `+${product.features.length - 4} More`}
              <svg className={`w-2.5 h-2.5 transition-transform ${expanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
            </button>
          )}
        </div>

        {/* Footer */}
        <div className="mt-auto pt-5 border-t border-white/[0.04]">
          <div className="flex justify-between items-end mb-4">
            <span className="text-[10px] font-medium text-zinc-600 uppercase tracking-wider">Starting at</span>
            <div className="text-right">
              <span className="text-2xl font-bold text-white font-space-grotesk">${startingPriceUsd}</span>
              <span className="block text-[10px] text-zinc-500">â‚¹{startingPriceInr}</span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-2.5 relative z-20">
            <button 
              onClick={(e) => { e.stopPropagation(); onOpenModal(product); }}
              className="py-2.5 rounded-xl text-xs font-semibold text-zinc-400 bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] hover:border-white/[0.12] transition-all text-center"
            >
              Configure
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); onBuyNow(product, product.pricing[0]); }}
              className={`relative py-2.5 rounded-xl text-xs font-bold text-white overflow-hidden transition-all text-center ${
                product.isPremium 
                  ? 'bg-orange-600 hover:bg-orange-500 shadow-[0_0_15px_rgba(234,88,12,0.3)] hover:shadow-[0_0_25px_rgba(234,88,12,0.5)]' 
                  : 'bg-amber-600 hover:bg-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.3)] hover:shadow-[0_0_25px_rgba(245,158,11,0.5)]'
              }`}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ===== PRODUCT MODAL ===== */
const ProductModal = ({ product, onClose, onBuyNow }) => {
  const [selectedDuration, setSelectedDuration] = useState(product.pricing[0]);
  const [coupon, setCoupon] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponStatus, setCouponStatus] = useState(null);

  useEffect(() => {
    setSelectedDuration(product.pricing[0]);
    setAppliedCoupon(null);
    setCoupon('');
  }, [product]);

  if (!product) return null;

  const currentPriceUsd = selectedDuration.usd;
  const currentPriceInr = selectedDuration.inr;
  const rewardPoints = Math.floor(currentPriceInr * 0.15);
  
  let discountUsd = 0;
  let discountInr = 0;
  if (appliedCoupon) {
    discountUsd = currentPriceUsd * appliedCoupon.discount;
    discountInr = currentPriceInr * appliedCoupon.discount;
  }
  const finalPriceUsd = currentPriceUsd - discountUsd;
  const finalPriceInr = Math.round(currentPriceInr - discountInr);

  const handleApplyCoupon = () => {
    const code = coupon.toUpperCase();
    if (VALID_COUPONS[code]) {
      setAppliedCoupon({ code, discount: VALID_COUPONS[code] });
      setCouponStatus('success');
    } else {
      setAppliedCoupon(null);
      setCouponStatus('error');
    }
    setTimeout(() => setCouponStatus(null), 2000);
  };

  const handleBuyNowClick = () => {
    onBuyNow(product, {
      ...selectedDuration,
      usd: finalPriceUsd,
      inr: finalPriceInr,
      originalUsd: currentPriceUsd,
      originalInr: currentPriceInr,
      discountUsd,
      discountInr,
      coupon: appliedCoupon
    });
    onClose();
  };

  const accentColor = product.isPremium ? 'violet' : 'cyan';

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 font-inter">
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        exit={{ opacity: 0 }} 
        className="absolute inset-0 bg-black/85 backdrop-blur-lg" 
        onClick={onClose} 
      />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className={`relative w-full max-w-5xl bg-[#0a0a14] border rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row z-10 max-h-[90vh] md:h-[700px] ${
          product.isPremium 
            ? 'border-orange-500/30 shadow-[0_0_50px_rgba(234,88,12,0.15)]' 
            : 'border-amber-500/30 shadow-[0_0_50px_rgba(245,158,11,0.15)]'
        }`}
      >
        <button onClick={onClose} className="absolute top-4 right-4 z-50 p-2 bg-white/5 hover:bg-white/10 rounded-full text-zinc-400 hover:text-white transition-colors border border-white/10">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>

        {/* Left Panel */}
        <div className="w-full md:w-7/12 p-8 md:p-10 border-b md:border-b-0 md:border-r border-white/[0.06] relative overflow-y-auto custom-scrollbar">
          <div className={`absolute top-0 left-0 w-full h-32 ${product.isPremium ? 'bg-orange-600/10' : 'bg-amber-600/10'} blur-[60px] pointer-events-none`} />
          
          <div className="flex items-center gap-3 mb-6 relative z-10 mt-4 md:mt-0">
            {product.isPremium && <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-orange-300 bg-orange-500/15 border border-orange-500/25 rounded-full">Popular Premium</span>}
            <span className="flex items-center gap-2 text-[10px] font-bold text-emerald-400 uppercase tracking-wider bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              {product.status}
            </span>
          </div>

          <h2 className={`text-4xl md:text-5xl font-bold font-space-grotesk tracking-tight mb-4 ${
            product.isPremium 
              ? 'text-transparent bg-clip-text bg-gradient-to-r from-white via-orange-200 to-orange-400' 
              : 'text-transparent bg-clip-text bg-gradient-to-r from-white via-amber-200 to-amber-400'
          }`}>
            {product.name}
          </h2>
          <p className="text-zinc-400 text-lg mb-8 leading-relaxed">{product.description}</p>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="glass-card rounded-xl p-4">
              <span className="block text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1">Compatibility</span>
              <span className="text-sm font-medium text-white">{product.compatibility}</span>
            </div>
            <div className="glass-card rounded-xl p-4">
              <span className="block text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1">Delivery</span>
              <span className="text-sm font-medium text-white">{product.delivery}</span>
            </div>
          </div>

          <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-white/[0.06] pb-2">Features</h4>
          <ul className="space-y-3 pb-8 md:pb-0">
            {product.features.map((feat, idx) => (
              <li key={idx} className="flex items-center text-sm">
                <svg className={`w-4 h-4 mr-3 flex-shrink-0 ${product.isPremium ? 'text-orange-400' : 'text-amber-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-zinc-300 font-medium">{feat}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Panel: Configuration */}
        <div className="w-full md:w-5/12 bg-[#06060a] p-8 md:p-10 flex flex-col justify-between relative overflow-y-auto custom-scrollbar">
          
          <div className="mb-8">
            <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4">Select Duration</h4>
            <div className="grid grid-cols-2 gap-3">
              {product.pricing.map(dur => (
                <button
                  key={dur.id}
                  onClick={() => setSelectedDuration(dur)}
                  className={`py-3 px-2 rounded-xl text-sm font-bold text-center transition-all border relative overflow-hidden group ${
                    selectedDuration.id === dur.id 
                      ? (product.isPremium 
                          ? 'bg-orange-600/15 border-orange-500/50 text-orange-300 shadow-[0_0_15px_rgba(234,88,12,0.2)]' 
                          : 'bg-amber-600/15 border-amber-500/50 text-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.2)]')
                      : 'bg-white/[0.03] border-white/[0.06] text-zinc-400 hover:bg-white/[0.06] hover:text-white'
                  }`}
                >
                  {dur.id === 'lifetime' && <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-shimmer pointer-events-none" />}
                  {dur.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4">Promo Code</h4>
            <div className="flex gap-2">
              <input
                type="text"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
                placeholder="Enter Code (e.g. ELENX10)"
                className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white font-medium focus:outline-none focus:border-amber-500/50 transition-colors uppercase font-jetbrains"
              />
              <button 
                onClick={handleApplyCoupon}
                className="bg-white/[0.06] hover:bg-white/[0.1] text-white px-5 py-3 rounded-xl text-sm font-bold transition-colors border border-white/[0.08]"
              >
                Apply
              </button>
            </div>
            {couponStatus === 'success' && <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="text-emerald-400 text-xs mt-2 font-bold flex items-center gap-1"><svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg> Coupon applied!</motion.p>}
            {couponStatus === 'error' && <motion.p initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }} className="text-red-400 text-xs mt-2 font-bold flex items-center gap-1"><svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg> Invalid coupon.</motion.p>}
          </div>

          <div className="mt-auto pt-6 border-t border-white/[0.06]">
            <div className="flex justify-between items-end mb-2">
              <span className="text-zinc-500 font-bold uppercase tracking-widest text-xs">Total Price</span>
              {appliedCoupon && <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded uppercase tracking-wider border border-emerald-500/20">-{(appliedCoupon.discount * 100).toFixed(0)}% OFF</span>}
            </div>
            <div className="flex justify-end items-baseline gap-2 mb-4">
              <motion.div key={finalPriceUsd} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-baseline gap-2">
                {discountUsd > 0 && <span className="text-sm text-zinc-500 font-bold line-through">${currentPriceUsd}</span>}
                <span className="text-5xl font-bold text-white font-space-grotesk tracking-tighter">${finalPriceUsd}</span>
                <span className="text-lg font-bold text-zinc-500 font-space-grotesk">/ â‚¹{finalPriceInr}</span>
              </motion.div>
            </div>
            <p className={`text-xs font-bold mb-6 flex items-center gap-1.5 justify-end w-fit ml-auto px-3 py-1.5 rounded-full border ${
              product.isPremium 
                ? 'text-orange-400 bg-orange-500/10 border-orange-500/20' 
                : 'text-amber-400 bg-amber-500/10 border-amber-500/20'
            }`}>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" /></svg>
              Earn {rewardPoints} PXC Points
            </p>

            <button 
              onClick={handleBuyNowClick} 
              className={`w-full py-4 px-4 rounded-xl text-sm font-black uppercase tracking-wider text-white transition-all text-center shadow-lg ${
                product.isPremium 
                  ? 'bg-orange-600 hover:bg-orange-500 shadow-[0_0_20px_rgba(234,88,12,0.3)] hover:shadow-[0_0_30px_rgba(234,88,12,0.5)]' 
                  : 'bg-amber-600 hover:bg-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:shadow-[0_0_30px_rgba(245,158,11,0.5)]'
              }`}
            >
              Configure & Proceed to Billing
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

/* ===== CHECKOUT MODAL ===== */
const CheckoutModal = ({ isOpen, onClose, checkingOutItem, isCheckingOut, onCompleteCheckout, onPayUCheckout }) => {
  const [activeTab, setActiveTab] = useState('payu');
  const [cardholder, setCardholder] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [upiId, setUpiId] = useState('');
  const [error, setError] = useState('');
  const [focusedField, setFocusedField] = useState('');
  const [paypalStage, setPaypalStage] = useState('idle');
  const [tunnelProgress, setTunnelProgress] = useState(0);

  useEffect(() => {
    if (!isOpen) {
      setPaypalStage('idle');
      setTunnelProgress(0);
      setError('');
    }
  }, [isOpen]);

  if (!isOpen || !checkingOutItem) return null;

  const product = checkingOutItem.product;
  const duration = checkingOutItem.duration;
  const subtotalUsd = checkingOutItem.priceUsd || 0;
  const discountUsd = checkingOutItem.discountUsd || 0;
  const totalUsd = checkingOutItem.finalPriceUsd || 0;
  const totalInr = checkingOutItem.finalPriceInr || 0;

  const handleCardNumberChange = (e) => {
    const v = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const parts = [];
    for (let i = 0; i < v.length && i < 16; i += 4) parts.push(v.substring(i, i + 4));
    setCardNumber(parts.length > 0 ? parts.join(' ') : v);
  };

  const handleExpiryChange = (e) => {
    const v = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) setExpiry(`${v.substring(0, 2)}/${v.substring(2, 4)}`);
    else setExpiry(v);
  };

  const handleCvvChange = (e) => {
    setCvv(e.target.value.replace(/[^0-9]/gi, '').substring(0, 3));
  };

  const handlePayPalSubmit = () => {
    setPaypalStage('tunneling');
    setTunnelProgress(0);
    const interval = setInterval(() => {
      setTunnelProgress(prev => { if (prev >= 100) { clearInterval(interval); return 100; } return prev + 5; });
    }, 120);
    setTimeout(() => setPaypalStage('handshake'), 1200);
    setTimeout(() => { setPaypalStage('success'); clearInterval(interval); setTimeout(() => onCompleteCheckout(), 800); }, 3000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (activeTab === 'card') {
      if (cardNumber.replace(/\s/g, '').length !== 16) { setError('Enter a valid 16-digit card number.'); return; }
      if (!cardholder.trim()) { setError('Enter the cardholder name.'); return; }
      if (expiry.length !== 5 || !expiry.includes('/')) { setError('Enter a valid expiry (MM/YY).'); return; }
      const m = parseInt(expiry.split('/')[0], 10);
      if (isNaN(m) || m < 1 || m > 12) { setError('Enter a valid month (01-12).'); return; }
      if (cvv.length !== 3) { setError('Enter a valid 3-digit CVV.'); return; }
    } else if (activeTab === 'upi') {
      if (!upiId.trim() || !upiId.includes('@')) { setError('Enter a valid UPI ID (e.g. user@paytm).'); return; }
    }
    onCompleteCheckout();
  };

  const tabBtnClass = (tab) => `py-3 px-1 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex flex-col items-center gap-1.5 ${
    activeTab === tab ? 'bg-amber-600 text-white shadow-[0_0_15px_rgba(245,158,11,0.3)]' : 'text-zinc-500 hover:text-zinc-300'
  }`;

  return (
    <div className="fixed inset-0 z-[130] flex items-center justify-center p-4 sm:p-6 font-inter">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/90 backdrop-blur-lg" onClick={onClose} />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-5xl bg-[#0a0a14] border border-amber-500/15 rounded-3xl shadow-[0_0_60px_rgba(245,158,11,0.1)] z-10 overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
      >
        <div className="absolute inset-0 bg-grid-pattern-dense opacity-30 pointer-events-none" />

        <button onClick={onClose} className="absolute top-4 right-4 z-50 p-2 bg-white/5 hover:bg-white/10 rounded-full text-zinc-400 hover:text-white transition-colors border border-white/10">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>

        {/* Left: Summary */}
        <div className="w-full md:w-5/12 bg-[#06060a] p-8 md:p-10 flex flex-col overflow-y-auto custom-scrollbar border-b md:border-b-0 md:border-r border-white/[0.06] relative z-10">
          <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-6 font-jetbrains">INVOICE SUMMARY</h3>

          <div className="glass-card rounded-2xl p-5 mb-6 relative overflow-hidden">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h4 className="text-xl font-bold font-space-grotesk tracking-wide text-white">{product.name}</h4>
                <p className="text-xs text-zinc-400 mt-0.5">{product.description}</p>
              </div>
              {product.isPremium && <span className="px-2 py-0.5 text-[8px] font-black uppercase tracking-widest text-orange-300 bg-orange-500/15 border border-orange-500/25 rounded-md">PRO</span>}
            </div>
            <div className="flex justify-between items-center pt-3 border-t border-white/[0.04] mt-4 text-xs">
              <span className="text-zinc-500 font-bold uppercase tracking-wider">License:</span>
              <span className="text-white font-black font-jetbrains">{duration.label}</span>
            </div>
          </div>

          <div className="mt-auto space-y-3 glass-card p-5 rounded-2xl">
            <div className="flex justify-between text-xs font-bold text-zinc-500 uppercase">
              <span>Base Price</span>
              <span className="text-white">${subtotalUsd.toFixed(2)}</span>
            </div>
            {discountUsd > 0 && (
              <div className="flex justify-between text-xs font-bold text-emerald-400 uppercase">
                <span>Discount</span>
                <span>-${discountUsd.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between items-end pt-3 border-t border-white/[0.06]">
              <span className="text-xs font-bold text-white uppercase tracking-widest">NET AMOUNT</span>
              <div className="text-right">
                <span className="block font-space-grotesk text-3xl font-black text-amber-400 drop-shadow-[0_0_8px_rgba(245,158,11,0.3)]">${totalUsd.toFixed(2)}</span>
                <span className="text-[10px] font-bold text-zinc-500">â‚¹{totalInr} INR</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Billing */}
        <div className="w-full md:w-7/12 p-8 md:p-10 overflow-y-auto custom-scrollbar flex flex-col justify-between relative z-10">
          <div>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold font-space-grotesk tracking-wide text-white">BILLING GATEWAY</h3>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[9px] text-zinc-500 font-jetbrains tracking-widest uppercase">SSL SECURE</span>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-2 mb-8 bg-white/[0.02] p-1.5 rounded-2xl border border-white/[0.04]">
              <button type="button" onClick={() => { setActiveTab('payu'); setError(''); }} className={tabBtnClass('payu')}>
                <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                PayU
              </button>
              <button type="button" onClick={() => { setActiveTab('card'); setError(''); }} className={tabBtnClass('card')}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
                Card
              </button>
              <button type="button" onClick={() => { setActiveTab('upi'); setError(''); }} className={tabBtnClass('upi')}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                UPI / QR
              </button>
              <button type="button" onClick={() => { setActiveTab('paypal'); setError(''); }} className={tabBtnClass('paypal')}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                PayPal
              </button>
            </div>

            {error && <div className="mb-5 p-3 bg-red-900/15 border border-red-500/20 rounded-xl text-red-400 text-xs text-center font-bold font-jetbrains">[ERROR]: {error}</div>}

            {activeTab === 'payu' && (
              <div className="py-6 flex flex-col items-center justify-center text-center">
                <div className="max-w-md space-y-6">
                  <div className="w-20 h-20 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center mx-auto shadow-[0_0_25px_rgba(16,185,129,0.15)] animate-pulse">
                    <svg className="w-10 h-10 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="text-lg font-bold text-white font-space-grotesk">Official PayU Payment Gateway</h4>
                    <p className="text-xs text-zinc-400 leading-relaxed max-w-sm mx-auto">
                      Pay securely using UPI, Credit/Debit Cards, Net Banking, Wallets or EMI via PayU's encrypted portal.
                    </p>
                  </div>

                  <button
                    type="button"
                    disabled={isCheckingOut}
                    onClick={onPayUCheckout}
                    className="w-full py-4 rounded-xl font-black text-black bg-emerald-400 hover:bg-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] transition-all text-xs font-jetbrains uppercase tracking-widest cursor-pointer disabled:opacity-50"
                  >
                    {isCheckingOut ? "Connecting to PayU..." : "Proceed to PayU Checkout"}
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'card' && (
              <div className="space-y-6">
                {/* Virtual Card Preview */}
                <div className="relative w-full max-w-[340px] h-[190px] mx-auto rounded-2xl bg-gradient-to-br from-[#12121e] via-[#0c0c14] to-[#06060a] p-5 border border-white/[0.08] shadow-2xl flex flex-col justify-between overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-[40px] pointer-events-none group-hover:bg-amber-500/10 transition-all duration-700" />
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-xs font-black tracking-widest text-amber-400 font-space-grotesk">ELEN<span className="text-white">X</span></span>
                      <span className="block text-[7px] text-zinc-600 uppercase tracking-widest mt-0.5 font-jetbrains">SECURE TRANSIT</span>
                    </div>
                    <div className="w-9 h-6 bg-white/5 rounded-md border border-white/10 flex items-center justify-center">
                      <div className="grid grid-cols-3 gap-0.5 w-5 h-4 opacity-30">
                        <div className="border border-white/20 rounded-sm" /><div className="border border-white/20 rounded-sm" />
                        <div className="border border-white/20 rounded-sm" /><div className="border border-white/20 rounded-sm" />
                      </div>
                    </div>
                  </div>
                  <div className="my-1.5 text-center">
                    <span className={`text-lg font-jetbrains tracking-widest text-white block ${focusedField === 'number' ? 'text-amber-400 drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]' : ''}`}>
                      {cardNumber || 'â€¢â€¢â€¢â€¢ â€¢â€¢â€¢â€¢ â€¢â€¢â€¢â€¢ â€¢â€¢â€¢â€¢'}
                    </span>
                  </div>
                  <div className="flex justify-between items-end text-[10px] font-semibold font-jetbrains">
                    <div className="max-w-[65%]">
                      <span className="block text-[7px] text-zinc-600 uppercase tracking-widest">Card Holder</span>
                      <span className={`text-white tracking-wide block truncate uppercase ${focusedField === 'holder' ? 'text-amber-400' : ''}`}>{cardholder || 'YOUR NAME'}</span>
                    </div>
                    <div>
                      <span className="block text-[7px] text-zinc-600 uppercase tracking-widest">Expires</span>
                      <span className={`text-white tracking-widest block ${focusedField === 'expiry' ? 'text-amber-400' : ''}`}>{expiry || 'MM/YY'}</span>
                    </div>
                    <div>
                      <span className="block text-[7px] text-zinc-600 uppercase tracking-widest">CVV</span>
                      <span className={`text-white tracking-widest block ${focusedField === 'cvv' ? 'text-amber-400' : ''}`}>{cvv || 'â€¢â€¢â€¢'}</span>
                    </div>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1.5 pl-1">Cardholder Name</label>
                    <input type="text" placeholder="John Doe" value={cardholder} onChange={(e) => setCardholder(e.target.value)} onFocus={() => setFocusedField('holder')} onBlur={() => setFocusedField('')} required className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white font-medium focus:outline-none focus:border-amber-500/50 transition-colors uppercase font-jetbrains" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1.5 pl-1">Card Number</label>
                    <input type="text" placeholder="4111 2222 3333 4444" value={cardNumber} onChange={handleCardNumberChange} onFocus={() => setFocusedField('number')} onBlur={() => setFocusedField('')} required className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white font-medium focus:outline-none focus:border-amber-500/50 transition-colors font-jetbrains" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1.5 pl-1">Expiry</label>
                      <input type="text" placeholder="MM/YY" value={expiry} onChange={handleExpiryChange} onFocus={() => setFocusedField('expiry')} onBlur={() => setFocusedField('')} required className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white font-medium focus:outline-none focus:border-amber-500/50 transition-colors font-jetbrains" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1.5 pl-1">CVV</label>
                      <input type="password" placeholder="â€¢â€¢â€¢" value={cvv} onChange={handleCvvChange} onFocus={() => setFocusedField('cvv')} onBlur={() => setFocusedField('')} required className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white font-medium focus:outline-none focus:border-amber-500/50 transition-colors font-jetbrains" />
                    </div>
                  </div>
                  <button type="submit" disabled={isCheckingOut} className="w-full mt-2 py-4 rounded-xl font-black text-white bg-amber-600 hover:bg-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:shadow-[0_0_30px_rgba(245,158,11,0.5)] transition-all text-center disabled:opacity-50 flex items-center justify-center gap-2 uppercase tracking-widest text-xs font-jetbrains">
                    {isCheckingOut ? "Processing..." : "Authorize Payment"}
                  </button>
                </form>
              </div>
            )}

            {activeTab === 'upi' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  <div className="md:col-span-5 flex flex-col items-center justify-center p-4 glass-card rounded-2xl relative group overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-[2px] bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.8)] animate-scan-hud z-10 pointer-events-none" />
                    <div className="relative w-32 h-32 flex items-center justify-center border border-amber-500/30 p-2.5 bg-[#06060a] rounded-lg shadow-[0_0_15px_rgba(245,158,11,0.1)] z-10">
                      <svg viewBox="0 0 100 100" className="w-full h-full text-white fill-current opacity-90">
                        <path d="M0,0 h25 v8 h-17 v17 h-8 Z M75,0 h25 v25 h-8 v-17 h-17 Z M0,75 h8 v17 h17 v8 h-25 Z M92,92 h-17 v8 h25 v-25 h-8 Z" className="text-amber-500" />
                        <rect x="12" y="12" width="16" height="16" className="text-amber-400" />
                        <rect x="16" y="16" width="8" height="8" className="text-black" />
                        <rect x="72" y="12" width="16" height="16" className="text-amber-400" />
                        <rect x="76" y="16" width="8" height="8" className="text-black" />
                        <rect x="12" y="72" width="16" height="16" className="text-amber-400" />
                        <rect x="16" y="76" width="8" height="8" className="text-black" />
                        <path d="M40,15 h8 v8 h-8 Z M52,15 h8 v12 h-8 Z M40,28 h12 v8 h-12 Z M65,30 h8 v12 h-8 Z M30,45 h15 v8 h-15 Z M50,45 h18 v8 h-18 Z M45,60 h8 v15 h-8 Z M60,60 h15 v8 h-15 Z M32,75 h8 v12 h-8 Z M48,75 h12 v12 h-12 Z M72,72 h8 v16 h-8 Z" className="text-zinc-600" />
                        <rect x="44" y="44" width="12" height="12" className="text-amber-500" />
                      </svg>
                    </div>
                    <span className="block text-[8px] font-jetbrains tracking-widest text-amber-400 uppercase mt-3">SCAN TO PAY</span>
                  </div>
                  <div className="md:col-span-7 space-y-4">
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1.5 pl-1">UPI ID (VPA)</label>
                        <input type="text" placeholder="username@vpa" value={upiId} onChange={(e) => setUpiId(e.target.value)} required className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white font-medium focus:outline-none focus:border-amber-500/50 transition-colors font-jetbrains" />
                      </div>
                      <button type="submit" disabled={isCheckingOut} className="w-full py-3.5 rounded-xl font-black text-white bg-amber-600 hover:bg-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.3)] transition-all text-center text-xs font-jetbrains uppercase tracking-wider">
                        {isCheckingOut ? "Verifying..." : "Submit UPI Request"}
                      </button>
                    </form>
                    <div className="pt-2 border-t border-white/[0.04]">
                      <span className="block text-[9px] font-bold text-zinc-500 uppercase tracking-widest mb-2.5">Fast Pay</span>
                      <div className="grid grid-cols-3 gap-2">
                        {[['Elenx@gpay', 'GPay'], ['Elenx@ybl', 'PhonePe'], ['Elenx@paytm', 'Paytm']].map(([val, label]) => (
                          <button key={val} onClick={() => setUpiId(val)} className="py-2 px-1 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-amber-500/20 text-[10px] font-black text-zinc-400 hover:text-white transition-all text-center tracking-wider">{label}</button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'paypal' && (
              <div className="py-6 flex flex-col items-center justify-center text-center">
                {paypalStage === 'idle' && (
                  <div className="max-w-md space-y-6">
                    <div className="w-20 h-20 bg-amber-500/10 border border-amber-500/20 rounded-full flex items-center justify-center mx-auto animate-glow-pulse">
                      <svg className="w-10 h-10 text-amber-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.007 8.002c-.733 3.655-3.037 6.136-6.91 6.136h-2.584L8.796 23.36c-.1.442-.457.64-.842.64H3.666c-.443 0-.687-.315-.558-.87L7.69 3.864c.128-.555.549-.864 1.109-.864h7.006c3.963 0 5.435 2.1 4.202 5z" />
                      </svg>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-lg font-bold text-white font-space-grotesk">PayPal Secure Gateway</h4>
                      <p className="text-xs text-zinc-400 leading-relaxed max-w-sm mx-auto">Encrypted tunnel to process PayPal transactions securely.</p>
                    </div>
                    <button type="button" onClick={handlePayPalSubmit} className="w-full py-4 rounded-xl font-black text-white bg-amber-600 hover:bg-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.3)] transition-all text-xs font-jetbrains uppercase tracking-widest">
                      Connect PayPal Gateway
                    </button>
                  </div>
                )}
                {paypalStage !== 'idle' && (
                  <div className="w-full max-w-md glass-card rounded-2xl p-8 relative overflow-hidden flex flex-col items-center">
                    <div className="relative w-24 h-24 mb-6 flex items-center justify-center">
                      <div className="absolute inset-0 rounded-full border-4 border-white/[0.04]" />
                      <div className={`absolute inset-0 rounded-full border-4 border-transparent border-t-amber-500 animate-spin ${paypalStage === 'success' ? 'hidden' : ''}`} />
                      {paypalStage === 'success' ? (
                        <svg className="w-12 h-12 text-emerald-400 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                      ) : (
                        <span className="text-xs font-bold font-jetbrains text-amber-400">{tunnelProgress}%</span>
                      )}
                    </div>
                    <div className="w-full bg-[#06060a] p-4 rounded-xl border border-white/[0.04] text-left text-[10px] font-jetbrains text-amber-300 space-y-1.5 h-32 overflow-y-auto">
                      <p className="text-zinc-600">[0.00s] INITIALIZING SECURE TRANSIT...</p>
                      {tunnelProgress > 15 && <p className="text-zinc-500">[0.45s] CONNECTING TO GATEWAY...</p>}
                      {tunnelProgress > 35 && <p className="text-amber-400">[0.90s] HOST: api.sandbox.paypal.com CONNECTED.</p>}
                      {tunnelProgress > 55 && <p className="text-amber-400">[1.35s] SSL TUNNEL ESTABLISHED.</p>}
                      {tunnelProgress > 75 && <p className="text-amber-300">[1.90s] HANDSHAKE PROTOCOL ACTIVE...</p>}
                      {paypalStage === 'handshake' && <p className="text-emerald-400">[2.20s] TRANSACTION AUTHORIZED.</p>}
                      {paypalStage === 'success' && <p className="text-emerald-400 font-bold">[2.95s] GATEWAY SYNC: SUCCESS.</p>}
                    </div>
                    <span className="mt-5 text-[9px] font-bold text-zinc-500 tracking-widest uppercase font-jetbrains">
                      {paypalStage === 'success' ? 'GATEWAY CONNECTED' : 'ENCRYPTING TRANSIT â€” DO NOT CLOSE'}
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};


/* ===== MAIN LANDING PAGE ===== */
const LandingPage = () => {
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [checkoutProducts, setCheckoutProducts] = useState([]);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [checkingOutItem, setCheckingOutItem] = useState(null);
  const [userToken, setUserToken] = useState(() => {
    const token = localStorage.getItem('client_token');
    return token && token !== 'null' && token !== 'undefined' ? token : null;
  });

  useEffect(() => {
    const token = localStorage.getItem('client_token');
    const isValidToken = token && token !== 'null' && token !== 'undefined' && token.trim() !== '';
    const pending = sessionStorage.getItem('pending_checkout_item');
    if (isValidToken && pending) {
      try {
        const checkoutObj = JSON.parse(pending);
        setCheckingOutItem(checkoutObj);
        setIsCheckoutModalOpen(true);
      } catch (err) {
        console.error("Failed to parse pending checkout item", err);
      } finally {
        sessionStorage.removeItem('pending_checkout_item');
      }
    }

    // Check query params for PayU payment failure callback
    const urlParams = new URLSearchParams(window.location.search);
    const paymentStatus = urlParams.get('payment');
    const reason = urlParams.get('reason');
    if (paymentStatus === 'failed') {
      alert(`Payment Failed: ${reason || 'Transaction could not be completed via PayU Gateway.'}`);
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  const handleBuyNow = (product, selectedPricing) => {
    const token = localStorage.getItem('client_token');
    const isValidToken = token && token !== 'null' && token !== 'undefined' && token.trim() !== '';
    const checkoutObj = {
      product,
      duration: selectedPricing,
      priceUsd: selectedPricing.usd,
      discountUsd: selectedPricing.discountUsd || 0,
      finalPriceUsd: selectedPricing.usd,
      priceInr: selectedPricing.inr,
      finalPriceInr: selectedPricing.inr
    };
    if (!isValidToken) {
      sessionStorage.setItem('pending_checkout_item', JSON.stringify(checkoutObj));
      navigate('/login');
    } else {
      setCheckingOutItem(checkoutObj);
      setIsCheckoutModalOpen(true);
    }
  };

  const handleCompleteCheckout = async () => {
    if (!checkingOutItem) return;
    const token = localStorage.getItem('client_token');
    setIsCheckingOut(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/user/checkout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': token },
        body: JSON.stringify({
          items: [{ product: { id: checkingOutItem.product.id }, duration: { id: checkingOutItem.duration.id } }]
        })
      });
      const data = await response.json();
      if (response.ok) {
        setCheckoutProducts([{ name: checkingOutItem.product.name, label: checkingOutItem.duration.label }]);
        setCheckingOutItem(null);
        setIsCheckoutModalOpen(false);
        setShowSuccessModal(true);
      } else {
        alert(data.message || "Checkout failed.");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert("An error occurred during checkout.");
    } finally {
      setIsCheckingOut(false);
    }
  };

  const handlePayUCheckout = async () => {
    if (!checkingOutItem) return;
    const token = localStorage.getItem('client_token');
    if (!token) {
      navigate('/login');
      return;
    }
    setIsCheckingOut(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/payu/generate-hash`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },
        body: JSON.stringify({
          items: [{
            product: { id: checkingOutItem.product.id },
            duration: { id: checkingOutItem.duration.id }
          }]
        })
      });
      const data = await res.json();
      if (!res.ok) {
        if (data.message && (data.message.includes('User not found') || data.message.includes('Access denied') || data.message.includes('token'))) {
          localStorage.removeItem('client_token');
          sessionStorage.setItem('pending_checkout_item', JSON.stringify(checkingOutItem));
          navigate('/login');
          return;
        }
        alert(data.message || 'Failed to initialize PayU payment.');
        setIsCheckingOut(false);
        return;
      }

      const { actionUrl, params } = data;

      // Dynamically post form parameters to PayU hosted gateway page
      const form = document.createElement('form');
      form.method = 'POST';
      form.action = actionUrl;

      Object.keys(params).forEach(key => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = params[key];
        form.appendChild(input);
      });

      document.body.appendChild(form);
      form.submit();
    } catch (err) {
      console.error('PayU Checkout error:', err);
      alert('An error occurred while connecting to PayU Gateway.');
      setIsCheckingOut(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('client_token');
    localStorage.removeItem('role');
    setUserToken(null);
  };

  return (
    <div className="min-h-screen overflow-hidden relative font-inter selection:bg-amber-500/30 selection:text-white bg-[#06060a]">
      <ParticleBackground />

      {/* Ambient orbs */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-amber-600/5 rounded-full blur-[150px] pointer-events-none -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-orange-600/5 rounded-full blur-[150px] pointer-events-none translate-x-1/2 translate-y-1/2" />
      
      <Navbar userToken={userToken} onLogout={handleLogout} />

      {/* ===== HERO ===== */}
      <section id="home" className="relative z-10 pt-32 pb-20 lg:pt-48 lg:pb-32 px-4 flex flex-col items-center justify-center min-h-[90vh]">
        {/* Background effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
          <div className="absolute top-1/2 left-1/2 w-[80vw] h-[80vw] max-w-[900px] max-h-[900px] bg-[radial-gradient(circle,rgba(245,158,11,0.08)_0%,rgba(0,0,0,0)_70%)] transform -translate-x-1/2 -translate-y-1/2 animate-glow-pulse" />
          <div className="absolute top-[35%] left-[60%] w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] bg-[radial-gradient(circle,rgba(234,88,12,0.06)_0%,rgba(0,0,0,0)_70%)] transform -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute inset-0 bg-grid-pattern [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_10%,transparent_100%)]" />
        </div>

        {/* Floating geometric shapes */}
        <div className="absolute top-32 left-[10%] w-20 h-20 border border-amber-500/10 rounded-lg rotate-45 animate-float pointer-events-none hidden lg:block" />
        <div className="absolute top-52 right-[12%] w-16 h-16 border border-orange-500/10 rounded-full animate-float-reverse pointer-events-none hidden lg:block" />
        <div className="absolute bottom-40 left-[8%] w-12 h-12 border border-white/[0.04] rounded-md rotate-12 animate-float pointer-events-none hidden lg:block" style={{ animationDelay: '2s' }} />

        <div className="max-w-7xl mx-auto text-center w-full z-10 relative">
          {/* Floating status badges */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="absolute top-0 left-[15%] hidden lg:flex items-center gap-2 bg-white/[0.03] backdrop-blur-md border border-emerald-500/15 px-4 py-2 rounded-full"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-bold text-emerald-300 tracking-wider">100% UNDETECTED</span>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="absolute top-10 right-[15%] hidden lg:flex items-center gap-2 bg-white/[0.03] backdrop-blur-md border border-amber-500/15 px-4 py-2 rounded-full"
          >
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" style={{ animationDelay: '1s' }} />
            <span className="text-xs font-bold text-amber-300 tracking-wider">0MS LATENCY</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center mt-12"
          >
            {/* Brand pill */}
            <div className="inline-flex items-center gap-2 bg-white/[0.03] border border-white/[0.06] rounded-full px-5 py-2 mb-8">
              <div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest">Next-Gen Performance Software</span>
            </div>

            <h1 className="text-7xl md:text-[120px] leading-[0.85] font-black tracking-tighter mb-6 font-space-grotesk uppercase">
              <span className="text-gradient-hero">ELENX</span>
            </h1>
            
            <p className="mt-8 max-w-2xl mx-auto text-[17px] font-medium text-zinc-500 leading-relaxed">
              Industry-leading undetected software. Precision aim, absolute<br className="hidden md:block" />
              stealth, and instant delivery.
            </p>
            
            <div className="mt-14 flex flex-col sm:flex-row justify-center gap-5 w-full sm:w-auto">
              <a href="#products" onClick={(e) => { e.preventDefault(); document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' }); }} className="relative group px-10 py-4 bg-amber-600 text-white text-sm font-bold rounded-full shadow-[0_0_20px_rgba(245,158,11,0.4)] hover:shadow-[0_0_35px_rgba(245,158,11,0.6)] transition-all duration-300 border border-amber-400/30 overflow-hidden hover:scale-105 cursor-pointer">
                <span className="relative z-10 flex items-center justify-center gap-2 tracking-wider">
                  VIEW PRODUCTS <span className="text-lg leading-none group-hover:translate-x-1 transition-transform">→</span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-amber-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </a>
              
              <Link to="/register" className="px-10 py-4 bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] hover:border-amber-500/30 text-zinc-400 hover:text-white text-sm font-bold rounded-full transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.5)] hover:shadow-[0_0_20px_rgba(245,158,11,0.15)] tracking-wider">
                JOIN NETWORK
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== ABOUT SECTION ===== */}
      <section id="about" className="relative z-10 py-28 overflow-hidden border-t border-white/[0.03]">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-amber-600/[0.03] rounded-full blur-[120px]" />
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
              whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true, amount: 0.5 }}
              className="inline-flex items-center gap-2 bg-white/[0.03] border border-white/[0.06] rounded-full px-5 py-2 mb-6"
            >
              <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest">Why Choose Us</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 40, scale: 0.85, filter: 'blur(8px)' }}
              whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true, amount: 0.5 }}
              className="text-4xl md:text-6xl font-bold text-white font-space-grotesk tracking-tight"
            >
              Built for <span className="text-gradient-cyan">Dominance</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30, filter: 'blur(5px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true, amount: 0.5 }}
              className="mt-6 text-lg text-zinc-500 max-w-2xl mx-auto"
            >
              Cutting-edge performance optimization tools designed to give you the ultimate competitive edge.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { 
                icon: (
                  <svg className="w-7 h-7 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                ),
                title: 'Lightning Fast', 
                desc: 'Zero latency execution with kernel-level optimization for maximum FPS.', 
                stat: '0.1ms', 
                statLabel: 'Response Time' 
              },
              { 
                icon: (
                  <svg className="w-7 h-7 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                ),
                title: 'Fully Secure', 
                desc: 'Advanced anti-detection technology keeps you protected at all times.', 
                stat: '100%', 
                statLabel: 'Undetected Rate' 
              },
              { 
                icon: (
                  <svg className="w-7 h-7 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                title: 'Global Access', 
                desc: 'Works on all servers worldwide with instant delivery and 24/7 support.', 
                stat: '50K+', 
                statLabel: 'Active Users' 
              },
            ].map((item, idx) => {
              const directions = [
                { x: -80, y: 20, rotate: -5 },
                { x: 0, y: 60, rotate: 0, scale: 0.85 },
                { x: 80, y: 20, rotate: 5 }
              ];
              const dir = directions[idx] || directions[1];
              return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: dir.x, y: dir.y, rotate: dir.rotate, scale: dir.scale || 1, filter: 'blur(6px)' }}
                whileInView={{ opacity: 1, x: 0, y: 0, rotate: 0, scale: 1, filter: 'blur(0px)' }}
                transition={{ duration: 0.8, delay: idx * 0.15, type: 'spring', stiffness: 80, damping: 20 }}
                viewport={{ once: true, amount: 0.3 }}
                className="glass-card rounded-2xl p-8 group"
              >
                <div className="w-12 h-12 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center mb-5 group-hover:border-amber-500/20 transition-colors">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3 font-space-grotesk">{item.title}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed mb-6">{item.desc}</p>
                <div className="pt-5 border-t border-white/[0.04]">
                  <span className="text-3xl font-bold text-gradient-cyan font-space-grotesk">{item.stat}</span>
                  <span className="block text-[11px] text-zinc-600 uppercase tracking-wider mt-1 font-medium">{item.statLabel}</span>
                </div>
              </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Performance Comparison */}
      <PerformanceSection />

      {/* ===== PRODUCTS SECTION ===== */}
      <section id="products" className="relative z-10 py-28 overflow-hidden border-t border-white/[0.03]">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-amber-600/[0.04] rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-orange-600/[0.04] rounded-full blur-[120px]" />
        </div>

        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
              whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true, amount: 0.5 }}
              className="inline-flex items-center gap-2 bg-white/[0.03] border border-white/[0.06] rounded-full px-5 py-2 mb-6"
            >
              <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest">Product Arsenal</span>
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 50, scale: 0.85, filter: 'blur(8px)' }}
              whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true, amount: 0.5 }}
              className="text-4xl md:text-6xl font-bold text-white font-space-grotesk tracking-tight"
            >
              Choose Your <span className="text-gradient-cyan">Tier</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 30, filter: 'blur(5px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true, amount: 0.5 }}
              className="mt-6 text-lg text-zinc-500"
            >
              Select your optimization module. Dominate immediately.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {PRODUCTS.map((product, idx) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 60, scale: 0.9, rotate: idx % 2 === 0 ? -3 : 3, filter: 'blur(4px)' }}
                whileInView={{ opacity: 1, y: 0, scale: 1, rotate: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.7, delay: idx * 0.1, type: 'spring', stiffness: 100, damping: 18 }}
                viewport={{ once: true, amount: 0.15 }}
                className="h-full"
              >
                <ProductCard product={product} onOpenModal={setSelectedProduct} onBuyNow={handleBuyNow} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== REVIEWS ===== */}
      <section id="reviews" className="relative z-10 py-28 overflow-hidden border-t border-white/[0.03]">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute bottom-1/3 left-1/3 w-[500px] h-[500px] bg-orange-600/[0.03] rounded-full blur-[120px]" />
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
              whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true, amount: 0.5 }}
              className="inline-flex items-center gap-2 bg-white/[0.03] border border-white/[0.06] rounded-full px-5 py-2 mb-6"
            >
              <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest">Testimonials</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 50, scale: 0.85, filter: 'blur(8px)' }}
              whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true, amount: 0.5 }}
              className="text-4xl md:text-6xl font-bold text-white font-space-grotesk tracking-tight"
            >
              Trusted by <span className="text-gradient-cyan">Thousands</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30, filter: 'blur(5px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true, amount: 0.5 }}
              className="mt-6 text-lg text-zinc-500"
            >
              Real feedback from competitive players worldwide.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: 'ProPlayer_X', rating: 5, text: 'Best performance tool I\'ve ever used. Zero lag, instant results. The difference was noticeable from the first match.', product: 'Internal Pro', avatar: 'PX' },
              { name: 'DarkMatter99', rating: 5, text: 'Undetected for months. Streamer mode is absolutely incredible â€” no one suspects a thing. Support is top tier.', product: 'Streamer Pro', avatar: 'DM' },
              { name: 'ShadowElite', rating: 5, text: 'Been using Elenx for 6 months now. Never had any issues. UID bypass is a game-changer for ban protection.', product: 'UID Bypass', avatar: 'SE' },
              { name: 'NexusWolf', rating: 4, text: 'External Premium is insane value. Wall hack and speed hack work flawlessly. Delivery was instant too.', product: 'External Premium', avatar: 'NW' },
              { name: 'CyberKnight', rating: 5, text: 'The BIOS streamer is next level. Hardware-level stealth means absolutely no detection risk. Worth every penny.', product: 'BIOS Streamer', avatar: 'CK' },
              { name: 'PhantomAce', rating: 5, text: 'Started with Basic, upgraded to Pro within a week. ESP features are incredibly smooth and FPS impact is zero.', product: 'Internal Basic', avatar: 'PA' },
            ].map((review, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -60 : 60, y: 30, rotate: idx % 2 === 0 ? -4 : 4, filter: 'blur(4px)' }}
                whileInView={{ opacity: 1, x: 0, y: 0, rotate: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.8, delay: idx * 0.12, type: 'spring', stiffness: 80, damping: 18 }}
                viewport={{ once: true, amount: 0.2 }}
                className="glass-card rounded-2xl p-6 group relative"
              >
                {/* Left accent border */}
                <div className="absolute left-0 top-6 bottom-6 w-[2px] bg-gradient-to-b from-amber-500/50 via-orange-500/30 to-transparent rounded-full" />
                
                <div className="pl-4">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-white/[0.08] flex items-center justify-center text-xs font-bold text-amber-300">
                      {review.avatar}
                    </div>
                    <div>
                      <span className="text-sm font-bold text-white block">{review.name}</span>
                      <span className="text-[10px] text-amber-400 uppercase tracking-wider font-semibold">{review.product}</span>
                    </div>
                  </div>
                  <div className="flex gap-0.5 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className={`w-3.5 h-3.5 ${i < review.rating ? 'text-amber-400' : 'text-zinc-800'}`} fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-zinc-400 text-sm leading-relaxed italic">"{review.text}"</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== STATUS ===== */}
      <section id="status" className="relative z-10 py-28 overflow-hidden border-t border-white/[0.03]">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-600/[0.03] rounded-full blur-[120px]" />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
              whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true, amount: 0.5 }}
              className="inline-flex items-center gap-2 bg-white/[0.03] border border-white/[0.06] rounded-full px-5 py-2 mb-6"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest">Live Monitoring</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 50, scale: 0.85, filter: 'blur(8px)' }}
              whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true, amount: 0.5 }}
              className="text-4xl md:text-6xl font-bold text-white font-space-grotesk tracking-tight"
            >
              System <span className="text-gradient-cyan">Status</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30, filter: 'blur(5px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true, amount: 0.5 }}
              className="mt-6 text-lg text-zinc-500"
            >
              All systems operational. Real-time detection status.
            </motion.p>
          </div>

          {/* Terminal-style status panel */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95, filter: 'blur(6px)' }}
            whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true, amount: 0.2 }}
            className="glass-card rounded-2xl overflow-hidden border border-white/[0.06]"
          >
            {/* Terminal header */}
            <div className="flex items-center gap-2 px-5 py-3 border-b border-white/[0.04] bg-white/[0.02]">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/60" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/60" />
              </div>
              <span className="text-[10px] text-zinc-600 font-jetbrains ml-2">elenx-status-monitor â€” v2.1</span>
            </div>
            
            <div className="divide-y divide-white/[0.03]">
              {[
                { name: 'External Basic', status: 'Undetected', uptime: '99.9%' },
                { name: 'External Premium', status: 'Undetected', uptime: '99.9%' },
                { name: 'Internal Basic', status: 'Undetected', uptime: '99.8%' },
                { name: 'Internal Pro', status: 'Undetected', uptime: '99.9%' },
                { name: 'BIOS Streamer', status: 'Undetected', uptime: '100%' },
                { name: 'Streamer Basic', status: 'Undetected', uptime: '99.7%' },
                { name: 'Streamer Pro', status: 'Undetected', uptime: '99.9%' },
                { name: 'UID Bypass', status: 'Secure', uptime: '100%' },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -40, scale: 0.95 }}
                  whileInView={{ opacity: 1, x: 0, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 + idx * 0.07, type: 'spring', stiffness: 120, damping: 20 }}
                  viewport={{ once: true, amount: 0.3 }}
                  className="flex items-center justify-between px-5 py-3.5 hover:bg-white/[0.02] transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                    </span>
                    <span className="text-white font-medium text-sm">{item.name}</span>
                  </div>
                  <div className="flex items-center gap-5">
                    <span className="text-[11px] text-zinc-600 font-jetbrains">{item.uptime} uptime</span>
                    <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/15">{item.status}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-8 text-center"
          >
            <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/15 rounded-full px-6 py-3">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-sm font-semibold text-emerald-400">All Systems Operational</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== MODALS ===== */}
      <AnimatePresence>
        {selectedProduct && (
          <ProductModal 
            product={selectedProduct} 
            onClose={() => setSelectedProduct(null)} 
            onBuyNow={handleBuyNow}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isCheckoutModalOpen && (
          <CheckoutModal 
            isOpen={isCheckoutModalOpen}
            onClose={() => setIsCheckoutModalOpen(false)}
            checkingOutItem={checkingOutItem}
            isCheckingOut={isCheckingOut}
            onCompleteCheckout={handleCompleteCheckout}
            onPayUCheckout={handlePayUCheckout}
          />
        )}
      </AnimatePresence>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccessModal && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6 font-inter">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/95 backdrop-blur-lg" onClick={() => setShowSuccessModal(false)} />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-md bg-[#0a0a14] border border-amber-500/20 p-8 rounded-3xl shadow-[0_0_50px_rgba(245,158,11,0.15)] z-10 text-center"
            >
              <div className="mx-auto w-20 h-20 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(16,185,129,0.15)]">
                <svg className="w-10 h-10 text-emerald-400 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" /></svg>
              </div>

              <h3 className="text-3xl font-bold font-space-grotesk tracking-tight text-white mb-2">ACCESS INITIALIZED</h3>
              <p className="text-amber-400 text-sm font-bold uppercase tracking-widest mb-6">Payment Verified & Synced</p>

              <div className="glass-card rounded-2xl p-5 mb-8 text-left space-y-3">
                <span className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1">Purchased Modules:</span>
                {checkoutProducts.map((p, idx) => (
                  <div key={idx} className="flex justify-between items-center text-sm font-medium">
                    <span className="text-white flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                      {p.name}
                    </span>
                    <span className="text-zinc-400 text-xs bg-white/[0.04] px-2 py-0.5 rounded border border-white/[0.06]">{p.label}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-3">
                <Link 
                  to="/user-dashboard"
                  className="block w-full py-4 bg-amber-600 hover:bg-amber-500 text-white font-black rounded-xl shadow-[0_0_25px_rgba(245,158,11,0.3)] hover:shadow-[0_0_35px_rgba(245,158,11,0.5)] transition-all uppercase tracking-wider text-sm text-center"
                >
                  Enter Client Dashboard
                </Link>
                <button 
                  onClick={() => setShowSuccessModal(false)}
                  className="block w-full py-3 bg-transparent border border-white/[0.06] hover:border-white/[0.12] text-zinc-400 hover:text-white rounded-xl transition-all font-semibold text-sm"
                >
                  Close Window
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ===== FOOTER ===== */}
      <motion.footer
        initial={{ opacity: 0, y: 40, filter: 'blur(6px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true, amount: 0.1 }}
        className="relative z-10 border-t border-white/[0.04] py-16"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
            {/* Brand */}
            <div className="md:col-span-1">
              <span className="text-2xl font-black font-space-grotesk tracking-tighter text-gradient-hero">Elenx</span>
              <p className="mt-4 text-sm text-zinc-600 leading-relaxed">Industry-leading performance optimization software. Precision, stealth, and instant delivery.</p>
            </div>
            
            {/* Quick Links */}
            <div>
              <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-4">Products</h4>
              <ul className="space-y-2.5">
                {['External Basic', 'External Premium', 'Internal Pro', 'UID Bypass'].map(item => (
                  <li key={item}><a href="#products" className="text-sm text-zinc-600 hover:text-white transition-colors">{item}</a></li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-4">Company</h4>
              <ul className="space-y-2.5">
                {['About Us', 'Reviews', 'Status', 'Support'].map(item => (
                  <li key={item}><a href={`#${item.toLowerCase().replace(' ', '')}`} className="text-sm text-zinc-600 hover:text-white transition-colors">{item}</a></li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-4">Connect</h4>
              <ul className="space-y-2.5">
                {['Discord', 'Telegram', 'Twitter'].map(item => (
                  <li key={item}><a href="#" className="text-sm text-zinc-600 hover:text-white transition-colors">{item}</a></li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/[0.04] pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-zinc-700 text-sm font-medium">© 2026 Elenx Systems. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <a href="#" className="text-zinc-700 hover:text-zinc-400 text-xs transition-colors">Privacy Policy</a>
              <a href="#" className="text-zinc-700 hover:text-zinc-400 text-xs transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </motion.footer>
    </div>
  );
};

export default LandingPage;
