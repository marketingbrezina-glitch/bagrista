# Aktuální práce

> Aktualizuj, když začneš nebo dokončíš něco netriviálního. Tvůj i kolegův Claude to čte — jinak nemá jak vědět, na čem makáš.
>
> **Pravidlo:** TASKS.md aktualizuj *před* začátkem práce, ne po. Co tu není, na to si nemůžeš dělat nárok.

## Honza — Quiz / Profilování

Vlastní: kvízová cesta, scoring algoritmus, výsledková stránka, sdílení výsledku.
Soubory: `frontend/src/quiz/*`, `backend/src/quiz/*`.

### Dělá teď
- (nic; clickable scaffold celého webu pushnut, čekám na review/přepracování kolegy)

### Brzy
- [ ] Domluva s kolegou: jak Quiz získá popis stupně z Lore (`ARCHITECTURE.md` → Sdílená rozhraní). Aktuálně FE má vlastní 2-věty popisy v `frontend/src/quiz/levels.ts`; ty by měly přejít na Lore endpoint.
- [ ] Doladit hranice stupňů 3↔4 a 6↔7 po prvních reálných průchodech (přidat 1–2 přechodové otázky nebo upravit prahy)
- [ ] Po kompletaci webu: re-skin výsledkové stránky podle finálních design tokens (žluť CAT, typografie)

## Kolega — Lore / Encyklopedie

Vlastní: 8 stupňů jako stránky, slovník, modlitebník, rituály, svátky, kasta nečistých.
Soubory: `frontend/src/lore/*`, `backend/src/lore/*`.

### Dělá teď
- [ ] TODO: první task (např. „Routing + layout pro `/lore/*`, první stránka stupně")

### Brzy
- [ ] Stránka pro každý ze 8 stupňů (CAT 301.5 → CAT D9), obsah z knowledge base
- [ ] Stránka „Slovník" (Komatsu, pozdravy, lidová rčení)
- [ ] Stránka „Modlitebník" (modlitby, požehnání, Credo bagristae)
- [ ] BE: `GET /api/lore/levels`, `GET /api/lore/levels/:id` — nebo všechno jako statický JSON v repu

## Společné / sdílené

> Měňte v páru, ne sólo. Když narazíte na nutnost změny, napište do TASKS.md a domluvte se.

- [x] 2026-04-29 — Scaffold homepage + navigace + Layout + Lore rendering (Honza, autorizováno když kolega nebyl u PC). `frontend/src/{Layout,HomePage}.tsx`, `frontend/src/lore/{LoreHomePage,LoreSectionPage,LoreDocPage,MarkdownView,loreContent}.tsx/ts`. **Kolega: máš volnou ruku tohle přepracovat — víc detailů v `DECISIONS.md` (2026-04-29 — FE scaffold).**
- [ ] Design tokens (barvy, typografie, mezery) — žluť Caterpillaru jako primární? (zatím šedá neutrál)

## Hotovo

- [x] 2026-04-29 — FE Quiz: kompletní user flow. Kvízová cesta (`/`, jedna otázka + progress + 4 volby + Zpět + klávesy 1–4), výsledková stránka (Bagrista úrovně N + model + epitet + 2-věty popis + profil 4 os v %), sdílení přes URL hash (`#v1.<19chars>`), stažení do PDF přes `window.print()`. Šedý neutrál, žádný router, žádný CSS framework — počká na společnou domluvu s kolegou (homepage/navigace/design tokens).
- [x] 2026-04-29 — BE Quiz: 19 otázek + scoring (4 osy + betrayal short-circuit), kalibrované prahy `[2,4,7,11,15,18]` a `BETRAYAL_THRESHOLD=14`, persona-průchody ověřeny pro stupně 1/2/5/7/8 přesně, 3↔4 a 6↔7 zůstávají subjektivní. Endpointy `GET /api/quiz/questions` + `POST /api/quiz/score` (vrací `axisMax` pro normalizaci os na FE) běží.
- [x] 2026-04-29 — Strategická dohoda: feature-split (Quiz/Lore) místo layer-split (BE/FE). Plán v `context/stav-me-nov-projekt-nastuduj-rosy-valley.md`, rozhodnutí zapsáno v `DECISIONS.md`.
- [x] 2026-04-29 — Doplněna doména: `bagriste_pravdy_knowledge_base_v2.md` (verze 1.0).
- [x] 2026-04-29 — Setup repa: monorepo struktura `/backend` + `/frontend`, context složka, scaffold Fastify + Vite/React.
