import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Download, 
  Users, 
  UserPlus, 
  LogOut, 
  Shield, 
  Key, 
  FileCode, 
  Zap, 
  AlertTriangle, 
  Clock, 
  Cpu, 
  CheckCircle, 
  Info, 
  RefreshCw, 
  FileText, 
  Lock,
  Terminal,
  X,
  Menu,
  ShoppingCart,
  History,
  Trash2,
  CreditCard,
  Tag,
  Sparkles,
  Check
} from 'lucide-react';
import ParticleBackground from '../components/ParticleBackground';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';

// Predefined premium changelogs for the gaming launcher interface
const UPDATE_LOGS = {
  1: [
    { version: 'v1.1.2', date: 'May 18, 2026', changes: ['Improved memory safety routines.', 'Added silent toggle hotkey.', 'Fixed occasional overlay stutter on 240Hz monitors.'] },
    { version: 'v1.0.0', date: 'May 05, 2026', changes: ['Initial release of External Basic framework.', 'Optimized locations ESP for low-spec configurations.'] }
  ],
  2: [
    { version: 'v2.4.1', date: 'May 20, 2026', changes: ['Undetected security signature patch applied.', 'Kernel protection level upgraded.', 'Enhanced vision ESP overlays for premium speed hack components.'] },
    { version: 'v2.3.0', date: 'May 12, 2026', changes: ['Refactored guest bypass mechanism.', 'Added visual crosshair customization options.'] }
  ],
  3: [
    { version: 'v1.2.0', date: 'May 19, 2026', changes: ['Direct memory injection stability improved.', 'Reduced FOV slider jittering.', 'Added visible check filters.'] },
    { version: 'v1.0.0', date: 'May 02, 2026', changes: ['Initial setup of Internal Basic engine.', 'Bone ESP and bounding boxes released.'] }
  ],
  4: [
    { version: 'v3.1.0', date: 'May 21, 2026', changes: ['Domination toolkit signature updated.', 'Spinbot stability increased by 40% under extreme loads.', 'Added custom theme visualizer panel.'] },
    { version: 'v3.0.0', date: 'May 10, 2026', changes: ['Initial release of Internal Pro module.', 'Advanced enemy pull and 360-degree silent aim integrated.'] }
  ],
  5: [
    { version: 'v1.0.5', date: 'May 16, 2026', changes: ['Custom BIOS flashing tool optimized.', 'Fixed HWID spoofing on latest ASUS motherboards.', 'Instant load time latency reduced.'] }
  ],
  6: [
    { version: 'v1.3.1', date: 'May 17, 2026', changes: ['Phone stream controller responsiveness enhanced.', 'Lag-free stream protection protocols initialized.'] }
  ],
  7: [
    { version: 'v2.0.2', date: 'May 19, 2026', changes: ['Kernel overlay hiding routine completely refactored for streamer pro.', 'Bypassed OBS and Discord stream hooks.', 'Added hardware acceleration controls.'] }
  ],
  8: [
    { version: 'v1.0.1', date: 'May 15, 2026', changes: ['Signature anti-ban validation hooks.', 'Universal bypass emulator logic updated.'] }
  ]
};

const PRODUCT_NAMES = {
  1: 'EXTERNAL BASIC',
  2: 'EXTERNAL PREMIUM',
  3: 'INTERNAL BASIC',
  4: 'INTERNAL PRO',
  5: 'BIOS STREAMER',
  6: 'STREAMER BASIC',
  7: 'STREAMER PRO',
  8: 'BYPASS SUPREME',
  '1': 'EXTERNAL BASIC',
  '2': 'EXTERNAL PREMIUM',
  '3': 'INTERNAL BASIC',
  '4': 'INTERNAL PRO',
  '5': 'BIOS STREAMER',
  '6': 'STREAMER BASIC',
  '7': 'STREAMER PRO',
  '8': 'BYPASS SUPREME'
};

