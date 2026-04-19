import { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';

const ThemeToggle = () => {
    const [theme, setTheme] = useState(
        localStorage.getItem('theme') ? localStorage.getItem('theme') : 'light'
    );

    useEffect(() => {
        const root = window.document.documentElement;
        if (theme === 'dark') {
            root.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            root.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [theme]);

    // System preference check on mount (optional, if no local storage)
    useEffect(() => {
        if (!localStorage.getItem('theme')) {
            if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                setTheme('dark');
            }
        }
    }, []);

    return (
        <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className={`relative inline-flex items-center h-8 w-16 rounded-full transition-all duration-300 focus:outline-none shadow-lg ${theme === 'dark'
                    ? 'bg-gray-800 shadow-glow-cyan/50 border border-cyan-500/30'
                    : 'bg-white shadow-glow border border-gray-200'
                }`}
            aria-label="Toggle Theme"
        >
            <span className="sr-only">Toggle Theme</span>

            {/* Moving Circle */}
            <motion.span
                layout
                transition={{ type: "spring", stiffness: 700, damping: 30 }}
                className={`absolute left-1 inline-flex items-center justify-center h-6 w-6 rounded-full shadow-md transform transition-colors duration-300 ${theme === 'dark' ? 'bg-gray-900 translate-x-8 text-cyan-400' : 'bg-yellow-400 text-white'
                    }`}
            >
                {theme === 'dark' ? (
                    <Moon size={14} className="animate-pulse-slow drop-shadow-[0_0_5px_rgba(6,182,212,0.8)]" />
                ) : (
                    <Sun size={14} className="animate-spin-slow drop-shadow-[0_0_5px_rgba(255,255,255,0.8)]" />
                )}
            </motion.span>
        </button>
    );
};

export default ThemeToggle;
