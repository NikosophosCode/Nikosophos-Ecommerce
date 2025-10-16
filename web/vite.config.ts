import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'query-vendor': ['@tanstack/react-query'],
          'form-vendor': ['react-hook-form', '@hookform/resolvers', 'zod'],
          'ui-vendor': ['@headlessui/react', 'sonner'],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
    sourcemap: false, // Desactivar en producción para reducir tamaño
  },
  server: {
    host: true, // Escucha en todas las interfaces de red (0.0.0.0)
    port: 5174,
    strictPort: false, // Busca otro puerto si 5174 está ocupado
  },
  preview: {
    port: 4173,
  },
})
