/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        black: "#000000",
        deepBlack: "#0A0A0A",
        accentBlue: "#5F9FFF",
        accentPurple: "#A970FF",
        divider: "#1A1A1A"
      },
      boxShadow: {
        "glow-blue": "0 0 40px rgba(95, 159, 255, 0.35)",
        "glow-purple": "0 0 40px rgba(169, 112, 255, 0.35)"
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"]
      }
    }
  },
  plugins: []
};


