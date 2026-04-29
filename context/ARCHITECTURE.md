# Architektura

## Stack

- **Frontend** (jediná služba): Vite + React 18 + TypeScript, deploy na Vercel jako statický SPA
- **Lore obsah**: Markdown soubory v `content/lore/` — bundlují se do FE přes Vite glob (`import.meta.glob`)
- **Quiz**: scoring i otázky běží 100 % client-side v `frontend/src/quiz/{questions,scoring}.ts`
- **Žádný backend**, žádná DB, žádné API, žádné CORS

Důvod: pro „satira pro kámoše" scope je server zbytečný. Viz `DECISIONS.md` 2026-04-29 — Static-only deploy.

## Struktura repa

```
frontend/        — Vite SPA, jediná build artefakta
  src/
    quiz/        — Honza: types, questions, scoring, share, UI
    lore/        — Honza scaffold + kolegovy designové revize: rendering markdownu
    brand/       — Bucket SVG, Wordmark, Creed
    Layout.tsx   — TopBar + Footer (sdílené)
    HomePage.tsx — homepage
    App.tsx      — router
    styles.css   — design tokens, design system tříd
  vercel.json    — SPA rewrites pro Vercel
content/lore/    — Kolega: 70+ markdown souborů (levels, sects, holidays, …)
context/         — sdílený kontext (Claude i lidi)
design/          — Kolega: statický mockup (reference, ne build artefakt)
```

## Jak to běhá lokálně

```bash
cd frontend && npm install && npm run dev   # :5173
```

Žádný druhý proces. Vše je v jednom Vite dev serveru. Vite musí mít `server.fs.allow: ['..']` aby uměl číst nad `frontend/` (kvůli `content/lore/` glob importu).

## Deploy

Vercel, GitHub-connected:
- **Project Root:** `frontend`
- **Framework Preset:** Vite (auto-detect)
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- Push do `main` → auto-deploy.

`frontend/vercel.json` má SPA rewrite (`/(.*) → /index.html`), aby React Router fungoval na všech URL.

## Quiz datový model

Zdroj pravdy: `frontend/src/quiz/{types,questions,scoring}.ts`. Detail v `DECISIONS.md` (2026-04-29 — Quiz scoring + kalibrace).

```ts
type LevelId = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
type Axis = 'mleti' | 'narcis' | 'komatsu' | 'rituals';

type PublicQuestion = { id: string; text: string; options: { id: string; text: string }[] };
type Answer = { questionId: string; optionId: string };

type ScoreResult = {
  levelId: LevelId;
  levelSlug: string;
  axes: Record<Axis, number>;
  axisMax: Record<Axis, number>;
  betrayalScore: number;
};
```

Sdílení: URL hash `#v1.<19chars>` (po jednom písmenu a/b/c/d za otázku) — viz `frontend/src/quiz/share.ts`.

## Lore rendering

`frontend/src/lore/loreContent.ts`:
- `import.meta.glob('../../../content/lore/**/*.md', { query: '?raw', eager: true })` zabundluje všechny markdown soubory za build time
- Tiny inline frontmatter parser (key:value YAML)
- `SLUG_INDEX` mapuje `nazev` / slug / case-insensitive / long-form aliasy (`Stupeň N — MODEL · NAZEV`, `Fáze N — NAZEV`) na URL
- `processWikiLinks(body)` přepisuje `[[Title]]` / `[[Title|alias]]` / `[[Title#anchor]]` na bold markdown linky
- `MarkdownView` rendruje přes `react-markdown` + `remark-gfm`; `<a href="/lore/...">` se swappuje za React Router `<Link>` pro SPA navigaci

## Auth

Není a nebude. Web je veřejný, anonymní.
