/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_SUPABASE_PUBLIC_ANON_KEYTE: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
