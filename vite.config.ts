import fs from "fs"
import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

const sss1FirmwareFilename = "sss1_v2_firmware.uf2"
const hasSss1Firmware = fs.existsSync(
  path.resolve(__dirname, "public", sss1FirmwareFilename),
)

// https://vite.dev/config/
export default defineConfig({
  // For user/org GitHub Pages (username.github.io), base is "/"
  base: "/",
  define: {
    __SSS1_FIRMWARE_AVAILABLE__: JSON.stringify(hasSss1Firmware),
  },
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
