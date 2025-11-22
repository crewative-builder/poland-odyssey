// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  // CRITICAL: Enable dark mode based on the parent 'dark' class
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
