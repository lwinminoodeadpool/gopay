import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react()
  ],
  server: {
    proxy: {
      '/kbzpay': {
        target: 'https://uat-miniapp.kbzpay.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/kbzpay/, ''),
        secure: false,
      },
    },
  },
})
