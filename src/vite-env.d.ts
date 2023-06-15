/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  readonly VITE_VWORLD_API_KEY: string;

  readonly VITE_WFS_URL: string;
  readonly VITE_WMS_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
