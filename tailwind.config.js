/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0b0a09',
        bone: '#f5f1e9',
        oat: '#e9e0d3',
        bronze: '#9a7146',
        bronzeDark: '#745230'
      },
      fontFamily: {
        display: ['Cormorant Garamond', 'serif'],
        sans: ['Manrope', 'sans-serif']
      },
      boxShadow: {
        luxury: '0 26px 80px rgba(20, 14, 8, .13)'
      }
    }
  },
  plugins: []
}
