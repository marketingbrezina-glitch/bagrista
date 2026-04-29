# Bagrista

Testovací projekt vyvíjený paralelně dvěma lidmi — backend (Honza) + frontend (kolega).

> **TL;DR pro Claude / Cursor / Copilot:** přečti si nejdřív `CLAUDE.md` v rootu a všechno v `context/`. To je single source of truth.

## Prerequisites

- Node.js 22 (`nvm use` načte verzi z `.nvmrc`)
- Git

## Spuštění lokálně

Backend a frontend běží jako dva samostatné procesy ve dvou terminálech:

```bash
# Terminál 1 — backend (port 3001)
cd backend
cp .env.example .env
npm install
npm run dev

# Terminál 2 — frontend (port 5173)
cd frontend
cp .env.example .env
npm install
npm run dev
```

Otevři `http://localhost:5173` — frontend by měl zavolat backend přes proxy `/api/health` a zobrazit výsledek.

## Struktura

```
backend/    REST API (Fastify + TypeScript)
frontend/   SPA (Vite + React + TypeScript)
context/    Sdílený context — čti dřív, než cokoli změníš
```

## Workflow (varianta B — direct push)

Žádné PR, pushujeme přímo do `main`. Jediné pravidlo: **vždy `git pull --rebase` před `git push`**.

```bash
# Před prací
git pull --rebase

# Po práci
git add .
git commit -m "scope: stručný popis"
git pull --rebase
git push
```

Detaily v `context/WORKFLOW.md`.
