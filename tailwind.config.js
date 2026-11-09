/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: {
          DEFAULT: '#F8F5EB',
          50: '#FDFCF9',
          100: '#F8F5EB',
          200: '#EFE9D7',
          300: '#E3D7BD',
        },
        olive: {
          DEFAULT: '#303915',
          dark: '#21270E',
          light: '#4B5824',
          subtle: '#627233',
        },
        gold: {
          DEFAULT: '#C8A35D',
          light: '#DBC086',
          dark: '#A6833D',
        },
        charcoal: {
          DEFAULT: '#1B1B1B',
          light: '#2D2D2D',
          muted: '#5A5A5A',
        },
        sand: '#F4ECE1',
        warmGray: '#7E7A75',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Italiana', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        editorial: ['Italiana', '"Cormorant Garamond"', 'Playfair Display', 'serif'],
      },
      letterSpacing: {
        widestPlus: '0.2em',
        editorial: '0.12em',
      },
      aspectRatio: {
        '3/4': '3 / 4',
        '4/5': '4 / 5',
        '16/9': '16 / 9',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-up': 'slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
