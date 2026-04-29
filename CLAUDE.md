# Bagrista — context pro Claude Code

Tohle je experimentální projekt vyvíjený dvěma lidmi paralelně:
- **Honza** = backend (`/backend`)
- **Kolega** = frontend (`/frontend`)

## Než cokoli uděláš, přečti si

- @context/PROJECT.md       — co projekt dělá a proč
- @context/ARCHITECTURE.md  — jak BE a FE spolu komunikují (porty, proxy, kontrakt)
- @context/CONVENTIONS.md   — coding style, commit style, naming
- @context/WORKFLOW.md      — git workflow (rebase před pushem!)
- @context/TASKS.md         — co se zrovna dělá (KDO na ČEM) — abychom si nešlapali na nohy
- @context/DECISIONS.md     — proč jsou věci udělané, jak jsou

Když pracuješ v `/backend`, řiď se navíc `backend/CLAUDE.md`.
Když pracuješ v `/frontend`, řiď se navíc `frontend/CLAUDE.md`.

## Důležité provozní pravidla

1. **`main` je svatá, ale pushujeme do ní přímo** (varianta B). Před každým `git push` udělej `git pull --rebase`. Bez výjimek.
2. **Když přidáš netriviální technické rozhodnutí** (volba knihovny, změna architektury, workaround), zapiš ho do `context/DECISIONS.md` (formát: datum + co + proč).
3. **Když začneš/dokončíš významnou věc**, aktualizuj `context/TASKS.md`. Kolegův Claude to čte — je to jediný způsob, jak ví, na čem makáš.
4. **Necommitovat `.env`** — jen `.env.example`. Citlivá data nikdy do repa.
5. **Nedělat velké změny napříč BE i FE v jednom commitu.** Odděluj — usnadňuje to rebase.

## Kdy se ptát uživatele

- Když by změna zasáhla druhou stranu (BE volání FE nebo naopak) — domluvte se mimo Claude.
- Když měníš věc zapsanou v `DECISIONS.md` — to není chyba dělat, ale zapiš důvod.
