import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { fileURLToPath } from 'url'
import { geminiApiPlugin } from './api/gemini/vitePlugin'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

export default defineConfig({
  plugins: [react(), geminiApiPlugin()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/firebase')) {
            return 'firebase'
          }

          if (id.includes('node_modules/i18next') || id.includes('node_modules/react-i18next')) {
            return 'i18n'
          }

          if (id.includes('node_modules/react-router') || id.includes('node_modules/@remix-run/router')) {
            return 'router'
          }

          if (
            id.includes('node_modules/@reduxjs/toolkit') ||
            id.includes('node_modules/react-redux') ||
            id.includes('node_modules/redux')
          ) {
            return 'redux'
          }

          if (id.includes('node_modules/swiper')) {
            return 'swiper'
          }

          if (id.includes('node_modules/antd') || id.includes('node_modules/@ant-design')) {
            return 'antd-vendor'
          }
        },
      },
    },
  },
})
