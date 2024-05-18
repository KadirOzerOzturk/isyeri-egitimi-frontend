/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,jsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js"
  ],
  theme: {
    extend: {
      colors: {
        'dark-blue':'#224279',
        'light-blue':'#BCDCF5'
      }
    },
   

    
  },
  plugins: [],
}