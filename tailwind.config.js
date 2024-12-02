/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'coffee': "url('./src/images/CoffeeHome.jpg')"
      },
      colors: {
        app: {
          primary: "#F7E6D4",
          secondary: "#2F0F06",
          terciary: "#1C0B04",
          orange: "#BF3B16",
        }
      }
    },
  },
  plugins: [],
}