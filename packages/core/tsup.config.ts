import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    index: "src/index.ts",
    local: "src/local.ts",
  },
  format: ["esm"],
  target: "node18",
  clean: true,
  dts: true,
  splitting: false,
  sourcemap: true,
  minify: false,
});
