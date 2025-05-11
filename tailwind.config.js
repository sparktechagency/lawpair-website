/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'primary':'#1b69ad', 
      },
      fontFamily: {
        'roboto': ["Roboto", "serif"],
        'crimson': ["Crimson Pro", "serif"],
        'poppins': ["Poppins", "serif"],
      },
    },
  },
  plugins: [],
}