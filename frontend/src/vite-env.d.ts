/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** GA4 Measurement ID (G-XXXXXXXXXX). Když chybí, analytics je vypnutý. */
  readonly VITE_GA_MEASUREMENT_ID?: string;
  /** Adresa formuláře u rozesílací služby. Když chybí, `/bratrstvo` nesbírá. */
  readonly VITE_NEWSLETTER_ACTION?: string;
}
