import fs from "fs"
import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

const hasSss1Rp2350Firmware = fs.existsSync(
  path.resolve(__dirname, "public", "sss1_v2_firmware_RP2350.uf2"),
)
const hasSss1RpiFirmware = fs.existsSync(
  path.resolve(__dirname, "public", "sss1_v2_firmware_RPI.uf2"),
)

// https://vite.dev/config/
export default defineConfig({
  // For user/org GitHub Pages (username.github.io), base is "/"
  base: "/",
  define: {
    __SSS1_RP2350_FIRMWARE_AVAILABLE__: JSON.stringify(
      hasSss1Rp2350Firmware,
    ),
    __SSS1_RPI_FIRMWARE_AVAILABLE__: JSON.stringify(hasSss1RpiFirmware),
  },
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
