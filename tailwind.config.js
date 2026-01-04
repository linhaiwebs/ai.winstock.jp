/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'dark-primary': '#0a0e1a',
        'dark-secondary': '#1a1f2e',
        'dark-card': '#151923',
        'accent-red': '#dc2626',
        'accent-red-dark': '#b91c1c',
      },
      backgroundImage: {
        'dark-gradient': 'linear-gradient(to bottom right, #0a0e1a, #111827, #0a0e1a)',
        'red-glow': 'radial-gradient(circle, rgba(220, 38, 38, 0.2), transparent)',
      },
      boxShadow: {
        'red-glow': '0 0 20px rgba(220, 38, 38, 0.5)',
        'red-glow-lg': '0 0 40px rgba(220, 38, 38, 0.6)',
      },
      animation: {
        'pulse-red': 'pulse-red 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        'pulse-red': {
          '0%, 100%': { opacity: 1, boxShadow: '0 0 20px rgba(220, 38, 38, 0.5)' },
          '50%': { opacity: 0.8, boxShadow: '0 0 40px rgba(220, 38, 38, 0.8)' },
        },
      },
    },
  },
  plugins: [],
};
