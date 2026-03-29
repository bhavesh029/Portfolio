/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        space: {
          900: '#050816',
          800: '#0a0f1e',
          700: '#111633',
          600: '#1a1f45',
        },
        electric: {
          50: '#e8f1ff',
          100: '#d4e5ff',
          200: '#a8cbff',
          300: '#7db0ff',
          400: '#4f8fff',
          500: '#2563eb',
          600: '#1d4ed8',
          DEFAULT: '#4f8fff',
        },
        amber: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#f5a623',
          500: '#f59e0b',
          600: '#d97706',
          DEFAULT: '#f5a623',
        },
        glass: {
          border: 'rgba(79, 143, 255, 0.15)',
          surface: 'rgba(10, 15, 30, 0.60)',
          hover: 'rgba(17, 22, 51, 0.80)',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'glow-blue': '0 0 20px rgba(79, 143, 255, 0.3), 0 0 60px rgba(79, 143, 255, 0.1)',
        'glow-amber': '0 0 20px rgba(245, 166, 35, 0.3), 0 0 60px rgba(245, 166, 35, 0.1)',
        'glow-sm': '0 0 10px rgba(79, 143, 255, 0.2)',
        'glass': '0 8px 32px rgba(0, 0, 0, 0.3)',
        'glass-hover': '0 12px 40px rgba(0, 0, 0, 0.4), 0 0 20px rgba(79, 143, 255, 0.1)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out 2s infinite',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'spin-slow': 'spin 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.4', boxShadow: '0 0 10px rgba(79, 143, 255, 0.2)' },
          '50%': { opacity: '1', boxShadow: '0 0 25px rgba(79, 143, 255, 0.4)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'grid-pattern': 'linear-gradient(rgba(79, 143, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(79, 143, 255, 0.03) 1px, transparent 1px)',
      },
      backgroundSize: {
        'grid': '60px 60px',
      },
    },
  },
  plugins: [],
}