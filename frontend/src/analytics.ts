/**
 * Google Analytics 4 přes gtag.js.
 *
 * Measurement ID: `VITE_GA_MEASUREMENT_ID` má přednost; když chybí, produkční
 * build použije `PRODUCTION_MEASUREMENT_ID`. V dev módu (`npm run dev`) bez env var
 * jsou všechny funkce no-op — lokální provoz nešpiní statistiky.
 *
 * Pageviews posíláme ručně z `usePageTracking` (SPA routing), proto
 * `send_page_view: false` v configu — jinak by GA počítalo jen první load.
 */

type GtagCommand = 'js' | 'config' | 'event';
type GtagParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (command: GtagCommand, ...args: unknown[]) => void;
  }
}

const PRODUCTION_MEASUREMENT_ID = 'G-TST9NBRYZL';

const MEASUREMENT_ID: string | undefined =
  import.meta.env.VITE_GA_MEASUREMENT_ID ??
  (import.meta.env.PROD ? PRODUCTION_MEASUREMENT_ID : undefined);

export const analyticsEnabled = typeof MEASUREMENT_ID === 'string' && MEASUREMENT_ID.length > 0;

export function initAnalytics(): void {
  if (!analyticsEnabled || window.gtag) return;

  window.dataLayer = window.dataLayer ?? [];
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer?.push(args);
  };
  window.gtag('js', new Date());
  window.gtag('config', MEASUREMENT_ID, { send_page_view: false });

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(MEASUREMENT_ID ?? '')}`;
  document.head.appendChild(script);
}

export function trackPageview(path: string): void {
  if (!analyticsEnabled || !window.gtag) return;
  window.gtag('event', 'page_view', {
    page_path: path,
    page_location: window.location.href,
    page_title: document.title,
  });
}

export function trackEvent(name: string, params: GtagParams = {}): void {
  if (!analyticsEnabled || !window.gtag) return;
  window.gtag('event', name, params);
}
