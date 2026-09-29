import { defineConfig } from "vite";
import { cpSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = fileURLToPath(new URL("../", import.meta.url));

export default defineConfig({
  base: "./",
  plugins: [{
    name: "copy-learning-pack",
    closeBundle() {
      const destination = resolve(projectRoot, "web/dist");
      for (const directory of ["materials", "templates", "samples"]) {
        cpSync(resolve(projectRoot, directory), resolve(destination, directory), {
          recursive: true,
          force: true,
        });
      }
    },
  }],
  build: {
    outDir: "../web/dist",
    emptyOutDir: true,
  },
});
