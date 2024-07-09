/** @type {import('tailwindcss').Config} */
export default {
  content:['./index.html','./src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        "primary": "#00668A",
        "secondary": "#004E71",
      },
    },
    fontFamily: {
      'Roboto': ['Roboto', 'sans-serif'],
    },
  },
  plugins: [],
}

