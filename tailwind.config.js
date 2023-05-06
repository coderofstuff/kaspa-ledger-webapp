/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontSize: {
      sm: '0.8rem',
      base: '1.2rem',
      xl: '1.25rem',
      '2xl': '1.563rem',
      '3xl': '1.953rem',
      '4xl': '2.441rem',
      '5xl': '3.052rem',
      '6xl': '5.052rem',
      '8xl': '6.052rem',
    },
    fontFamily: {
        // Array format:
      'sans': ['Rubik', 'Helvetica', 'Arial', 'sans-serif'],
      'mono': ['Roboto Mono', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', "Liberation Mono", "Courier New", 'monospace'],
      'big': ['Rubik', 'Rubik', 'Helvetica', 'Arial', 'sans-serif']
    },
    extend: {
      animation: {
        'spin-fast': 'spin 0.1s linear 1'
      }

    },
  },
  plugins: [],
}