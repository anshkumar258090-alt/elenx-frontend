import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ShoppingCart, ChevronDown, ArrowUpRight } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Product', href: '#products' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'Status', href: '#status' },
];

const Navbar = ({ userToken, onLogout }) => {
  const isLoggedIn = !!(userToken && userToken !== 'null' && userToken !== 'undefined' && userToken.trim() !== '');
  const [isOpen, setIsOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('Home');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Track active section on scroll
  useEffect(() => {
    const handleSectionScroll = () => {
      const sections = NAV_LINKS.map(l => l.href.replace('#', ''));
      let current = 'home';
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 150) {
            current = id;
          }
        }
      }
      const match = NAV_LINKS.find(l => l.href === `#${current}`);
      if (match) setActiveLink(match.label);
    };
    window.addEventListener('scroll', handleSectionScroll);
    return () => window.removeEventListener('scroll', handleSectionScroll);
  }, []);

  const handleNavClick = (link) => {
    setActiveLink(link.label);
    setIsOpen(false);
    const el = document.getElementById(link.href.replace('#', ''));
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-[#06060a]/80 backdrop-blur-2xl border-b border-white/[0.04] shadow-2xl shadow-black/40' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[72px]">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group flex-shrink-0">
            <span className="text-[28px] font-black font-space-grotesk tracking-tighter text-gradient-hero">
              Elenx
            </span>
          </Link>

          {/* Center Pill Navigation */}
          <div className="hidden md:flex items-center">
            <div className="flex items-center bg-white/[0.03] backdrop-blur-xl border border-white/[0.06] rounded-full px-1.5 py-1.5 gap-0.5">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link)}
                  className={`relative px-5 py-2 rounded-full text-[13px] font-medium transition-all duration-300 cursor-pointer ${
                    activeLink === link.label
                      ? 'text-white'
                      : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  {activeLink === link.label && (
                    <motion.div
                      layoutId="activeNavPill"
                      className="absolute inset-0 bg-zinc-800/80 border border-white/[0.08] rounded-full"
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
                  to="/user-dashboard"
                  className="flex items-center gap-2 text-amber-400 hover:text-amber-200 px-4 py-2 rounded-full text-[13px] font-semibold transition-all duration-300 bg-amber-500/10 border border-amber-500/15 hover:border-amber-500/30 hover:bg-amber-500/15"
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
                {/* CAD Dropdown Placeholder */}
                <div className="hidden lg:flex items-center gap-1 bg-white/[0.03] border border-white/[0.06] px-3 py-1.5 rounded-full cursor-pointer hover:bg-white/[0.06] transition-colors">
                  <span className="text-xs">ðŸ‡¨ðŸ‡¦</span>
                  <span className="text-[11px] font-bold text-white">CAD</span>
                  <ChevronDown size={12} className="text-zinc-400" />
                </div>
                
                {/* Cart Placeholder */}
                <div className="hidden lg:flex items-center justify-center w-8 h-8 rounded-full border border-white/[0.06] bg-white/[0.03] hover:bg-white/[0.06] transition-colors cursor-pointer relative mx-1">
                  <ShoppingCart size={14} className="text-zinc-300" />
                  <span className="absolute -top-1 -right-1 bg-amber-400 text-[9px] font-bold text-black w-3.5 h-3.5 rounded-full flex items-center justify-center">1</span>
                </div>

                <Link
                  to="/login"
                  className="text-zinc-300 hover:text-white px-4 py-2 rounded-full text-[13px] font-medium transition-all duration-300 hover:bg-white/[0.04]"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="group flex items-center gap-1.5 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-black px-6 py-2.5 rounded-full text-[13px] font-black tracking-wide transition-all duration-300 hover:shadow-[0_0_20px_rgba(245,158,11,0.6)] border border-amber-300/50 hover:scale-105"
                >
                  SIGN UP
                  <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </>
            )}

            <Link
              to="/admin/login"
              className="ml-1 flex items-center gap-1.5 px-4 py-2.5 rounded-full text-[12px] font-bold uppercase tracking-wider transition-all duration-300 bg-gradient-to-r from-orange-500/10 to-orange-500/5 border border-orange-500/20 text-orange-400 hover:border-orange-400/40 hover:bg-orange-500/15 hover:shadow-lg hover:shadow-orange-500/10"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
              Admin
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2.5 rounded-xl text-zinc-400 hover:text-white hover:bg-white/5 border border-white/[0.06] transition-all cursor-pointer"
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
              className="md:hidden bg-[#06060a]/95 backdrop-blur-3xl border-b border-white/[0.04] overflow-hidden"
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
                        ? 'text-white bg-white/[0.06] border border-white/[0.08]'
                        : 'text-zinc-400 hover:text-white hover:bg-white/[0.03] border border-transparent'
                    }`}
                  >
                    {link.label}
                  </motion.button>
                ))}

                <div className="h-[1px] bg-gradient-to-r from-transparent via-white/[0.06] to-transparent my-5" />

                {/* Auth Buttons */}
                {isLoggedIn ? (
                  <div className="space-y-3">
                    <Link
                      to="/user-dashboard"
                      onClick={() => setIsOpen(false)}
                      className="block text-center text-amber-400 hover:text-amber-200 py-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 font-semibold text-[14px]"
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
                      className="block text-center text-zinc-300 py-3.5 rounded-xl bg-white/[0.04] border border-white/[0.08] font-medium text-[14px] hover:bg-white/[0.06] transition-all"
                    >
                      Sign In
                    </Link>
                    <Link
                      to="/register"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center justify-center gap-2 text-center text-black py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 font-black text-[14px] hover:scale-[1.02] transition-all shadow-[0_0_15px_rgba(245,158,11,0.4)]"
                    >
                      Sign Up
                      <ArrowUpRight size={15} />
                    </Link>
                  </div>
                )}

                <Link
                  to="/admin/login"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center gap-2 mt-4 py-3.5 bg-gradient-to-r from-orange-500/10 to-orange-600/5 text-orange-400 border border-orange-500/20 font-bold uppercase tracking-widest text-[11px] rounded-xl transition-all hover:border-orange-400/40"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
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
