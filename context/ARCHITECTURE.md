# Architektura

## Stack

- **Backend**: Node.js 22 + Fastify + TypeScript
- **Frontend**: Vite + React 18 + TypeScript
- **Komunikace**: REST/JSON přes HTTP, frontend volá `/api/*`

## Porty (lokální dev)

| Komponenta | Port  | URL                        |
|------------|-------|----------------------------|
| Backend    | 3001  | http://localhost:3001      |
| Frontend   | 5173  | http://localhost:5173      |

Frontend má v `vite.config.ts` proxy: `^/api` → `http://localhost:3001`. Díky tomu volá frontend `fetch('/api/health')` bez CORS hraček.

## Struktura repa

```
backend/    — REST API, vlastní package.json, vlastní node_modules
frontend/   — SPA, vlastní package.json, vlastní node_modules
context/    — sdílený kontext (čte to backend i frontend Claude)
```

Žádné npm workspaces, žádné sdílené dependencies. Pokud někdy budeme chtít sdílet TypeScript typy mezi BE a FE, založíme `/shared` a domluvíme se na importu.

## Jak to běhá lokálně

Dva terminály, dva procesy:

```bash
# t1
cd backend && npm install && npm run dev    # :3001

# t2
cd frontend && npm install && npm run dev   # :5173, proxy → :3001
```

## API kontrakt

> Když přidáš endpoint, zapiš ho sem **dřív, než ho začneš implementovat**. Druhý vlastník (Quiz nebo Lore) podle toho ví, na co se může napojit. Pokud měníš existující endpoint, dohodněte se mimo Claude.

### Hotové

| Method | Path           | Body         | Response                  | Vlastník | Stav   |
|--------|----------------|--------------|---------------------------|----------|--------|
| GET    | `/api/health`  | —            | `{ status: "ok" }`        | —        | hotovo |

### Plánované — Quiz (vlastník: Honza)

| Method | Path                  | Body                                  | Response                                                                | Stav    |
|--------|-----------------------|---------------------------------------|-------------------------------------------------------------------------|---------|
| GET    | `/api/quiz/questions` | —                                     | `{ questions: Question[] }` — pořadí, znění, varianty odpovědí          | návrh   |
| POST   | `/api/quiz/score`     | `{ answers: Answer[] }`               | `{ levelId: 1..8, levelSlug: string, summary: string }`                 | návrh   |
| GET    | `/api/quiz/result/:id`| —                                     | `{ levelId, levelSlug, createdAt }` — pro sdílení (pokud zvolíme server-side ID místo URL hashe) | návrh — záleží na rozhodnutí o sdílení |

Datové typy (předběžně, dořeší Honza při implementaci):

```ts
type Question = {
  id: string;
  text: string;
  options: { id: string; text: string; weights: Partial<Record<LevelId, number>> }[];
};

type Answer = { questionId: string; optionId: string };
type LevelId = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
```

### Plánované — Lore (vlastník: kolega)

| Method | Path                       | Body | Response                                                  | Stav  |
|--------|----------------------------|------|-----------------------------------------------------------|-------|
| GET    | `/api/lore/levels`         | —    | `{ levels: LevelSummary[] }` — id, slug, nadpis, perex     | návrh |
| GET    | `/api/lore/levels/:slug`   | —    | `{ level: LevelDetail }` — plný obsah stupně z knowledge base | návrh |
| GET    | `/api/lore/glossary`       | —    | `{ entries: GlossaryEntry[] }` — Komatsu, pozdravy, rčení  | návrh |
| GET    | `/api/lore/prayers`        | —    | `{ prayers: Prayer[] }` — modlitby + Credo bagristae       | návrh |

> **Alternativa:** Lore obsah může být statický JSON v repu, který si FE načítá rovnou (bez BE endpointu). Rozhoduje kolega.

### Sdílená rozhraní mezi Quiz a Lore

Po vyhodnocení kvízu chce Quiz zobrazit popis stupně. Možnosti:

1. **BE volá Lore data interně** — `POST /api/quiz/score` v response vrátí už i `summary` z Lore.
2. **FE skládá** — Quiz vrátí jen `levelId`, FE pak zavolá `GET /api/lore/levels/:slug`.

Rozhodnutí: **až Honza dojde k výsledkové stránce, dohodneme se s kolegou** a zapíšeme do `DECISIONS.md`.

## Datová vrstva

V MVP **bez DB**. Quiz scoring je čistá funkce, lore obsah je statický (JSON nebo MD v repu). Jediné, co by mohlo chtít persistence, je sdílení výsledků — to lze obejít serializací do URL hashe (`/result#<base64>`).

Až by DB byla potřeba (statistika, ukládání výsledků, admin), pravděpodobně SQLite + Drizzle/Prisma. Rozhodne se ad hoc.

## Auth

Zatím není a v MVP nebude. Web je veřejný, anonymní.
