# Konvence

## TypeScript

- `strict: true` všude (BE i FE).
- Žádné `any`. Když to fakt jinak nejde, `unknown` + zúžení typu.
- Žádné default exporty (kromě FE root komponenty `App.tsx` a Vite entry pointů). Preferuj **named exports** — lépe se grepuje.

## Pojmenování souborů

- Soubory: **kebab-case** (`user-service.ts`, `api-client.ts`).
- React komponenty: **PascalCase** (`UserCard.tsx`, `Header.tsx`).
- Test soubory: `*.test.ts` vedle zdrojáku (až přidáme testy).

## Pojmenování v kódu

- Proměnné a funkce: `camelCase`
- Typy a interface: `PascalCase`
- Konstanty (top-level, neměnné): `SCREAMING_SNAKE_CASE`

## Commit messages

Formát:

```
<scope>: <co stručně>
```

`<scope>` je `backend`, `frontend`, `context`, `chore`, `docs` apod.

Příklady:

- `backend: add /api/users endpoint`
- `frontend: hook up user list to /api/users`
- `context: update API contract`
- `chore: bump fastify to 5.0`

Anglicky, imperativ, na jeden řádek (max ~72 znaků). Pokud potřebuješ víc, dej detaily do těla commitu.

## Co NEDĚLAT

- ❌ Necommitovat `.env`, jen `.env.example`.
- ❌ Nepushovat `node_modules`, `dist`, build artefakty (gitignore to řeší — kdyby se něco prokouslo, smazat a doplnit do .gitignore).
- ❌ Nedělat velké změny napříč BE i FE v jednom commitu — odděluj. Rebase je pak peklo.
- ❌ Necommitovat zakomentovaný kód. Když to nepotřebujeme, smažeme. Git si to pamatuje.
- ❌ Nepřidávat dependency, aniž bys napsal proč do `DECISIONS.md` (pokud to není trivka jako `dotenv`).

## Kódová estetika

- Krátké, samonosné funkce. Když má funkce > 50 řádků nebo > 3 úrovně vnoření, zvaž rozbití.
- Komentáře jen tam, kde **proč** není zřejmé z kódu. **Co** kód dělá by mělo říkat samo pojmenování.
- Žádné `console.log` v commitnutém kódu. (Logger později, zatím stačí console v dev.)
