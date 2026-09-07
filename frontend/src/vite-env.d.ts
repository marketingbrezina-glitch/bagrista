/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** GA4 Measurement ID (G-XXXXXXXXXX). Když chybí, analytics je vypnutý. */
  readonly VITE_GA_MEASUREMENT_ID?: string;
}
