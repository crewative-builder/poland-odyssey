import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // 🚨 CRITICAL for GitHub Pages deployment
  base: "/poland-odyssey/",
});
