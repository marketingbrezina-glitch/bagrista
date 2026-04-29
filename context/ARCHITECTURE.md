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

> Když přidáš endpoint, zapiš ho sem. Frontend Claude tohle čte, aby věděl, co existuje.

| Method | Path           | Body         | Response                  | Stav   |
|--------|----------------|--------------|---------------------------|--------|
| GET    | `/api/health`  | —            | `{ status: "ok" }`        | hotovo |

TODO: doplňte další endpointy s typy request/response, jakmile vzniknou.

## Datová vrstva

TODO: až přibyde DB / persistence, popište zde (jaká DB, kde, jak se připojuje, kdo migruje schéma).

## Auth

TODO: zatím není. Když přidáme, popíšeme zde (token formát, kde se ukládá, expirace).
