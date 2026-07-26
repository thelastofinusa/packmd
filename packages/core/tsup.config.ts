import { defineConfig } from "tsup"

export default defineConfig({
  // The entry point for the entire package
  entry: ["src/index.ts"],
  // Output both CommonJS (for Node CLI) and ES Modules (for React Web)
  format: ["cjs", "esm"],
  // Automatically generate TypeScript declarations (.d.ts)
  dts: true,
  // Clean the dist folder before every build
  clean: true,
  // Generate sourcemaps for easier debugging in the consuming apps
  sourcemap: true,
  // Remove unused code
  treeshake: true,
  // Disable splitting since we only have one entry point
  splitting: false,
  // Keep false for dev; your web bundler (Vite/Next) or CLI bundler will handle minification
  minify: false,
})
