import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        fresh: {
          cloud: "hsl(var(--fresh-cloud) / <alpha-value>)",
          mist: "hsl(var(--fresh-mist) / <alpha-value>)",
          blue: "hsl(var(--fresh-blue) / <alpha-value>)",
          aqua: "hsl(var(--fresh-aqua) / <alpha-value>)",
          leaf: "hsl(var(--fresh-leaf) / <alpha-value>)",
          mint: "hsl(var(--fresh-mint) / <alpha-value>)",
          ink: "hsl(var(--fresh-ink) / <alpha-value>)",
        },
      },
      boxShadow: {
        fresh: "0 28px 90px -42px hsl(var(--fresh-blue) / 0.58)",
        glow: "0 0 44px hsl(var(--fresh-aqua) / 0.34)",
      },
      fontFamily: {
        sans: ["ui-sans-serif", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
