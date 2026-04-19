import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed top-0 left-0 w-full z-50 glass-panel border-b border-gray-200 dark:border-gray-800"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <div className="flex-shrink-0 flex items-center">
                        <Link to="/" className="text-2xl font-bold font-space-grotesk text-gray-900 dark:text-white tracking-wider">
                            ELEN<span className="text-blue-600 dark:text-blue-400">X</span>
                        </Link>
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-center space-x-8">
                            <ThemeToggle />
                            <a href="#features" className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300">Features</a>
                            <a href="#comparison" className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300">Performance</a>
                            <a href="#products" className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300">Products</a>
                            <Link to="/login" className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300">Login</Link>
                            <Link to="/admin/login" className="ml-4 px-6 py-2 rounded-full border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 font-semibold hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
                                ElenX
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </motion.nav >
    );
};

export default Navbar;
