/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}", // Keep if you use pages directory in src
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        beigeBg: "#e4d2c6",
        darkBrown: "#2c2220",
        mediumBrown: "#3d3130",
        lightBrown: "#6d5f5d",
        accentGold: "#c0aa8e",
        shopCardBg: "#222020",
        cardBg: "#2c2523",
        sidebarBg: "#222020",
      },
    },
  },
  plugins: [],
};
