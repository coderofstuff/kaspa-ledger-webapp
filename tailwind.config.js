/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily: {
        // Array format:
      'sans': ['Overpass', 'Helvetica', 'Arial', 'sans-serif'],
    },
    extend: {
      animation: {
        'spin-fast': 'spin 0.1s linear 1'
      }

    },
  },
  plugins: [],
}