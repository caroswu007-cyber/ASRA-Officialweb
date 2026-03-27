import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5174,
    // If 5174 is already in use, try the next free port instead of failing
    strictPort: false,
    host: true,
    open: true,
  },
  preview: {
    port: 4174,
    strictPort: false,
    host: true,
    open: true,
  },
})
