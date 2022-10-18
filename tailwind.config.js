/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ["Barlow", "sans-serif"],
      },
      colors: {
        gray: {
          100: "#E0E6E9",
          500: "#ABBBC2",
          700: "#393C49",
          900: "#1F1D2B",
          800: "#252836",
        },
        primary: "#EA7C69",
        primary_light: "#FFF5EF",
        accent: {
          blue: "#65B0F6",
          orange: "#fdba74",
          red: "#fb7185",
          green: "#34d399",
          violet: "#818cf8",
        },
        dark: {
          base1: "#252836",
          base2: "#1f1d2b",
          base3: "#2d303e",
          line: "#393c49",
          text1: "#e0e6e9",
          text2: "#abbbc2",
        },
        light: {
          base1: "#fff5ef",
          base2: "#ffffff",
          base3: "#fdfdfd",
          line: "#abbbc2",
          text1: "#3b5162",
          text2: "#889898",
        },
      },
      boxShadow: {
        primary: "0px 0px 16px rgba(234, 124, 105, 0.32)",
        glow: "0px 8px 24px rgba(234, 124, 105, 0.32)",
        "inverse-top": "4px 4px 0 #FFF5EF",
        "inverse-top-dark": "4px 4px 0 #252836",
        "inverse-bottom": "4px -4px 0 #FFF5EF",
        "inverse-bottom-dark": "4px -4px 0 #252836",
      },
      backgroundImage: {
        lightPattern: "url('../src/assets/images/lightPattern.svg')",
        darkPattern: "url('../src/assets/images/darkPattern.svg')",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
