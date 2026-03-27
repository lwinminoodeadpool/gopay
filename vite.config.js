import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [
      tailwindcss(),
      react()
    ],
    base: './',
    server: {
      proxy: {
        '/kbzpay': {
          target: env.VITE_API_URL || 'https://uat-miniapp.kbzpay.com',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/kbzpay/, ''),
          secure: false,
        },
      },
    },
  }
})
