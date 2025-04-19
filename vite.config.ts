import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'robots.txt', 'apple-touch-icon.png'],
      manifest: {
        name: 'HottoSpot',
        short_name: 'HottoSpot',
        description: 'バズっている場所を探そう！',
        theme_color: '#F74F85',
        display: 'standalone',
        icons: [
          {
            src: '/img/icon.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/img/icon.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: ({ request }) => request.destination === 'image',
            handler: 'CacheFirst',
            options: {
              cacheName: 'images-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 30, // 30日
              },
            },
          },
        ],
      },
    }),
  ],
  server: {
    host: true,
  },
})

