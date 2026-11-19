import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Hash-router builds use relative paths so they work from a sub-folder
// (e.g. https://<username>.github.io/<repo>/). See README → Deploy.
export default defineConfig({
  plugins: [react()],
  base: process.env.VITE_HASH_ROUTER === '1' ? './' : '/',
})
