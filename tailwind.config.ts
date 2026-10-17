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
          dark: "var(--bg-primary)",
          card: "var(--bg-card)",
          subtle: "var(--bg-subtle)",
          border: "var(--border-color)",
          borderLight: "var(--border-light)",
        },
        // Restrained, engineering-focused violet/blue primary accent
        accent: {
          DEFAULT: "var(--accent)",
          light: "var(--accent-light)",
          dim: "var(--accent-dim)",
          glow: "var(--accent-glow)",
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
        // Compatibility alias mapping cyan to accent tokens
        cyan: {
          neon: "var(--accent-light)",
          dim: "var(--accent-dim)",
          glow: "var(--accent-glow)",
        },
      },
      fontFamily: {
        display: ["var(--font-space)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
        sans: [
          "var(--font-sans)",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
  plugins: [],
};

export default config;
