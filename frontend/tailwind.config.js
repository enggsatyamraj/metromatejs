/** @type {import('tailwindcss').Config} */
export default {
  darkMode:'class',
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        RED: "#FF0000",
        VIOLET: "#9457EB",
        MAGENTA: "#FF00FF",
        GREEN: "#00FF00",
        ORANGE: "#FFA500",
        BLUE: "#0000FF",
        PINK: "#FFC0CB",
        YELLOW: "#FFFF00",
        GREY: "#808080",
        RAPID: "#000000",
        "BLUE 2": "#0000FF",
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};
