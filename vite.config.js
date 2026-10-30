import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import seo from './vite-plugins/seo.js'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), seo()],
  base: '/',
  build: {
    // The lazy HeroCanvas chunk (three.js) is ~900 kB but never blocks first paint
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        // three.js is deliberately NOT listed here: a manual chunk would be
        // preloaded with the entry, defeating the lazy-loaded HeroCanvas.
        manualChunks: {
          'gsap-vendor': ['gsap'],
        },
      },
    },
  },
})
