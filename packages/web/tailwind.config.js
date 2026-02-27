/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: { extend: {
    colors: { brand: { 50:'#eef7ff',100:'#d9edff',200:'#bce0ff',300:'#8eceff',400:'#59b2ff',500:'#3391ff',600:'#1b70f5',700:'#145ae1',800:'#1749b6',900:'#19408f',950:'#142857' } },
    fontFamily: { sans: ['"DM Sans"','system-ui','sans-serif'], display: ['"Outfit"','system-ui','sans-serif'] },
  }},
  plugins: [],
};