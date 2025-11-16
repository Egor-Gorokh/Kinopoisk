import { defineConfig } from 'vite'
// @ts-ignore - временно игнорируем ошибку TypeScript
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
  preview: {
    port: 3000,
  }
})