import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}", // <--- Essential for App Router
  ],
  theme: {
    extend: {
      // We add your custom colors here so you don't lose default colors (amber, red, etc)
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        // Adding your specific hex as a named utility
        'dark-grey': '#2D2D2D',
        'light-grey': '#F2F2F2',
      },
      fontFamily: {
        raleway: ["var(--font-raleway)", "sans-serif"],
        // Add your custom font here if needed
        'projekt': ['Projekt Blackbird', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;