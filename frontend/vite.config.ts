import { defineConfig } from "vite";

export default defineConfig({
  base: "./",
  build: {
    outDir: "../web/dist",
    emptyOutDir: true,
  },
});
