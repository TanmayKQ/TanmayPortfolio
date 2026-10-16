import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        base: {
          dark: "#08090d",
          card: "#0f1118",
          subtle: "#141722",
          border: "#1b2030",
          borderLight: "#262c42",
        },
        cyan: {
          neon: "#00f0ff",
          dim: "rgba(0, 240, 255, 0.12)",
          glow: "rgba(0, 240, 255, 0.35)",
        },
        emerald: {
          neon: "#10b981",
          dim: "rgba(16, 185, 129, 0.12)",
        },
        amber: {
          neon: "#f59e0b",
          dim: "rgba(245, 158, 11, 0.12)",
        },
      },
      fontFamily: {
        display: ["var(--font-space)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "scanline": "scanline 8s linear infinite",
      },
      keyframes: {
        scanline: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(1000%)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
