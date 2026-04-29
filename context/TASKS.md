# Aktuální práce

> Aktualizuj, když začneš nebo dokončíš něco netriviálního. Tvůj i kolegův Claude to čte — jinak nemá jak vědět, na čem makáš.
>
> **Pravidlo:** TASKS.md aktualizuj *před* začátkem práce, ne po. Co tu není, na to si nemůžeš dělat nárok.

## Honza — Quiz / Profilování

Vlastní: kvízová cesta, scoring algoritmus, výsledková stránka, sdílení výsledku.
Soubory: `frontend/src/quiz/*`, `backend/src/quiz/*`.

### Dělá teď
- [ ] FE: výsledková stránka (`ResultPage` + `AxisBar` + `levels.ts`). Po q19 zavolá `POST /api/quiz/score` a zobrazí stupeň 1–8 s názvem modelu, krátký popis (FE placeholder do doby, než přijde popis z Lore endpointu kolegy), profil 4 os v procentech (BE rozšířen o `axisMax`), tlačítka „Spočítat znovu" a placeholder „Sdílet (brzy)".

### Brzy
- [ ] FE: výsledková stránka (zobrazení stupně + profil os)
- [ ] Sdílení výsledku linkem (URL hash vs. server-side ID — rozhodnout)
- [ ] Domluva s kolegou: jak Quiz získá popis stupně z Lore (`ARCHITECTURE.md` → Sdílená rozhraní)
- [ ] Doladit hranice stupňů 3↔4 a 6↔7 po prvních reálných průchodech (přidat 1–2 přechodové otázky nebo upravit prahy)

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

- [ ] Homepage — co tam má být (intro do sekty, CTA na kvíz, odkaz na lore)
- [ ] Hlavní navigace (Domů / Kvíz / Lore)
- [ ] Design tokens (barvy, typografie, mezery) — žluť Caterpillaru jako primární?
- [ ] Layout / Header / Footer komponenty

## Hotovo

- [x] 2026-04-29 — BE Quiz: 18 otázek + scoring (4 osy + betrayal short-circuit), kalibrované prahy `[2,4,7,11,15,18]` a `BETRAYAL_THRESHOLD=14`, persona-průchody ověřeny pro stupně 1/2/5/7/8 přesně, 3↔4 a 6↔7 zůstávají subjektivní. Endpointy `GET /api/quiz/questions` + `POST /api/quiz/score` běží.
- [x] 2026-04-29 — Strategická dohoda: feature-split (Quiz/Lore) místo layer-split (BE/FE). Plán v `context/stav-me-nov-projekt-nastuduj-rosy-valley.md`, rozhodnutí zapsáno v `DECISIONS.md`.
- [x] 2026-04-29 — Doplněna doména: `bagriste_pravdy_knowledge_base_v2.md` (verze 1.0).
- [x] 2026-04-29 — Setup repa: monorepo struktura `/backend` + `/frontend`, context složka, scaffold Fastify + Vite/React.
