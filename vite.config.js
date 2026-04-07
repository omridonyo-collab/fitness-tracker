import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  // On GitLab Pages the site lives at /repo-name/ — picked up automatically from CI
  base: process.env.CI ? `/${process.env.CI_PROJECT_NAME}/` : '/',
})
