import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@inopsio/ui': path.resolve(__dirname, '../../packages/ui/src'),
      '@inopsio/auth': path.resolve(__dirname, '../../packages/auth/src'),
      '@inopsio/api': path.resolve(__dirname, '../../packages/api/src'),
      '@inopsio/utils': path.resolve(__dirname, '../../packages/utils/src'),
    },
  },
  server: {
    port: 3003,
    host: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
  define: {
    'process.env': process.env,
  },
})
