import { resolve } from "path"
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import dts from "vite-plugin-dts"

// ---------------------------------------------------------------------------
// Library build config — used by `npm run build`
// Kept separate from Storybook's vite config to avoid interference.
// ---------------------------------------------------------------------------

export default defineConfig({
  plugins: [
    react(),
    dts({
      include: ["design-system"],
      outDir: "dist",
      tsconfigPath: "./tsconfig.build.json",
      // Roll all declarations into a single index.d.ts
      rollupTypes: true,
    }),
  ],

  // Don't copy public/ assets into the library dist
  publicDir: false,

  build: {
    lib: {
      entry: resolve(__dirname, "design-system/index.ts"),
      name: "AxmedDesignSystem",
      formats: ["es", "cjs"],
      fileName: (format) => `index.${format === "es" ? "js" : "cjs"}`,
    },
    rollupOptions: {
      // Peer deps — consumer must provide these
      external: [
        "react",
        "react/jsx-runtime",
        "react-dom",
        "antd",
        "@ant-design/icons",
      ],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          antd: "antd",
          "@ant-design/icons": "AntdIcons",
        },
        // Keep CSS in a single file: dist/style.css
        assetFileNames: "style[extname]",
      },
    },
    // Sourcemaps for easier debugging in consuming apps
    sourcemap: true,
  },

  css: {
    preprocessorOptions: {
      scss: {
        api: "modern-compiler",
      },
    },
  },

  resolve: {
    alias: {
      "@": resolve(__dirname, "."),
    },
  },
})
