interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  readonly VITE_VWORLD_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
