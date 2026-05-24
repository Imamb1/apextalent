import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink:   "#090909",
        paper: "#F2F0EC",
        acid:  "#E8FF00",
      },
      fontFamily: {
        display: ["'Unbounded'", "sans-serif"],
        serif:   ["'Instrument Serif'", "serif"],
        sans:    ["'Outfit'", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
