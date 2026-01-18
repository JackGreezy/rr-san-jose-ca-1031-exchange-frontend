/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#1B2444",
          dark: "#0F1629",
          light: "#2A3558",
        },
        lime: {
          DEFAULT: "#9ACD32",
          light: "#B8E04E",
          dark: "#7CB82F",
        },
        cream: "#FAFAF8",
      },
      fontFamily: {
        sans: ["var(--font-source-sans)", "Source Sans 3", "system-ui", "sans-serif"],
        heading: ["var(--font-playfair)", "Playfair Display", "Georgia", "serif"],
      },
      letterSpacing: {
        "ultra-wide": "0.25em",
        "super-wide": "0.15em",
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.25rem",
        "3xl": "1.5rem",
      },
      boxShadow: {
        elegant: "0 4px 20px -2px rgba(27, 36, 68, 0.12)",
        "elegant-lg": "0 8px 30px -4px rgba(27, 36, 68, 0.18)",
      },
    },
  },
  plugins: [],
};
