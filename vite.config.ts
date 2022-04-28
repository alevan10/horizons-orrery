import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"

const ROOT: string = path.resolve(__dirname, ".")
const SRC: string = path.resolve(ROOT, "src")

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 8080
  },
  resolve: {
    alias: {
      app: path.resolve(SRC, "app", "*"),
      "horizons-service": path.resolve(SRC, "horizons-service", "*"),
      models: path.resolve(SRC, "models", "*")
    }
  }
})