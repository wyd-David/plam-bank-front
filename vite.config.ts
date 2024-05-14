import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueDevTools from 'vite-plugin-vue-devtools'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), VueDevTools()],
  resolve: {
    alias: {
      // @ts-ignore
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    proxy: {
      '/palm': {
        target: 'http://47.96.145.135:8080/',
        changeOrigin: true
      }
    }
  }
})
