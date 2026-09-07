# Bagrista — Vyznání víry

Statický mockup webu. Otevři `bagrista-web.html` v prohlížeči — běží bez buildu (React 18 + Babel přes CDN).

Slouží jako **referenční designová vize** pro `frontend/` (Vite + React + TS). Postupně podle něj přepisujeme styling produkční aplikace.

## Co je uvnitř

- `bagrista-web.html` — entry point
- `styles.css` — designový systém (barvy, typografie, layout)
- `components.jsx` — sdílené komponenty (TopBar, Footer, …)
- `tweaks-panel.jsx` — živý panel pro ladění barev a fontů
- `design-canvas.jsx` — designové průzkumy
- `logo-explorations.html` — varianty loga „Jsem Bagrista"
- `page-*.jsx` — jednotlivé stránky (home, bridge, detail, sects, slovnik, modlitebnik, kviz, hubs)

## Vlastník

Hrabě (Lore feature). Vytvořeno v **Claude Design** (claude.ai/design) — ne v Artifacts.
Proto je to multi-file projekt s CDN závislostmi (React, Babel, Google Fonts), ne
jednosouborový self-contained artifact.

Důsledek: `bagrista-web.html` **nejde otevřít přes `file://`** (Babel nesmí načítat
lokální `.jsx` soubory). Spusť přes lokální HTTP server — např. VS Code Live Server.
