# Frontend — context pro Claude

Pracuješ v `/frontend`. Stack: **Vite + React 18 + TypeScript**.

## Než začneš

Přečti si sdílený context:

- @../context/PROJECT.md       — co Bagrista dělá
- @../context/ARCHITECTURE.md  — co umí backend (API kontrakt!), porty, proxy
- @../context/CONVENTIONS.md   — kódový styl, commit styl
- @../context/TASKS.md         — co dělá kolega (backend)

## Příkazy

| Co                       | Příkaz             |
|--------------------------|--------------------|
| Dev server (HMR)         | `npm run dev`      |
| Produkční build          | `npm run build`    |
| Preview produkčního build| `npm run preview`  |
| Type check (no emit)     | `npm run typecheck`|

Dev server poslouchá na **`http://localhost:5173`**.
Vite proxy: vše co začíná na `/api/*` → `http://localhost:3001` (backend musí běžet samostatně).

## Konvence specifické pro FE

- Komponenty v `src/components/`, **PascalCase** soubory (`UserCard.tsx`).
- Stránky / routes (až přibydou) v `src/pages/`.
- API volání přes `fetch('/api/...')` — díky proxy nemusíme řešit CORS.
- Žádný state management library zatím. `useState` / `useReducer` / `useContext` stačí.
- Žádný CSS framework zatím. Když přibyde, zapiš to do `context/DECISIONS.md`.

## Co aktualizovat, když přidáš feature

- Pokud feature potřebuje nový BE endpoint, který ještě neexistuje, **napiš to do `context/TASKS.md`** sekce "Společné", aby to backend Claude/Honza viděl.
- Když konzumuješ existující endpoint, ověř proti `context/ARCHITECTURE.md` (sekce API kontrakt), že se tvoje implementace shoduje s tím, co BE skutečně vrací.

## Kdy se ptát uživatele

- Volba UI knihovny / CSS frameworku (Tailwind? CSS modules? něco jiného?).
- Routing — jestli vůbec a co. (React Router? Tanstack Router?)
- Velké refactory komponent.