// Sub-component for individual Purchased Product Cards with dynamic timers and progress bars
const ProductCard = ({ product, downloadState, onDownload, onLaunch, onOpenChangelog }) => {
  const [timeLeft, setTimeLeft] = useState('');
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime();
      const expiry = new Date(product.expiryDate).getTime();
      const diff = expiry - now;

      if (diff <= 0) {
        setTimeLeft('Expired');
        setIsExpired(true);
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      let timeStr = '';
      if (days > 0) timeStr += `${days}d `;
      if (hours > 0 || days > 0) timeStr += `${hours}h `;
      timeStr += `${minutes}m ${seconds}s`;

      setTimeLeft(timeStr);
      setIsExpired(false);
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, [product.expiryDate]);

  // Determine Product styling & borders
  const isPro = product.name.toLowerCase().includes('pro') || product.name.toLowerCase().includes('premium');
  const borderClass = isPro ? 'rgb-border-glow' : product.name.toLowerCase().includes('bypass') ? 'neon-glow-red border border-red-500/20' : 'neon-glow-purple border border-purple-500/20';
  const glowColor = isPro ? 'from-purple-500/20 to-zinc-950/80' : 'from-zinc-900/40 to-zinc-950/80';

  // Format dates
  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Get matching product icon
  const getProductIcon = () => {
    const name = product.name.toLowerCase();
    if (name.includes('internal')) return <Cpu className="text-purple-400 w-10 h-10 group-hover:scale-110 transition-transform duration-300" />;
    if (name.includes('external')) return <Shield className="text-[#AEB6C2] w-10 h-10 group-hover:scale-110 transition-transform duration-300" />;
    if (name.includes('streamer') || name.includes('stremer')) return <Zap className="text-yellow-400 w-10 h-10 group-hover:scale-110 transition-transform duration-300" />;
    if (name.includes('bypass')) return <Key className="text-red-400 w-10 h-10 group-hover:scale-110 transition-transform duration-300" />;
    return <FileCode className="text-[#AEB6C2] w-10 h-10 group-hover:scale-110 transition-transform duration-300" />;
  };

  const isDownloading = downloadState && downloadState.active;

  return (
    <div className={`glass-panel-futuristic p-6 rounded-3xl relative overflow-hidden group flex flex-col justify-between h-[360px] ${borderClass}`}>
      {/* Background ambient lighting */}
      <div className={`absolute -right-8 -top-8 w-28 h-28 bg-gradient-to-br ${glowColor} blur-2xl rounded-full opacity-35 pointer-events-none group-hover:opacity-60 transition-opacity`} />
      
      <div>
        {/* Card Header */}
        <div className="flex justify-between items-start mb-4">
          <div className="p-3 bg-[#1e293b]/60 border border-white/5 rounded-2xl">
            {getProductIcon()}
          </div>
          
          <div className="flex flex-col items-end gap-1.5">
            <span className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full flex items-center gap-1.5 ${isExpired ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-[#D9DEE5]/10 text-[#AEB6C2] border border-[#AEB6C2]/15 shadow-[0_0_10px_rgba(174, 182, 194,0.1)]'}`}>
              <div className={`w-1.5 h-1.5 rounded-full ${isExpired ? 'bg-red-400' : 'bg-[#AEB6C2] animate-pulse'}`} />
              {isExpired ? 'Expired' : 'Active'}
            </span>
            <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">
              {product.version || 'v2.4.1'}
            </span>
          </div>
        </div>

        {/* Product Title */}
        <h3 className="text-2xl font-black font-space-grotesk tracking-tight text-white mb-1 group-hover:text-[#AEB6C2] transition-colors">
          {product.name}
        </h3>
        <p className="text-zinc-500 text-xs font-semibold tracking-wide uppercase mb-4">
          Duration: <span className="text-zinc-300 font-bold">{product.durationLabel}</span>
        </p>

        {/* Countdown / Stats Area */}
        <div className="space-y-2 mb-6 bg-[#1e293b]/40 p-4 rounded-2xl border border-white/5">
          <div className="flex justify-between items-center text-xs">
            <span className="text-zinc-500 font-semibold uppercase flex items-center gap-1">
              <Clock size={12} className="text-zinc-400" /> Time Remaining:
            </span>
            <span className={`font-mono font-bold ${isExpired ? 'text-red-400' : 'text-white'}`}>
              {timeLeft}
            </span>
          </div>
          <div className="flex justify-between items-center text-xs">
            <span className="text-zinc-500 font-semibold uppercase flex items-center gap-1">
              <Info size={12} className="text-zinc-400" /> Expiration Date:
            </span>
            <span className="text-zinc-300 font-bold">
              {formatDate(product.expiryDate)}
            </span>
          </div>
        </div>
      </div>

      {/* Action Buttons & Download Loader */}
      <div className="space-y-3 mt-auto">
        {isDownloading ? (
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs px-1">
              <span className="text-[#AEB6C2] font-black animate-pulse flex items-center gap-1">
                <RefreshCw size={12} className="animate-spin" /> DOWNLOADING...
              </span>
              <span className="text-zinc-400 font-mono font-bold">{downloadState.progress}%</span>
            </div>
            
            {/* Progress bar container */}
            <div className="w-full h-2.5 bg-[#050608] rounded-full overflow-hidden border border-white/5">
              <div 
                className="h-full bg-gradient-to-r from-[#AEB6C2] to-[#D9DEE5] rounded-full progress-bar-stripes transition-all duration-150" 
                style={{ width: `${downloadState.progress}%` }}
              />
            </div>
            
            <div className="flex justify-between items-center text-[10px] text-zinc-500 px-1 font-bold">
              <span>Speed: {downloadState.speed}</span>
              <span>Size: 14.8 MB</span>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-5 gap-2">
            <button
              onClick={() => onDownload(product)}
              disabled={isExpired}
              className={`col-span-2 py-3 rounded-xl transition-all flex items-center justify-center gap-1 font-black uppercase text-[10px] tracking-wider border relative overflow-hidden group/btn
              ${isExpired 
                ? 'bg-zinc-850 text-zinc-600 cursor-not-allowed border-white/5' 
                : 'bg-[#1e293b] text-zinc-300 hover:text-white hover:bg-zinc-850 border-white/10 hover:border-white/20 shadow-lg cursor-pointer'}`}
              title="Download Client Payload"
            >
              <Download size={12} /> Down
            </button>
            <button
              onClick={() => onLaunch(product)}
              disabled={isExpired}
              className={`col-span-2 py-3 rounded-xl transition-all flex items-center justify-center gap-1 font-black uppercase text-[10px] tracking-wider border relative overflow-hidden group/btn
              ${isExpired 
                ? 'bg-zinc-850 text-zinc-600 cursor-not-allowed border-white/5' 
                : 'bg-[#D9DEE5] text-zinc-950 hover:bg-[#AEB6C2] border-transparent cursor-pointer shadow-[0_0_10px_rgba(174, 182, 194,0.2)] hover:shadow-[0_0_20px_rgba(174, 182, 194,0.45)]'}`}
              title="Inject / Launch Tactical Override"
            >
              <Zap size={12} className="animate-pulse" /> Launch
            </button>
            <button
              onClick={() => onOpenChangelog(product)}
              className="col-span-1 py-3 bg-[#1e293b] border border-white/5 text-zinc-400 hover:text-white hover:bg-zinc-850 hover:border-white/10 rounded-xl transition-all flex items-center justify-center shadow-lg"
              title="View Changelog / Update Logs"
            >
              <FileText size={14} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// Premium simulated interactive client injector console
const LaunchConsoleModal = ({ product, onClose }) => {
  const [logs, setLogs] = useState([]);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('initializing'); // 'initializing', 'injecting', 'success'

  useEffect(() => {
    const consoleLogs = [
      { text: '==================================================', delay: 0 },
      { text: '   Elenx TACTICAL INJECTOR CLIENT v2.4.1.exe      ', delay: 200 },
      { text: '   SYSTEM ARCHITECTURE: SECURE RING-0 KERNEL     ', delay: 400 },
      { text: '==================================================', delay: 600 },
      { text: '[SYS] INITIALIZING MEMORY OVERWRITE ENGINE...', delay: 900 },
      { text: '[SYS] ESTABLISHING HYPERVISOR BYPASS ROUTINES...', delay: 1400 },
      { text: '[SYS] SHADOW REGISTRY KEYS MODIFIED FOR SILENT MODE', delay: 1800 },
      { text: `[SYS] SYSTEM GUID IDENTIFIED: {${Math.random().toString(36).substring(2, 7).toUpperCase()}-${Math.random().toString(36).substring(2, 7).toUpperCase()}-40A1-BE3D}`, delay: 2200 },
      { text: '[SYS] HARDWARE SPOOFER LOADED: HWID VIRTUALIZATION OK', delay: 2600 },
      { text: '[STATUS] SEARCHING FOR GAME TARGET INSTANCE...', delay: 3000 },
      { text: `[STATUS] FOUND ACTIVE PID: ${Math.floor(Math.random() * 8500 + 1200)} (target_game_executable.exe)`, delay: 3400 },
      { text: '[STATUS] DYNAMIC MEMORY MAP BUFFER ALLOCATED AT 0x7FFF08C2', delay: 3800 },
      { text: '[LOADER] HOOKING VIRTUAL METHOD TABLES (VMT) OVERLAYS...', delay: 4200 },
      { text: '[LOADER] ESTABLISHING DIRECTX D3D OVERLAYS DRAW ENGINE', delay: 4600 },
      { text: '[LOADER] RESOLVING DYNAMIC EXECUTABLE BYPASS SIGNATURES...', delay: 5100 },
      { text: '[SUCCESS] CRITICAL MEMORY REGISTERS FULLY BYPASSED!', delay: 5600 },
      { text: `[SUCCESS] ${product.name.toUpperCase()} INJECTED SUCCESSFULLY.`, delay: 6200 },
      { text: '==================================================', delay: 6500 },
      { text: '   Ready for tactical operations. Press [HOME] in-game.   ', delay: 6800 }
    ];

    let timers = [];
    consoleLogs.forEach((log) => {
      const t = setTimeout(() => {
        setLogs((prev) => [...prev, log.text]);
        // Auto scroll to bottom
        const container = document.getElementById('console-scroll-container');
        if (container) {
          container.scrollTop = container.scrollHeight;
        }
      }, log.delay);
      timers.push(t);
    });

    // Simulate progress bar
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setStatus('success');
          return 100;
        }
        const step = Math.floor(Math.random() * 8) + 3;
        const nextVal = prev + step;
        return nextVal > 100 ? 100 : nextVal;
      });
    }, 180);

    return () => {
      timers.forEach(clearTimeout);
      clearInterval(progressInterval);
    };
  }, [product]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 font-mono select-none">
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        exit={{ opacity: 0 }} 
        className="absolute inset-0 bg-black/85 backdrop-blur-md" 
        onClick={onClose} 
      />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 30 }}
        className="relative w-full max-w-2xl bg-[#050608] border border-purple-500/35 rounded-2xl shadow-[0_0_50px_rgba(168,85,247,0.25)] z-10 overflow-hidden rgb-border-glow"
      >
        {/* Terminal Header */}
        <div className="flex justify-between items-center px-4 py-3 bg-[#1e293b] border-b border-white/10">
          <div className="flex items-center gap-2">
            <Terminal size={14} className="text-purple-400 animate-pulse" />
            <span className="text-xs font-bold text-zinc-300 uppercase tracking-widest">
              Elenx TACTICAL INJECTOR v2.4.1.exe
            </span>
          </div>
          <button 
            onClick={onClose} 
            className="p-1 hover:bg-white/10 rounded text-zinc-400 hover:text-white transition-colors"
          >
            <X size={14} />
          </button>
        </div>

        <div className="p-6 flex flex-col md:flex-row gap-6 items-center">
          {/* Cybernetic Spinning Ring Scanner HUD */}
          <div className="flex-shrink-0 w-44 h-44 relative flex items-center justify-center">
            {/* Spinning scanner rings */}
            <div className="absolute inset-0 rounded-full border border-purple-500/20 animate-[spin_12s_linear_infinite]" />
            <div className="absolute inset-2 rounded-full border border-dashed border-[#AEB6C2]/20 animate-[spin_8s_linear_infinite_reverse]" />
            <div className="absolute inset-6 rounded-full border border-purple-400/10 shadow-[0_0_20px_rgba(168,85,247,0.15)] animate-pulse" />
            <div className="absolute inset-8 rounded-full border border-[#AEB6C2]/5 bg-[#1e293b]/40" />
            
            {/* Scanner central stats */}
            <div className="flex flex-col items-center justify-center text-center z-10 font-sans">
              <Cpu className={`w-8 h-8 ${progress < 100 ? 'text-purple-400 animate-pulse' : 'text-[#AEB6C2]'} mb-1`} />
              <span className="text-[9px] text-zinc-500 font-bold uppercase tracking-widest">Status</span>
              <span className={`text-[10px] font-black uppercase mb-0.5 tracking-wider ${progress < 100 ? 'text-purple-400' : 'text-[#AEB6C2]'}`}>
                {progress < 100 ? 'Injecting' : 'Completed'}
              </span>
              <span className="text-xl font-black text-white font-mono">{progress}%</span>
            </div>
          </div>

          {/* Console Text Window */}
          <div className="flex-1 w-full flex flex-col h-56 bg-black/90 rounded-xl border border-white/5 overflow-hidden relative">
            {/* Cyber scanline filter effect */}
            <div className="absolute inset-0 scanlines pointer-events-none opacity-20" />
            
            <div 
              id="console-scroll-container" 
              className="flex-1 p-4 overflow-y-auto text-[11px] leading-relaxed custom-scrollbar text-purple-400 font-mono space-y-1 h-full scroll-smooth select-text"
            >
              {logs.map((log, index) => (
                <div 
                  key={index}
                  className={
                    log.includes('[SUCCESS]') 
                      ? 'text-[#AEB6C2] font-bold' 
                      : log.includes('[SYS]') 
                      ? 'text-zinc-400' 
                      : log.includes('===') 
                      ? 'text-purple-500/60' 
                      : 'text-purple-300'
                  }
                >
                  {log}
                </div>
              ))}
            </div>

            {/* Glowing progress meter at the bottom */}
            <div className="p-3 bg-[#1e293b]/60 border-t border-white/5 flex items-center justify-between">
              <div className="w-2/3 h-1.5 bg-[#050608] rounded-full overflow-hidden border border-white/5">
                <div 
                  className={`h-full rounded-full transition-all duration-150 ${status === 'success' ? 'bg-[#D9DEE5] shadow-[0_0_10px_rgba(174, 182, 194,0.5)]' : 'bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]'}`}
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider font-sans">
                {status === 'success' ? 'MODULE ARMED' : 'BUFFERING ENGAGEMENT'}
              </span>
            </div>
          </div>
        </div>

        {/* Console Action Bar */}
        <div className="px-6 py-4 bg-[#1e293b]/80 border-t border-white/5 flex justify-end gap-3 font-sans">
          <button 
            onClick={onClose}
            className={`px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all
            ${status === 'success'
              ? 'bg-[#D9DEE5] hover:bg-[#AEB6C2] text-zinc-950 shadow-[0_0_15px_rgba(174, 182, 194,0.25)] hover:shadow-[0_0_25px_rgba(174, 182, 194,0.5)]'
              : 'bg-zinc-800 hover:bg-zinc-750 text-zinc-300 hover:text-white border border-white/5'}`}
          >
            {status === 'success' ? 'Close & System Launch' : 'Abort Override'}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

const UserDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { cartItems, cartCount, removeFromCart, clearCart, getCartTotal } = useCart();
  const [credentials, setCredentials] = useState([]);
  const [newCred, setNewCred] = useState({ productId: '', username: '', password: '' });
  const [activeTab, setActiveTab] = useState('overview');
  const [user, setUser] = useState(null);

  // Overhauled states
  const [downloadStates, setDownloadStates] = useState({});
  const [selectedLogProduct, setSelectedLogProduct] = useState(null);
  const [activeLaunchProduct, setActiveLaunchProduct] = useState(null);
  const [downloadSuccessToast, setDownloadSuccessToast] = useState(null);
  const [purchasedProducts, setPurchasedProducts] = useState([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [orders, setOrders] = useState([]);
  const [isLoadingOrders, setIsLoadingOrders] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [cartCouponInput, setCartCouponInput] = useState('');
  const [cartAppliedCoupon, setCartAppliedCoupon] = useState(null);
  const [validatingCartCoupon, setValidatingCartCoupon] = useState(false);
  const [cartCouponError, setCartCouponError] = useState('');

  // Read ?tab= from URL to auto-switch tab (e.g. after login redirect)
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabParam = urlParams.get('tab');
    if (tabParam && ['overview', 'clients', 'cart', 'purchases'].includes(tabParam)) {
      setActiveTab(tabParam);
      // Clean URL after reading
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, [location.search]);

  useEffect(() => {
    fetchProfile();
    fetchPurchasedProducts();

    const urlParams = new URLSearchParams(window.location.search);
    const paymentStatus = urlParams.get('payment');
    const txnid = urlParams.get('txnid');
    if (paymentStatus === 'success') {
      alert(`Payment Successful! Transaction ID: ${txnid || 'Completed'}. Your license has been activated.`);
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('client_token');
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/user/profile`, {
        headers: { Authorization: token }
      });
      // Explicit debug logs as requested
      console.log("[UserDashboard] fetched user data:", response.data);
      console.log("[UserDashboard] productAccess object (accessRights):", response.data.accessRights);
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  const fetchPurchasedProducts = async () => {
    try {
      setIsLoadingProducts(true);
      const token = localStorage.getItem('client_token');
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/user/products`, {
        headers: { Authorization: token }
      });
      
      // Explicit debug logs as requested
      console.log("[UserDashboard] purchasedProducts object (raw from server):", response.data);

      const mapped = response.data.map(p => {
        const timeDiff = new Date(p.expiry_date).getTime() - new Date(p.purchase_date || p.created_at || Date.now()).getTime();
        let durationLabel = '1 Month Subscription';
        if (timeDiff > 10 * 365 * 24 * 60 * 60 * 1000) {
          durationLabel = 'Lifetime Access';
        } else if (timeDiff > 300 * 24 * 60 * 60 * 1000) {
          durationLabel = '1 Year Subscription';
        } else if (timeDiff > 25 * 24 * 60 * 60 * 1000) {
          durationLabel = '1 Month Subscription';
        } else if (timeDiff > 6 * 24 * 60 * 60 * 1000) {
          durationLabel = '1 Week Subscription';
        } else {
          durationLabel = '1 Day Subscription';
        }

        return {
          _id: p._id,
          productId: p.product_id,
          name: p.name,
          purchaseDate: p.purchase_date,
          expiryDate: p.expiry_date,
          status: p.ownership_status,
          version: p.version || 'v2.4.1',
          fileSize: p.file_size || '14.8 MB',
          durationLabel
        };
      });

      // Explicit debug logs as requested
      console.log("[UserDashboard] rendered products array (mapped state):", mapped);
      setPurchasedProducts(mapped);
    } catch (error) {
      console.error("Error fetching purchased products:", error);
    } finally {
      setIsLoadingProducts(false);
    }
  };

  const fetchCredentials = async () => {
    try {
      const token = localStorage.getItem('client_token');
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/user/credentials`, {
        headers: { Authorization: token }
      });
      setCredentials(response.data);
    } catch (error) {
      console.error("Error fetching credentials:", error);
    }
  };

  const fetchOrders = async () => {
    try {
      setIsLoadingOrders(true);
      const token = localStorage.getItem('client_token');
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/user/orders`, {
        headers: { Authorization: token }
      });
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setIsLoadingOrders(false);
    }
  };

  const handleApplyCartCoupon = async (e) => {
    e?.preventDefault();
    if (!cartCouponInput.trim()) {
      setCartCouponError('Please enter a coupon code');
      return;
    }
    setValidatingCartCoupon(true);
    setCartCouponError('');
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/coupon/validate`, {
        code: cartCouponInput.trim().toUpperCase(),
        amount: getCartTotal('INR')
      });
      if (response.data.valid) {
        setCartAppliedCoupon(response.data);
        setCartCouponError('');
      } else {
        setCartAppliedCoupon(null);
        setCartCouponError(response.data.message || 'Invalid coupon code');
      }
    } catch (err) {
      setCartAppliedCoupon(null);
      setCartCouponError(err.response?.data?.message || 'Invalid or expired coupon code.');
    } finally {
      setValidatingCartCoupon(false);
    }
  };

  const handleRemoveCartCoupon = () => {
    setCartAppliedCoupon(null);
    setCartCouponInput('');
    setCartCouponError('');
  };

  const handleCheckout = async () => {
    if (cartItems.length === 0) return;
    setIsCheckingOut(true);
    try {
      const token = localStorage.getItem('client_token');
      const items = cartItems.map(item => ({
        product: { id: item.productId },
        duration: { id: item.planId }
      }));

      const payload = {
        items,
        phone: '9999999999',
        couponCode: cartAppliedCoupon ? cartAppliedCoupon.code : undefined
      };

      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/payu/generate-hash`, 
        payload,
        { headers: { Authorization: token } }
      );

      const { actionUrl, params } = response.data;

      // Create and submit PayU form
      const form = document.createElement('form');
      form.method = 'POST';
      form.action = actionUrl;
      form.style.display = 'none';

      for (const [key, value] of Object.entries(params)) {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = value !== undefined && value !== null ? value.toString() : '';
        form.appendChild(input);
      }

      document.body.appendChild(form);
      clearCart(); // Clear cart before redirecting to payment
      form.submit();
    } catch (error) {
      console.error('Checkout error:', error);
      const errMsg = error.response?.data?.message || error.message || 'Checkout failed. Please try again.';
      alert(`Checkout failed: ${errMsg}`);
    } finally {
      setIsCheckingOut(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'clients') {
      fetchCredentials();
    } else if (activeTab === 'overview') {
      fetchProfile();
      fetchPurchasedProducts();
    } else if (activeTab === 'purchases') {
      fetchOrders();
      fetchProfile();
    }
  }, [activeTab]);

  // Real-time synchronization loop: polling the products and user profile APIs every 5 seconds on Library Overview tab
  useEffect(() => {
    let interval;
    if (activeTab === 'overview') {
      console.log("[UserDashboard] Starting dynamic realtime sync listener (polling every 5 seconds)");
      interval = setInterval(() => {
        console.log("[UserDashboard] realtime updates - polling interval fired.");
        fetchProfile();
        fetchPurchasedProducts();
      }, 5000);
    }
    return () => {
      if (interval) {
        console.log("[UserDashboard] Stopping dynamic sync listener");
        clearInterval(interval);
      }
    };
  }, [activeTab]);

  const handleSaveCredentials = async (e) => {
    e.preventDefault();
    if (!newCred.productId) {
      alert("Please select a purchased product first.");
      return;
    }
    try {
      const token = localStorage.getItem('client_token');
      const payload = {
        productId: Number(newCred.productId),
        username: newCred.username,
        password: newCred.password
      };

      await axios.post(`${import.meta.env.VITE_API_URL}/api/user/credentials`, payload, {
        headers: { Authorization: token }
      });
      alert('Credentials saved successfully');
      setNewCred({ productId: '', username: '', password: '' });
      fetchCredentials();
    } catch (error) {
      console.error("Save credentials error", error);
      const message = error.response?.data?.message || "Error saving credentials";
      alert("Server Error: " + message);
    }
  };

  const handleDownload = async (productId, fileName) => {
    try {
      const token = localStorage.getItem('client_token');
      const response = await fetch(`${import.meta.env.VITE_API_URL}/secure-download/${productId}`, {
        method: 'GET',
        headers: {
          'Authorization': token
        }
      });

      if (response.ok) {
        const data = await response.json();
        if (data.download_url) {
          // Open external download link in new tab
          window.open(data.download_url, '_blank');
          
          // Show stunning success notification toast!
          setDownloadSuccessToast(`Redirecting to download ${data.product_name || fileName}! Tactical override ready.`);
          setTimeout(() => setDownloadSuccessToast(null), 4000);
        } else {
          alert("Download link not available yet. Please contact admin.");
        }
      } else if (response.status === 401 || response.status === 403) {
        alert("Access Denied! Please Login again.");
        navigate('/login');
      } else {
        const errData = await response.json().catch(() => ({}));
        alert(errData.message || "Download failed. The file is not available on the server currently.");
      }
    } catch (error) {
      console.error("Download error:", error);
      alert("An error occurred while downloading.");
    }
  };

  // Gamified simulated downloading process (verifies active, ticks up progress bar, then fetches binary)
  const triggerDownloadSimulation = (product) => {
    const now = new Date().getTime();
    const expiry = new Date(product.expiryDate).getTime();
    if (expiry <= now) {
      alert(`Subscription for ${product.name} has expired! Please renew via the store.`);
      return;
    }

    const pId = product.productId;
    if (downloadStates[pId]?.active) return; // already downloading

    setDownloadStates(prev => ({
      ...prev,
      [pId]: { active: true, progress: 0, speed: '0.0 MB/s' }
    }));

    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 9) + 4; // increment steps
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);

        // Native file download trigger
        const sanitizedName = product.name.toLowerCase().replace(/\s+/g, '_');
        handleDownload(pId, `${sanitizedName}.exe`);

        setDownloadStates(prev => ({
          ...prev,
          [pId]: { active: true, progress: 100, speed: 'Done' }
        }));

        // Reset state after completion
        setTimeout(() => {
          setDownloadStates(prev => {
            const copy = { ...prev };
            delete copy[pId];
            return copy;
          });
        }, 2000);
      } else {
        const speed = (Math.random() * 12 + 18).toFixed(1) + ' MB/s'; // speeds between 18-30 MB/s
        setDownloadStates(prev => ({
          ...prev,
          [pId]: { active: true, progress, speed }
        }));
      }
    }, 120);
  };

  const handleLogout = () => {
    localStorage.removeItem('client_token');
    localStorage.removeItem('role');
    navigate('/login');
  };

  return (
    <div className="min-h-screen font-inter relative overflow-hidden flex bg-[#050608]">
      <ParticleBackground />

      {/* Futuristic Launcher Orbs */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-purple-600/5 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/3"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-r from-[#D9DEE5] via-[#F5F7FA] to-[#D9DEE5]/5 rounded-full blur-[100px] pointer-events-none translate-y-1/3 -translate-x-1/3"></div>

      {/* Backdrop overlay for mobile */}
      {isSidebarOpen && (
        <div 
          onClick={() => setIsSidebarOpen(false)} 
          className="fixed inset-0 z-40 bg-[#050608]/80 backdrop-blur-sm lg:hidden transition-all duration-300"
        />
      )}

      {/* Sidebar Drawer */}
      <aside
        className={`w-64 glass-panel border-r border-white/10 h-screen fixed top-0 z-50 flex flex-col justify-between pt-10 pb-6 transition-transform duration-300 bg-[#0f0f13]/95 backdrop-blur-2xl lg:translate-x-0 ${
          isSidebarOpen ? 'translate-x-0 left-0' : '-translate-x-full lg:left-0'
        }`}
      >
        <div className="px-8">
          <h1 className="text-2xl font-bold font-space-grotesk tracking-wide mb-10 text-white">
            ELEN<span className="text-[#AEB6C2]">X</span>
            <span className="block text-xs font-normal text-zinc-400 mt-1 tracking-widest uppercase">Client Launcher</span>
          </h1>

          <nav className="space-y-4">
            <button
              onClick={() => { setActiveTab('overview'); setIsSidebarOpen(false); }}
              className={`flex items-center space-x-3 w-full px-4 py-3 rounded-xl transition-all duration-300 ${activeTab === 'overview' ? 'bg-[#D9DEE5]/10 text-[#AEB6C2] border border-[#AEB6C2]/20 gold-glow font-bold' : 'text-zinc-400 hover:bg-[#1e293b]/50'}`}
            >
              <Cpu size={20} />
              <span className="font-medium">Product Library</span>
            </button>
            <button
              onClick={() => { setActiveTab('cart'); setIsSidebarOpen(false); }}
              className={`flex items-center space-x-3 w-full px-4 py-3 rounded-xl transition-all duration-300 ${activeTab === 'cart' ? 'bg-[#D9DEE5]/10 text-[#AEB6C2] border border-[#AEB6C2]/20 gold-glow font-bold' : 'text-zinc-400 hover:bg-[#1e293b]/50'}`}
            >
              <ShoppingCart size={20} />
              <span className="font-medium">Cart</span>
              {cartCount > 0 && (
                <span className="ml-auto px-2 py-0.5 text-[10px] font-black bg-[#AEB6C2] text-[#050608] rounded-full min-w-[20px] text-center">
                  {cartCount}
                </span>
              )}
            </button>
            <button
              onClick={() => { setActiveTab('purchases'); setIsSidebarOpen(false); }}
              className={`flex items-center space-x-3 w-full px-4 py-3 rounded-xl transition-all duration-300 ${activeTab === 'purchases' ? 'bg-[#D9DEE5]/10 text-[#AEB6C2] border border-[#AEB6C2]/20 gold-glow font-bold' : 'text-zinc-400 hover:bg-[#1e293b]/50'}`}
            >
              <History size={20} />
              <span className="font-medium">Purchase History</span>
            </button>
            <button
              onClick={() => { setActiveTab('clients'); setIsSidebarOpen(false); }}
              className={`flex items-center space-x-3 w-full px-4 py-3 rounded-xl transition-all duration-300 ${activeTab === 'clients' ? 'bg-[#D9DEE5]/10 text-[#AEB6C2] border border-[#AEB6C2]/20 gold-glow font-bold' : 'text-zinc-400 hover:bg-[#1e293b]/50'}`}
            >
              <Key size={20} />
              <span className="font-medium">Credential Manager</span>
            </button>
          </nav>
        </div>

        <div className="px-8">
          <button onClick={handleLogout} className="flex items-center space-x-3 text-zinc-500 hover:text-red-500 transition-colors w-full px-4 py-3">
            <LogOut size={20} />
            <span>Log Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 lg:ml-64 ml-0 p-4 sm:p-10 relative z-10 overflow-y-auto min-h-screen pt-24 lg:pt-10">
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 sm:mb-12">
          <div className="flex items-center gap-3">
            {/* Mobile Sidebar Hamburger Menu Button */}
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl bg-[#1e293b] border border-white/5 text-zinc-400 hover:text-white"
            >
              <Menu size={20} />
            </button>
            <div>
              <h2 className="text-2xl sm:text-3xl font-black font-space-grotesk text-white">Dashboard</h2>
              <p className="text-zinc-400 mt-1 text-xs sm:text-sm">Logged in as: <strong className="text-white">{user?.username}</strong></p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="px-4 py-2 bg-[#1e293b]/80 rounded-full border border-white/5 shadow-sm flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#AEB6C2] animate-pulse" />
              <span className="text-[10px] sm:text-xs font-bold text-zinc-300">SYSTEM SECURE</span>
            </div>
          </div>
        </header>

        {/* Toast success notification */}
        <AnimatePresence>
          {downloadSuccessToast && (
            <motion.div 
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              className="mb-8 p-4 bg-[#D9DEE5]/10 border border-[#AEB6C2]/20 rounded-2xl flex items-center gap-3 text-[#AEB6C2] text-sm font-semibold shadow-[0_0_20px_rgba(174, 182, 194,0.1)] w-fit"
            >
              <CheckCircle size={18} className="animate-bounce" />
              {downloadSuccessToast}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Content Area */}
        <div className="space-y-8 max-w-6xl">
          
          {activeTab === 'overview' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold font-space-grotesk text-white">Tac-Ops Modules</h3>
                  <p className="text-xs text-zinc-400">Launch and download active hardware optimization suites.</p>
                </div>
                
                <span className="text-xs font-bold text-zinc-500 bg-[#1e293b] border border-white/5 px-3 py-1 rounded-full uppercase">
                  Library Modules: {purchasedProducts.length}
                </span>
              </div>

              {purchasedProducts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {purchasedProducts.map((product) => {
                    console.log(`[UserDashboard] Dashboard product render: ${product.name} (ID: ${product.productId})`);
                    return (
                      <ProductCard
                        key={product._id || product.productId}
                        product={product}
                        downloadState={downloadStates[product.productId]}
                        onDownload={triggerDownloadSimulation}
                        onLaunch={setActiveLaunchProduct}
                        onOpenChangelog={setSelectedLogProduct}
                      />
                    );
                  })}
                </div>
              ) : (
                <div className="py-20 text-center glass-panel-futuristic rounded-3xl border border-dashed border-white/10 flex flex-col items-center justify-center p-8 max-w-xl mx-auto shadow-2xl">
                  <div className="p-4 bg-[#1e293b]/60 rounded-full border border-white/5 text-zinc-500 mb-6">
                    <Lock size={32} />
                  </div>
                  <h4 className="text-2xl font-black font-space-grotesk text-white mb-2">PRODUCT LIBRARY EMPTY</h4>
                  <p className="text-zinc-400 text-sm max-w-xs mb-8">
                    No active modules found on your account. Purchases made from the storefront will automatically sync directly into this launcher library.
                  </p>
                  <a
                    href="/#products"
                    className="px-8 py-3 bg-[#D9DEE5] hover:bg-[#AEB6C2] text-zinc-950 font-black rounded-xl uppercase tracking-wider text-xs shadow-lg shadow-[#AEB6C2]/20 hover:shadow-[#AEB6C2]/40 transition-all transform hover:-translate-y-0.5"
                  >
                    Browse Main Store
                  </a>
                </div>
              )}
            </motion.div>
          )}

          {activeTab === 'clients' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Create / Save Credentials Form */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="lg:col-span-1 glass-panel p-6 rounded-3xl border border-white/10 shadow-lg h-fit"
              >
                <h3 className="text-lg font-bold text-zinc-100 mb-6 flex items-center gap-2">
                  <UserPlus size={20} className="text-[#AEB6C2]" /> Save Operational Credentials
                </h3>
                <form onSubmit={handleSaveCredentials} className="space-y-4">
                  {(() => {
                    const activeOwnedProducts = purchasedProducts.filter(p => {
                      const now = new Date().getTime();
                      const expiry = new Date(p.expiryDate).getTime();
                      return expiry > now && p.status === 'ACTIVE';
                    });

                    if (activeOwnedProducts.length === 0) {
                      return (
                        <div className="py-8 text-center bg-[#1e293b]/40 rounded-2xl border border-dashed border-red-500/20 p-6 flex flex-col items-center justify-center">
                          <Lock className="text-red-400 w-8 h-8 mb-3 animate-pulse" />
                          <span className="block text-xs font-bold text-red-400 uppercase tracking-widest mb-1">CYBER LOCK ACTIVE</span>
                          <p className="text-zinc-500 text-[11px] leading-relaxed max-w-[200px]">
                            No active owned products found. Purchase modules from the main storefront to unlock Credential Manager.
                          </p>
                        </div>
                      );
                    }

                    return (
                      <>
                        <div>
                          <label className="block text-zinc-400 text-xs font-bold mb-2 uppercase tracking-wide">Select Product</label>
                          <select
                            value={newCred.productId}
                            onChange={(e) => setNewCred({ ...newCred, productId: e.target.value })}
                            className="w-full px-4 py-3 bg-[#1e293b]/60 border border-white/10 rounded-xl focus:outline-none focus:border-[#AEB6C2] transition-all text-zinc-200 font-semibold"
                            required
                          >
                            <option value="" disabled>-- Choose Module --</option>
                            {activeOwnedProducts.map(prod => (
                              <option key={prod.productId} value={prod.productId} className="bg-[#050608] text-white font-semibold">
                                {prod.name} ({prod.version})
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <input
                            type="text"
                            placeholder="Operational Username"
                            value={newCred.username}
                            onChange={(e) => setNewCred({ ...newCred, username: e.target.value })}
                            className="w-full px-4 py-3 bg-[#1e293b]/50 border border-white/10 rounded-xl focus:outline-none focus:border-[#AEB6C2] focus:bg-[#1e293b] transition-all text-zinc-200 placeholder-zinc-500 font-semibold font-mono"
                            required
                          />
                        </div>
                        <div>
                          <input
                            type="password"
                            placeholder="Assign Password Override"
                            value={newCred.password}
                            onChange={(e) => setNewCred({ ...newCred, password: e.target.value })}
                            className="w-full px-4 py-3 bg-[#1e293b]/50 border border-white/10 rounded-xl focus:outline-none focus:border-[#AEB6C2] focus:bg-[#1e293b] transition-all text-zinc-200 placeholder-zinc-500 font-semibold font-mono"
                            required
                          />
                        </div>
                        <button type="submit" className="w-full py-3.5 bg-[#D9DEE5] text-zinc-950 hover:bg-[#AEB6C2] font-black rounded-xl hover:shadow-[0_0_20px_rgba(174, 182, 194,0.3)] transition-all uppercase tracking-wider text-xs border border-transparent">
                          [ Save Credentials ]
                        </button>
                      </>
                    );
                  })()}
                </form>
              </motion.div>
 
              {/* Credentials Registry List */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="lg:col-span-2 glass-panel p-6 rounded-3xl border border-white/10 shadow-lg"
              >
                <h3 className="text-lg font-bold text-zinc-100 mb-6 flex items-center gap-2">
                  <Key size={20} className="text-[#AEB6C2] animate-pulse" /> Active Credentials Registry
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-white/10 text-zinc-500 text-sm uppercase tracking-wider">
                        <th className="pb-3 pl-2">Product Module</th>
                        <th className="pb-3">Username</th>
                        <th className="pb-3">Password Override</th>
                        <th className="pb-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {credentials.map((cred) => (
                        <tr key={cred._id} className="group hover:bg-[#1e293b]/50 transition-colors">
                          <td className="py-4 pl-2 font-medium text-zinc-200 font-space-grotesk">
                            {PRODUCT_NAMES[cred.product_id] || `Product ID: ${cred.product_id}`}
                          </td>
                          <td className="py-4 text-zinc-300 font-mono font-medium">{cred.username}</td>
                          <td className="py-4 text-zinc-500 text-sm font-mono font-bold tracking-widest">••••••••</td>
                          <td className="py-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={async () => {
                                  if (window.confirm('Delete operational credentials for this module?')) {
                                    try {
                                      const token = localStorage.getItem('client_token');
                                      await axios.delete(`${import.meta.env.VITE_API_URL}/api/user/credentials/${cred._id}`, { headers: { Authorization: token } });
                                      fetchCredentials();
                                    } catch (e) { alert('Failed to delete credentials'); }
                                  }
                                }}
                                className="p-2 text-zinc-500 hover:text-red-500 hover:bg-red-900/20 rounded-lg transition-all"
                                title="Delete Operational Key"
                              >
                                <LogOut size={16} className="rotate-180" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                      {credentials.length === 0 && (
                        <tr>
                          <td colSpan="4" className="py-8 text-center text-zinc-500 italic font-semibold">No operational keys saved yet.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            </div>
          )}

          {/* ===== CART TAB ===== */}
          {activeTab === 'cart' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold font-space-grotesk text-white flex items-center gap-2">
                    <ShoppingCart size={22} className="text-[#AEB6C2]" /> Your Cart
                  </h3>
                  <p className="text-xs text-zinc-400">Items you've selected for purchase.</p>
                </div>
                {cartItems.length > 0 && (
                  <button
                    onClick={clearCart}
                    className="text-xs font-bold text-red-400 hover:text-red-300 bg-red-500/10 border border-red-500/20 px-3 py-1.5 rounded-full uppercase tracking-wider transition-all hover:bg-red-500/15"
                  >
                    Clear All
                  </button>
                )}
              </div>

              {cartItems.length > 0 ? (
                <div className="space-y-4">
                  {/* Cart Items */}
                  {cartItems.map((item, index) => (
                    <motion.div
                      key={`${item.productId}-${item.planId}-${index}`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="glass-panel-futuristic p-5 rounded-2xl border border-white/10 flex items-center justify-between group hover:border-[#AEB6C2]/20 transition-all"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-[#AEB6C2]/8 border border-[#AEB6C2]/10 flex items-center justify-center">
                          <ShoppingCart size={20} className="text-[#AEB6C2]" />
                        </div>
                        <div>
                          <h4 className="text-white font-bold font-space-grotesk text-sm">
                            {item.name}
                            {item.isPremium && (
                              <span className="ml-2 text-[9px] px-2 py-0.5 bg-[#AEB6C2]/10 text-[#D9DEE5] border border-[#AEB6C2]/20 rounded-full uppercase tracking-wider font-bold">
                                ★ Premium
                              </span>
                            )}
                          </h4>
                          <p className="text-zinc-500 text-xs font-semibold mt-0.5">
                            Duration: <span className="text-zinc-300">{item.planLabel}</span>
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <span className="text-lg font-black text-white font-space-grotesk">
                          {item.symbol}{item.currency === 'INR' ? item.priceInr : item.priceUsd}
                        </span>
                        <button
                          onClick={() => removeFromCart(index)}
                          className="p-2 text-zinc-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
                          title="Remove from cart"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </motion.div>
                  ))}

                  {/* Cart Summary & Checkout */}
                  {(() => {
                    const subtotal = getCartTotal('INR');
                    let discountAmount = 0;
                    if (cartAppliedCoupon) {
                      if (cartAppliedCoupon.discountType === 'PERCENTAGE') {
                        discountAmount = Math.round((subtotal * cartAppliedCoupon.discountPercentage) / 100);
                      } else {
                        discountAmount = Math.min(cartAppliedCoupon.discountAmount || 0, subtotal);
                      }
                    }
                    const finalTotal = Math.max(1, subtotal - discountAmount);

                    return (
                      <div className="glass-panel-futuristic p-6 rounded-2xl border border-[#AEB6C2]/15 mt-6 space-y-4">
                        
                        {/* Coupon Code Section */}
                        <div className="space-y-2">
                          <label className="block text-xs font-bold text-[#D9DEE5] uppercase tracking-wider flex items-center gap-1.5">
                            <Tag size={13} className="text-[#AEB6C2]" /> Apply Discount Code
                          </label>

                          {!cartAppliedCoupon ? (
                            <div className="flex gap-2">
                              <input
                                type="text"
                                placeholder="Enter code (e.g. SUMMER50)"
                                value={cartCouponInput}
                                onChange={(e) => setCartCouponInput(e.target.value.toUpperCase())}
                                className="flex-1 bg-black/50 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#AEB6C2]/50 font-mono font-bold uppercase transition-colors"
                              />
                              <button
                                type="button"
                                onClick={handleApplyCartCoupon}
                                disabled={validatingCartCoupon || !cartCouponInput.trim()}
                                className="px-5 py-2.5 bg-[#AEB6C2]/15 hover:bg-[#AEB6C2]/25 text-[#D9DEE5] border border-[#AEB6C2]/30 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-1.5 disabled:opacity-50 cursor-pointer"
                              >
                                {validatingCartCoupon ? <RefreshCw className="animate-spin" size={14} /> : <Sparkles size={14} />}
                                Apply
                              </button>
                            </div>
                          ) : (
                            <div className="p-3 rounded-xl bg-[#AEB6C2]/10 border border-[#AEB6C2]/30 flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div className="w-6 h-6 rounded-full bg-[#AEB6C2]/20 flex items-center justify-center text-[#D9DEE5]">
                                  <Check size={14} />
                                </div>
                                <div>
                                  <span className="text-xs font-bold text-[#F5F7FA] font-mono">
                                    {cartAppliedCoupon.code}
                                  </span>
                                  <span className="text-[11px] text-[#AEB6C2] ml-2 font-medium">
                                    ({cartAppliedCoupon.discountPercentage}% Discount Applied)
                                  </span>
                                </div>
                              </div>
                              <button
                                onClick={handleRemoveCartCoupon}
                                className="p-1 text-zinc-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all text-xs cursor-pointer"
                                title="Remove Code"
                              >
                                <X size={14} />
                              </button>
                            </div>
                          )}

                          {cartCouponError && (
                            <p className="text-xs text-red-400 mt-1 font-medium">{cartCouponError}</p>
                          )}
                        </div>

                        {/* Subtotal & Total */}
                        <div className="pt-2 border-t border-white/5 space-y-1.5 text-xs">
                          <div className="flex items-center justify-between text-[#858E9A]">
                            <span>Subtotal ({cartItems.length} item{cartItems.length > 1 ? 's' : ''})</span>
                            <span className="font-mono text-zinc-300">₹{subtotal}</span>
                          </div>
                          {cartAppliedCoupon && (
                            <div className="flex items-center justify-between text-[#D9DEE5] font-semibold">
                              <span>Discount ({cartAppliedCoupon.discountPercentage}%)</span>
                              <span className="font-mono">-₹{discountAmount}</span>
                            </div>
                          )}
                          <div className="flex items-center justify-between pt-2 border-t border-white/5">
                            <span className="text-sm font-bold text-white uppercase tracking-wider">Final Total</span>
                            <div className="text-right">
                              {cartAppliedCoupon && (
                                <span className="text-xs text-[#858E9A] line-through mr-2 font-mono">₹{subtotal}</span>
                              )}
                              <span className="text-2xl font-black text-white font-space-grotesk">
                                ₹{finalTotal}
                              </span>
                            </div>
                          </div>
                        </div>

                        <button
                          onClick={handleCheckout}
                          disabled={isCheckingOut}
                          className="w-full py-3.5 bg-gradient-to-r from-[#D9DEE5] via-[#F5F7FA] to-[#D9DEE5] text-[#050608] font-black rounded-xl uppercase tracking-wider text-xs shadow-lg shadow-[#AEB6C2]/20 hover:shadow-[#AEB6C2]/40 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                        >
                          {isCheckingOut ? (
                            <><RefreshCw size={14} className="animate-spin" /> Processing...</>
                          ) : (
                            <><CreditCard size={14} /> Proceed to Checkout (₹{finalTotal})</>
                          )}
                        </button>
                        <p className="text-center text-[10px] text-[#858E9A] mt-2 font-semibold">Secure payment via PayU Gateway</p>
                      </div>
                    );
                  })()}
                </div>
              ) : (
                <div className="py-20 text-center glass-panel-futuristic rounded-3xl border border-dashed border-white/10 flex flex-col items-center justify-center p-8 max-w-xl mx-auto shadow-2xl">
                  <div className="p-4 bg-[#1e293b]/60 rounded-full border border-white/5 text-zinc-500 mb-6">
                    <ShoppingCart size={32} />
                  </div>
                  <h4 className="text-2xl font-black font-space-grotesk text-white mb-2">CART IS EMPTY</h4>
                  <p className="text-zinc-400 text-sm max-w-xs mb-8">
                    You haven't added any products to your cart yet. Browse the storefront and select your desired modules.
                  </p>
                  <a
                    href="/#products"
                    className="px-8 py-3 bg-[#D9DEE5] hover:bg-[#AEB6C2] text-zinc-950 font-black rounded-xl uppercase tracking-wider text-xs shadow-lg shadow-[#AEB6C2]/20 hover:shadow-[#AEB6C2]/40 transition-all transform hover:-translate-y-0.5"
                  >
                    Browse Store
                  </a>
                </div>
              )}
            </motion.div>
          )}

          {/* ===== PURCHASE HISTORY TAB ===== */}
          {activeTab === 'purchases' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold font-space-grotesk text-white flex items-center gap-2">
                    <History size={22} className="text-[#AEB6C2]" /> Purchase History
                  </h3>
                  <p className="text-xs text-zinc-400">Your orders and activated subscriptions.</p>
                </div>
                <button
                  onClick={fetchOrders}
                  className="text-xs font-bold text-[#AEB6C2] bg-[#AEB6C2]/10 border border-[#AEB6C2]/15 px-3 py-1.5 rounded-full uppercase tracking-wider transition-all hover:bg-[#AEB6C2]/15 flex items-center gap-1"
                >
                  <RefreshCw size={12} /> Refresh
                </button>
              </div>

              {/* Orders from Order Collection */}
              {isLoadingOrders ? (
                <div className="py-12 text-center">
                  <RefreshCw size={24} className="animate-spin text-[#AEB6C2] mx-auto mb-3" />
                  <p className="text-zinc-400 text-sm">Loading purchase history...</p>
                </div>
              ) : orders.length > 0 ? (
                <div className="space-y-4">
                  {orders.map((order, idx) => (
                    <motion.div
                      key={order._id || order.orderId}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="glass-panel-futuristic p-5 rounded-2xl border border-white/10 hover:border-[#AEB6C2]/15 transition-all"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider block">Order ID</span>
                          <span className="text-xs text-white font-mono font-bold">{order.orderId}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full flex items-center gap-1.5 ${
                            order.payment_status === 'SUCCESS'
                              ? 'bg-[#D9DEE5]/10 text-[#AEB6C2] border border-[#AEB6C2]/15'
                              : order.payment_status === 'PENDING'
                              ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
                              : 'bg-red-500/10 text-red-400 border border-red-500/20'
                          }`}>
                            <div className={`w-1.5 h-1.5 rounded-full ${
                              order.payment_status === 'SUCCESS' ? 'bg-[#AEB6C2]' : order.payment_status === 'PENDING' ? 'bg-yellow-400 animate-pulse' : 'bg-red-400'
                            }`} />
                            {order.payment_status}
                          </span>
                        </div>
                      </div>

                      {/* Order Items */}
                      <div className="space-y-2 mb-3">
                        {(order.items || []).map((item, iIdx) => (
                          <div key={iIdx} className="flex items-center justify-between bg-[#1e293b]/40 p-3 rounded-xl border border-white/5">
                            <div>
                              <span className="text-sm font-bold text-white">{item.name}</span>
                              <span className="text-[10px] text-zinc-500 font-semibold ml-2 uppercase">{item.durationLabel}</span>
                            </div>
                            <span className="text-sm font-bold text-zinc-300">₹{item.price}</span>
                          </div>
                        ))}
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t border-white/5">
                        <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">
                          {new Date(order.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                        </span>
                        <span className="text-lg font-black text-white font-space-grotesk">
                          ₹{order.amount}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                /* Show purchasedSubscriptions from user profile as fallback */
                (user?.purchasedSubscriptions && user.purchasedSubscriptions.length > 0) ? (
                  <div className="space-y-4">
                    {user.purchasedSubscriptions.map((sub, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className="glass-panel-futuristic p-5 rounded-2xl border border-white/10 flex items-center justify-between"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl bg-[#AEB6C2]/8 border border-[#AEB6C2]/10 flex items-center justify-center">
                            <CheckCircle size={18} className="text-[#AEB6C2]" />
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-white">{sub.name}</h4>
                            <p className="text-[10px] text-zinc-500 font-semibold">
                              {sub.durationLabel} • Purchased {new Date(sub.purchaseDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                            </p>
                          </div>
                        </div>
                        <span className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full ${
                          sub.status === 'ACTIVE'
                            ? 'bg-[#D9DEE5]/10 text-[#AEB6C2] border border-[#AEB6C2]/15'
                            : 'bg-red-500/10 text-red-400 border border-red-500/20'
                        }`}>
                          {sub.status}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="py-20 text-center glass-panel-futuristic rounded-3xl border border-dashed border-white/10 flex flex-col items-center justify-center p-8 max-w-xl mx-auto shadow-2xl">
                    <div className="p-4 bg-[#1e293b]/60 rounded-full border border-white/5 text-zinc-500 mb-6">
                      <History size={32} />
                    </div>
                    <h4 className="text-2xl font-black font-space-grotesk text-white mb-2">NO PURCHASE HISTORY</h4>
                    <p className="text-zinc-400 text-sm max-w-xs mb-8">
                      You haven't made any purchases yet. Complete a checkout from the cart to see your transaction history here.
                    </p>
                    <a
                      href="/#products"
                      className="px-8 py-3 bg-[#D9DEE5] hover:bg-[#AEB6C2] text-zinc-950 font-black rounded-xl uppercase tracking-wider text-xs shadow-lg shadow-[#AEB6C2]/20 hover:shadow-[#AEB6C2]/40 transition-all transform hover:-translate-y-0.5"
                    >
                      Browse Store
                    </a>
                  </div>
                )
              )}
            </motion.div>
          )}

        </div>
      </main>

      {/* Modern Futuristic Update Log Modal */}
      <AnimatePresence>
        {selectedLogProduct && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 font-inter">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              className="absolute inset-0 bg-black/90 backdrop-blur-md" 
              onClick={() => setSelectedLogProduct(null)} 
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-xl bg-[#050608] border border-white/10 rounded-3xl shadow-[0_0_55px_rgba(0,0,0,0.85)] z-10 overflow-hidden"
            >
              <button 
                onClick={() => setSelectedLogProduct(null)} 
                className="absolute top-4 right-4 z-50 p-2 bg-black/60 hover:bg-white/10 border border-white/10 rounded-full text-zinc-400 hover:text-white transition-colors"
              >
                <AlertTriangle className="w-5 h-5 rotate-180" /> {/* Proxy cross close button */}
              </button>

              <div className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <span className="p-2 bg-[#D9DEE5]/10 border border-[#AEB6C2]/15 text-[#AEB6C2] rounded-xl">
                    <FileText size={20} />
                  </span>
                  <div>
                    <h3 className="text-2xl font-black font-space-grotesk tracking-tight text-white uppercase">Changelog & Updates</h3>
                    <p className="text-zinc-500 text-xs font-semibold uppercase">{selectedLogProduct.name} Logs</p>
                  </div>
                </div>

                <div className="h-[300px] overflow-y-auto pr-2 custom-scrollbar space-y-6 mt-6">
                  {UPDATE_LOGS[selectedLogProduct.productId]?.map((log, idx) => (
                    <div key={idx} className="border-l-2 border-[#AEB6C2]/20 pl-4 space-y-2 relative">
                      <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-[#AEB6C2] shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
                      
                      <div className="flex justify-between items-baseline mb-2">
                        <span className="text-sm font-black text-white font-mono">{log.version}</span>
                        <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">{log.date}</span>
                      </div>
                      <ul className="space-y-1.5">
                        {log.changes.map((change, cIdx) => (
                          <li key={cIdx} className="text-xs text-zinc-400 leading-relaxed font-semibold flex items-start gap-2">
                            <span className="text-[#AEB6C2] mt-1">-</span>
                            <span>{change}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                  {(!UPDATE_LOGS[selectedLogProduct.productId] || UPDATE_LOGS[selectedLogProduct.productId].length === 0) && (
                    <div className="text-center py-12 text-zinc-500 italic">
                      No updates logged for this product. Technical details are currently secure.
                    </div>
                  )}
                </div>

                <div className="mt-8 pt-6 border-t border-white/5 flex justify-end">
                  <button 
                    onClick={() => setSelectedLogProduct(null)}
                    className="px-6 py-2.5 bg-[#1e293b] hover:bg-zinc-850 border border-white/5 text-xs font-bold uppercase tracking-wider text-zinc-300 hover:text-white rounded-xl transition-all"
                  >
                    Dismiss Changelog
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Dynamic Simulated Interactive Injector Console Modal */}
      <AnimatePresence>
        {activeLaunchProduct && (
          <LaunchConsoleModal 
            product={activeLaunchProduct} 
            onClose={() => setActiveLaunchProduct(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserDashboard;
