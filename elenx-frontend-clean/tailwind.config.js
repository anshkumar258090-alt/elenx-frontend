/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Enable class-based dark mode
  theme: {
    extend: {
      colors: {
        'elenx-bg': '#f8fbfc', // Softer Off-White for Light Mode
        'elenx-silver': '#f1f5f9', // Cool Grey
        'elenx-dark': '#334155', // Slate Grey Text
        'elenx-charcoal': '#0B0C15', // Deep Midnight/Charcoal for Dark Mode
        'elenx-white-glow': '#ffffff',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(255, 255, 255, 0.9)',
        'glow-hover': '0 0 30px rgba(255, 255, 255, 1)',
        'glow-cyan': '0 0 20px rgba(6, 182, 212, 0.6)',
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
      },
      fontFamily: {
        plaster: ['"Plaster"', 'cursive'],
        inter: ['"Inter"', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      }
    },
  },
  plugins: [],
}
