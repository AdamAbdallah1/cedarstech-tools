import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"
import { base } from "framer-motion/client"

export default defineConfig({
  base: '/tools/',
  plugins: [
    react(),
    tailwindcss()
  ]
})