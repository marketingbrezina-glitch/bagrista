# Backend — context pro Claude

Pracuješ v `/backend`. Stack: **Node.js 22 + Fastify + TypeScript**.

## Než začneš

Přečti si sdílený context:

- @../context/PROJECT.md       — co Bagrista dělá
- @../context/ARCHITECTURE.md  — porty, API kontrakt, jak to drží pohromadě
- @../context/CONVENTIONS.md   — kódový styl, commit styl
- @../context/TASKS.md         — co dělá kolega (frontend) — abys mu nepodřezával API pod nohama

## Příkazy

| Co                     | Příkaz             |
|------------------------|--------------------|
| Dev server (HMR)       | `npm run dev`      |
| Build do `dist/`       | `npm run build`    |
| Produkční start        | `npm start`        |
| Type check (no emit)   | `npm run typecheck`|

Dev server poslouchá na **`http://localhost:3001`**.

## Konvence specifické pro BE

- Routes v `src/routes/` — jeden soubor = jedna doména. Příklad: `src/routes/users.ts` exportuje plugin pro všechny `/api/users/*`.
- Žádný globální state. Vše přes Fastify decorators / pluginy.
- ENV variables se čtou z `process.env`, **validuj je při startu** — když chybí, server padne hned, ne v půlce běhu.
- Schema validation u všech endpointů (Fastify má `schema` v route options) — chrání nás i frontend.

## Co aktualizovat, když přidáš endpoint

1. **`context/ARCHITECTURE.md`** — sekce "API kontrakt", přidej řádek do tabulky.
2. Pokud endpoint mění existující kontrakt, řekni kolegovi (frontend) — nejen do TASKS.md.

## Kdy se ptát uživatele

- Volba databáze / persistence vrstvy.
- Auth / autorizace — to ovlivní frontend, neřeš sám.
- Velké refactory napříč routes.
