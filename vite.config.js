import { defineConfig } from "vite";
import VitePluginHtmlEnv from "vite-plugin-html-env";

export default defineConfig({
  build: {
    sourcemap: true,
  },
  plugins: [VitePluginHtmlEnv(), VitePluginHtmlEnv({ compiler: true })],
});
