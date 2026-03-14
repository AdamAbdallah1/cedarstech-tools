import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"

export default defineConfig({
  base: '/tools/',
  plugins: [
    react(),
    tailwindcss()
  ],
  build: {
    outDir: 'dist/tools',
    emptyOutDir: true
  }
})