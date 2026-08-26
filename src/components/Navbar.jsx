import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ShoppingCart, ChevronDown, ArrowUpRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

const NAV_LINKS = [
  { label: 'Home', href: '/', type: 'route' },
  { label: 'About', href: '/about', type: 'route' },
  { label: 'Services', href: '#services', type: 'hash' },
  { label: 'Products', href: '#products', type: 'hash' },
  { label: 'Contact', href: '/contact', type: 'route' },
];

const Navbar = ({ userToken, onLogout }) => {
  const isLoggedIn = !!(userToken && userToken !== 'null' && userToken !== 'undefined' && userToken.trim() !== '');
  const { cartCount } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('Home');
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Set active link based on current route
  useEffect(() => {
    const routeLink = NAV_LINKS.find(l => l.type === 'route' && l.href === location.pathname);
    if (routeLink) {
      setActiveLink(routeLink.label);
    }
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (link) => {
    setActiveLink(link.label);
    setIsOpen(false);
    if (link.type === 'route') {
      navigate(link.href);
    } else {
      // Hash link - scroll to section on current page or navigate to home first
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          const el = document.getElementById(link.href.replace('#', ''));
          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 300);
      } else {
        const el = document.getElementById(link.href.replace('#', ''));
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-[#050608]/85 backdrop-blur-2xl border-b border-[#AEB6C2]/[0.06] shadow-2xl shadow-black/40' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[72px]">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group flex-shrink-0">
            <span className="text-[28px] font-black font-space-grotesk tracking-tighter text-gradient-metal">
              ELENX
            </span>
          </Link>

          {/* Center Pill Navigation */}
          <div className="hidden md:flex items-center">
            <div className="flex items-center bg-[#101318]/60 backdrop-blur-xl border border-[#AEB6C2]/[0.06] rounded-full px-1.5 py-1.5 gap-0.5">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link)}
                  className={`relative px-5 py-2 rounded-full text-[13px] font-medium transition-all duration-300 cursor-pointer ${
                    activeLink === link.label
                      ? 'text-[#F5F7FA]'
                      : 'text-[#858E9A] hover:text-[#D9DEE5]'
                  }`}
                >
                  {activeLink === link.label && (
                    <motion.div
                      layoutId="activeNavPill"
                      className="absolute inset-0 bg-[#14181D]/90 border border-[#AEB6C2]/[0.12] rounded-full shadow-[0_0_12px_rgba(174,182,194,0.06)]"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="hidden md:flex items-center gap-3">
            {isLoggedIn ? (
              <>
                <Link
                  to="/user-dashboard?tab=cart"
                  className="relative flex items-center gap-1 text-[#AEB6C2] hover:text-[#F5F7FA] px-3 py-2 rounded-full text-[13px] font-semibold transition-all duration-300 hover:bg-white/[0.04]"
                >
                  <ShoppingCart size={18} />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#AEB6C2] text-[#050608] text-[10px] font-black rounded-full flex items-center justify-center shadow-[0_0_10px_rgba(174,182,194,0.3)]">
                      {cartCount}
                    </span>
                  )}
                </Link>
                <Link
                  to="/user-dashboard"
                  className="flex items-center gap-2 text-[#D9DEE5] hover:text-[#F5F7FA] px-4 py-2 rounded-full text-[13px] font-semibold transition-all duration-300 bg-[#AEB6C2]/8 border border-[#AEB6C2]/12 hover:border-[#AEB6C2]/25 hover:bg-[#AEB6C2]/12"
                >
                  Dashboard
                </Link>
                <button
                  onClick={onLogout}
                  className="flex items-center gap-1 text-red-400 hover:text-red-300 px-4 py-2 rounded-full text-[13px] font-semibold transition-all duration-300 bg-red-500/10 border border-red-500/15 hover:border-red-500/30 hover:bg-red-500/15 cursor-pointer"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-[#AEB6C2] hover:text-[#F5F7FA] px-4 py-2 rounded-full text-[13px] font-medium transition-all duration-300 hover:bg-white/[0.04]"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="group flex items-center gap-1.5 bg-gradient-to-r from-[#D9DEE5] via-[#F5F7FA] to-[#D9DEE5] text-[#050608] px-6 py-2.5 rounded-full text-[13px] font-black tracking-wide transition-all duration-300 hover:shadow-[0_0_20px_rgba(174,182,194,0.35)] border border-white/20 hover:scale-105"
                >
                  SIGN UP
                  <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </>
            )}

            <Link
              to="/admin/login"
              className="ml-1 flex items-center gap-1.5 px-4 py-2.5 rounded-full text-[12px] font-bold uppercase tracking-wider transition-all duration-300 bg-[#AEB6C2]/[0.06] border border-[#858E9A]/15 text-[#AEB6C2] hover:border-[#AEB6C2]/30 hover:bg-[#AEB6C2]/10 hover:shadow-lg hover:shadow-[#AEB6C2]/5"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#AEB6C2] animate-pulse" />
              Admin
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2.5 rounded-xl text-[#858E9A] hover:text-[#F5F7FA] hover:bg-white/5 border border-[#AEB6C2]/[0.06] transition-all cursor-pointer"
              aria-label="Toggle Menu"
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <X size={22} />
                  </motion.div>
                ) : (
                  <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <Menu size={22} />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-[-1]"
              onClick={() => setIsOpen(false)}
            />
            
            {/* Menu Panel */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="md:hidden bg-[#050608]/95 backdrop-blur-3xl border-b border-[#AEB6C2]/[0.06] overflow-hidden"
            >
              <div className="px-5 pt-3 pb-8 space-y-1.5">
                
                {/* Nav Links */}
                {NAV_LINKS.map((link, index) => (
                  <motion.button
                    key={link.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => handleNavClick(link)}
                    className={`w-full text-left px-4 py-3.5 rounded-xl text-[15px] font-medium transition-all cursor-pointer ${
                      activeLink === link.label
                        ? 'text-[#F5F7FA] bg-[#14181D]/80 border border-[#AEB6C2]/[0.1]'
                        : 'text-[#858E9A] hover:text-[#F5F7FA] hover:bg-white/[0.03] border border-transparent'
                    }`}
                  >
                    {link.label}
                  </motion.button>
                ))}

                <div className="h-[1px] bg-gradient-to-r from-transparent via-[#AEB6C2]/[0.08] to-transparent my-5" />

                {/* Auth Buttons */}
                {isLoggedIn ? (
                  <div className="space-y-3">
                    <Link
                      to="/user-dashboard?tab=cart"
                      onClick={() => setIsOpen(false)}
                      className="relative block text-center text-[#AEB6C2] hover:text-[#F5F7FA] py-3.5 rounded-xl bg-white/[0.04] border border-[#AEB6C2]/[0.08] font-semibold text-[14px] hover:bg-white/[0.06] transition-all"
                    >
                      <span className="flex items-center justify-center gap-2">
                        <ShoppingCart size={16} />
                        Cart
                        {cartCount > 0 && (
                          <span className="px-2 py-0.5 text-[10px] font-black bg-[#AEB6C2] text-[#050608] rounded-full">
                            {cartCount}
                          </span>
                        )}
                      </span>
                    </Link>
                    <Link
                      to="/user-dashboard"
                      onClick={() => setIsOpen(false)}
                      className="block text-center text-[#D9DEE5] hover:text-[#F5F7FA] py-3.5 rounded-xl bg-[#AEB6C2]/8 border border-[#AEB6C2]/12 font-semibold text-[14px]"
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={() => { onLogout(); setIsOpen(false); }}
                      className="w-full text-center text-red-400 hover:text-red-300 py-3.5 rounded-xl bg-red-950/15 border border-red-500/20 font-semibold text-[14px] cursor-pointer"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <Link
                      to="/login"
                      onClick={() => setIsOpen(false)}
                      className="block text-center text-[#AEB6C2] py-3.5 rounded-xl bg-white/[0.04] border border-[#AEB6C2]/[0.08] font-medium text-[14px] hover:bg-white/[0.06] transition-all"
                    >
                      Sign In
                    </Link>
                    <Link
                      to="/register"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center justify-center gap-2 text-center text-[#050608] py-3.5 rounded-xl bg-gradient-to-r from-[#D9DEE5] via-[#F5F7FA] to-[#D9DEE5] font-black text-[14px] hover:scale-[1.02] transition-all shadow-[0_0_15px_rgba(174,182,194,0.2)]"
                    >
                      Sign Up
                      <ArrowUpRight size={15} />
                    </Link>
                  </div>
                )}

                <Link
                  to="/admin/login"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center gap-2 mt-4 py-3.5 bg-[#AEB6C2]/[0.06] text-[#AEB6C2] border border-[#858E9A]/15 font-bold uppercase tracking-widest text-[11px] rounded-xl transition-all hover:border-[#AEB6C2]/30"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#AEB6C2] animate-pulse" />
                  Admin Access
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
