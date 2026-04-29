# Bagrista — context pro Claude Code

Experimentální projekt vyvíjený dvěma lidmi:
- **Honza** = Quiz feature (`frontend/src/quiz/*`)
- **Kolega** = Lore obsah + design (`content/lore/*`, `design/*`, sdílené FE)

Stack: **Vite + React + TypeScript** (jeden static FE). Žádný backend — kvíz scoring i otázky běží client-side, lore obsah se bundluje z `content/lore/*.md` přes Vite glob. Deploy: **Vercel** (GitHub-connected, auto-deploy z `main`).

## Než cokoli uděláš, přečti si

- @context/PROJECT.md       — co projekt dělá a proč
- @context/ARCHITECTURE.md  — jak je to postavené (jeden FE, statický deploy)
- @context/CONVENTIONS.md   — coding style, commit style, naming
- @context/WORKFLOW.md      — git workflow (rebase před pushem!)
- @context/TASKS.md         — co se zrovna dělá (KDO na ČEM)
- @context/DECISIONS.md     — proč jsou věci udělané, jak jsou

Když pracuješ ve `/frontend`, řiď se navíc `frontend/CLAUDE.md`.

## Důležité provozní pravidla

1. **`main` je svatá, ale pushujeme do ní přímo** (varianta B). Před každým `git push` udělej `git pull --rebase`. Bez výjimek. Push do `main` = auto-deploy na Vercel.
2. **Když přidáš netriviální technické rozhodnutí** (volba knihovny, změna architektury, workaround), zapiš ho do `context/DECISIONS.md` (formát: datum + co + proč).
3. **Když začneš/dokončíš významnou věc**, aktualizuj `context/TASKS.md`.
4. **Necommitovat `.env`** — jen `.env.example`. Citlivá data nikdy do repa.

## Kdy se ptát uživatele

- Velké refactory napříč feature ownership (Quiz × Lore).
- Když měníš věc zapsanou v `DECISIONS.md` — to není chyba dělat, ale zapiš důvod.
