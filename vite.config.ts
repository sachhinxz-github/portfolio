import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // Relative base: the same build works at a domain root (Netlify) or under a
  // sub-path (GitHub Pages) without any config change.
  base: './',
  plugins: [react(), tailwindcss()],
  optimizeDeps: { entries: ['index.html'] },
})
