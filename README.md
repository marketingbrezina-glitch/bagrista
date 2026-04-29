# Bagrista

Satirický web na osobnostní profilování bagristů. Live: **https://bagrista.vercel.app**.

> **TL;DR pro Claude / Cursor / Copilot:** přečti si nejdřív `CLAUDE.md` v rootu a všechno v `context/`. To je single source of truth.

## Stack

Jeden statický Vite + React + TypeScript SPA, deploy na Vercel z `main` (Project Root = `frontend`). Žádný backend, žádná DB. Lore obsah se bundluje z `content/lore/*.md` přes Vite glob; quiz scoring i otázky běží 100 % client-side.

## Prerequisites

- Node.js 22 (`nvm use` načte verzi z `.nvmrc`)
- Git

## Spuštění lokálně

```bash
cd frontend
npm install
npm run dev   # :5173
```

Otevři `http://localhost:5173`.

## Struktura

```
frontend/        Vite SPA (jediná build artefakta)
content/lore/    Markdown obsah (bundluje se do FE za build time)
context/         Sdílený context — čti dřív, než cokoli změníš
design/          Statický designový mockup (reference)
```

## Workflow (varianta B — direct push)

Žádné PR, pushujeme přímo do `main`. Jediné pravidlo: **vždy `git pull --rebase` před `git push`**. Push do `main` = auto-deploy na Vercel.

```bash
git pull --rebase
git add <konkrétní soubory>
git commit -m "scope: stručný popis"
git pull --rebase
git push
```

Detaily v `context/WORKFLOW.md`.
