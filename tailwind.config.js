/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // ELENX Metallic Brand System
        'elenx': {
          'bg-deep': '#050608',
          'bg-primary': '#080A0D',
          'bg-secondary': '#0B0E12',
          'surface': '#101318',
          'surface-elevated': '#14181D',
          'surface-bright': '#181D23',
          'metal-lightest': '#F5F7FA',
          'metal-light': '#D9DEE5',
          'metal-mid': '#AEB6C2',
          'metal-dark': '#858E9A',
          'border': 'rgba(174, 182, 194, 0.08)',
          'border-bright': 'rgba(174, 182, 194, 0.15)',
        },
      },
      boxShadow: {
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.5), 0 2px 4px -1px rgba(0, 0, 0, 0.3)',
        'silver': '0 0 20px rgba(174, 182, 194, 0.08)',
        'silver-md': '0 0 30px rgba(174, 182, 194, 0.12)',
        'silver-lg': '0 0 40px rgba(174, 182, 194, 0.18)',
        'metal': '0 4px 20px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(245, 247, 250, 0.04)',
      },
      fontFamily: {
        plaster: ['"Plaster"', 'cursive'],
        inter: ['"Inter"', 'sans-serif'],
        'space-grotesk': ['"Space Grotesk"', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'light-sweep': 'lightSweep 8s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        lightSweep: {
          '0%': { transform: 'translateX(-100%) skewX(-20deg)', opacity: '0' },
          '50%': { opacity: '0.3' },
          '100%': { transform: 'translateX(200%) skewX(-20deg)', opacity: '0' },
        },
      }
    },
  },
  plugins: [],
}
