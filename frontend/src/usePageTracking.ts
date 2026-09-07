import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageview } from './analytics';

/** Pošle GA `page_view` při každé změně routy. Hash (sdílený výsledek) se do URL cesty nezapisuje. */
export function usePageTracking(): void {
  const { pathname, search } = useLocation();

  useEffect(() => {
    trackPageview(pathname + search);
  }, [pathname, search]);
}
