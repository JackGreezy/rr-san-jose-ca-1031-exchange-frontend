const tokens = require("./styles/tokens.cjs");
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: { extend: {
    colors: {
      base: tokens.paper, text: tokens.ink, heading: tokens.heading,
      primary: tokens.primaryBg, primaryfg: tokens.primaryFg,
      secondary: tokens.secondaryBg, secondaryfg: tokens.secondaryFg,
      outline: tokens.outline, panel: tokens.panel
    },
    borderRadius: { xl: "1rem", "2xl": "1.25rem" }
  }},
  plugins: []
};