import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#06060a] font-inter selection:bg-amber-500/30 selection:text-white px-4 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-amber-600/5 rounded-full blur-[150px] pointer-events-none -translate-x-1/2 -translate-y-1/2" />
      
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="text-center relative z-10 max-w-lg"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1, type: 'spring' }}
          className="text-[120px] md:text-[180px] font-black font-space-grotesk leading-none tracking-tighter text-gradient-hero mb-4"
        >
          404
        </motion.div>

        <h1 className="text-2xl md:text-3xl font-bold text-white font-space-grotesk mb-4">
          Page Not Found
        </h1>
        <p className="text-zinc-500 mb-10 leading-relaxed">
          The page you're looking for doesn't exist or has been moved. 
          Let's get you back on track.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/"
            className="px-8 py-3.5 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-full shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:shadow-[0_0_30px_rgba(245,158,11,0.5)] transition-all text-sm tracking-wider flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Go Home
          </Link>
          <Link
            to="/contact"
            className="px-8 py-3.5 bg-white/[0.04] border border-white/[0.08] hover:border-amber-500/30 text-zinc-400 hover:text-white font-medium rounded-full transition-all text-sm tracking-wider"
          >
            Contact Support
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;
