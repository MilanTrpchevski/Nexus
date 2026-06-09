import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const repoName = 'Nexus'

export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? `/${repoName}/` : '/',
  plugins: [react()],
}))
