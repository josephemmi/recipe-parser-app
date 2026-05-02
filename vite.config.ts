import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/api/anthropic": {
        target: "https://api.anthropic.com",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api\/anthropic/, ""),
        configure: (proxy, _options) => {
          proxy.on('proxyReq', (proxyReq, _req, _res) => {
            // Remove browser headers that trigger CORS detection
            proxyReq.removeHeader('origin');
            proxyReq.removeHeader('referer');
          });
        }
      },
    },
  }
})