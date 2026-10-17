/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: '#0B0F17',
          surface: '#111827',
          card: '#182131',
          lime: '#C6FF65',
          'lime-dim': '#98cc42',
          violet: '#A78BFA',
          'violet-dark': '#7C3AED',
          text: '#F8FAFC',
          muted: '#A7B2C4',
          border: 'rgba(255, 255, 255, 0.10)',
          'border-active': 'rgba(198, 255, 101, 0.35)',
          'border-violet': 'rgba(167, 139, 250, 0.35)',
        }
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'glow-lime': '0 0 25px -5px rgba(198, 255, 101, 0.3)',
        'glow-violet': '0 0 25px -5px rgba(167, 139, 250, 0.3)',
        'inner-glow': 'inset 0 1px 0 0 rgba(255, 255, 255, 0.1)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
