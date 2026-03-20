/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#0a0a0a',
          surface: '#111111',
          border: '#1f1f1f',
          hover: '#1a1a1a',
          text: '#e5e5e5',
          muted: '#8a8a8a',
        },
      },
    },
  },
  plugins: [],
};
