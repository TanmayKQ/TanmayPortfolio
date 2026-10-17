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
          dark: "#090a0f",
          card: "#11141e",
          subtle: "#161a27",
          border: "#1e2436",
          borderLight: "#2b334c",
        },
        // Restrained, engineering-focused violet/blue primary accent
        accent: {
          DEFAULT: "#6366f1",
          light: "#818cf8",
          dim: "rgba(99, 102, 241, 0.12)",
          glow: "rgba(99, 102, 241, 0.25)",
          border: "rgba(99, 102, 241, 0.35)",
        },
        // Semantic statuses strictly reserved for state feedback
        emerald: {
          neon: "#10b981",
          dim: "rgba(16, 185, 129, 0.12)",
        },
        amber: {
          neon: "#f59e0b",
          dim: "rgba(245, 158, 11, 0.12)",
        },
        rose: {
          neon: "#f43f5e",
          dim: "rgba(244, 63, 94, 0.12)",
        },
        // Compatibility alias mapping cyan to our refined accent tokens
        cyan: {
          neon: "#818cf8",
          dim: "rgba(99, 102, 241, 0.12)",
          glow: "rgba(99, 102, 241, 0.25)",
        },
      },
      fontFamily: {
        display: ["var(--font-space)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
  plugins: [],
};

export default config;
