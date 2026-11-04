import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import seo from './vite-plugins/seo.js'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    seo(),
    // Installable PWA + offline support. Emergency kill switch: set
    // `selfDestroying: true`, deploy, and every visitor's service worker unregisters itself.
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'script-defer',
      includeAssets: ['favicon.svg', 'apple-touch-icon.png'],
      manifest: {
        id: '/',
        name: 'Bhavesh Chauhan | Senior Software Engineer',
        short_name: 'Bhavesh C.',
        description:
          'Senior Software Engineer available for freelance and contract work: Node.js/NestJS APIs, AWS, microservices and AI integrations.',
        start_url: '/',
        scope: '/',
        display: 'standalone',
        background_color: '#050816',
        theme_color: '#050816',
        categories: ['business', 'productivity'],
        icons: [
          { src: '/pwa-192x192.png', sizes: '192x192', type: 'image/png' },
          { src: '/pwa-512x512.png', sizes: '512x512', type: 'image/png' },
          { src: '/pwa-maskable-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
        shortcuts: [
          { name: 'Hire me', url: '/#contact', icons: [{ src: '/pwa-192x192.png', sizes: '192x192' }] },
          { name: 'Resume', url: '/Bhavesh_Chauhan_Resume_2026.pdf', icons: [{ src: '/pwa-192x192.png', sizes: '192x192' }] },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,jpg,pdf}'],
        // Only crawlers/link unfurlers fetch the share card, so don't make visitors download it
        globIgnores: ['social-preview.jpg'],
        // Single page: "/" is served from the precache. No SPA fallback, so
        // /llms.txt, /sitemap.xml, /robots.txt are never answered with index.html.
        navigateFallback: null,
        cleanupOutdatedCaches: true,
        clientsClaim: true,
        skipWaiting: true,
        runtimeCaching: [
          {
            urlPattern: ({ url }) => url.origin === 'https://fonts.googleapis.com',
            handler: 'StaleWhileRevalidate',
            options: { cacheName: 'google-fonts-stylesheets' },
          },
          {
            urlPattern: ({ url }) => url.origin === 'https://fonts.gstatic.com',
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-webfonts',
              cacheableResponse: { statuses: [0, 200] },
              expiration: { maxEntries: 20, maxAgeSeconds: 60 * 60 * 24 * 365 },
            },
          },
        ],
      },
    }),
  ],
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
