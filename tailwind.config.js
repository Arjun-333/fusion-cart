/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./styles/**/*.{css}", // Add this to include global styles
  ],
  theme: {
    extend: {
      colors: {
        beige: {
          100: "#f5f5dc",
        },
      },
    },
  },
  plugins: [],
};
