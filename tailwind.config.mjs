/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        background: "#121212",
        backgroundAccent: "#242424",
        lucide: "#F67373"
      },
    },
    fontFamily: {
      "sans": ["ui-sans-serif", "system-ui", "sans-serif", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"],
      "roboto": "Roboto"
    }
  },
  plugins: [],
};
