# Aktuální práce

> Aktualizuj, když začneš nebo dokončíš něco netriviálního. Tvůj i kolegův Claude to čte — jinak nemá jak vědět, na čem makáš.
>
> **Pravidlo:** TASKS.md aktualizuj *před* začátkem práce, ne po. Co tu není, na to si nemůžeš dělat nárok.

## Honza — Quiz / Profilování

Vlastní: kvízová cesta, scoring algoritmus, výsledková stránka, sdílení výsledku.
Soubory: `frontend/src/quiz/*`, `backend/src/quiz/*`.

### Dělá teď
- (nic; static-only build hotový, deploy na Vercel připravený — vercel.json v `frontend/`)

### Brzy
- [ ] Domluva s kolegou: jak Quiz získá popis stupně z Lore (`ARCHITECTURE.md` → Sdílená rozhraní). Aktuálně FE má vlastní 2-věty popisy v `frontend/src/quiz/levels.ts`; ty by měly přejít na Lore endpoint.
- [ ] Doladit hranice stupňů 3↔4 a 6↔7 po prvních reálných průchodech (přidat 1–2 přechodové otázky nebo upravit prahy)
- [ ] Po kompletaci webu: re-skin výsledkové stránky podle finálních design tokens (žluť CAT, typografie)

## Kolega — Lore obsah + design

Vlastní: `content/lore/*` (~70 markdown souborů), `design/*` (statický mockup), spolu s Honzou sdílené FE komponenty a design tokens.

### Dělá teď
- [x] **Design v3 hotový a v repu** — `design/v3/`, nový směr (novinový věstník). Viz `design/README.md` pro v1↔v3 rozdíl.

### Brzy
- [ ] Projít v3 na mobilu — port je ověřený jen na desktopu (1440×900). Breakpoint `960px` z mockupu je v `styles.css`, ale reálně proklikané to není.
- [ ] **Newsletter form** — provider + umístění (Buttondown / Substack, homepage vs. výsledkovka). Detail v `IDEAS.md`.
- [ ] **Google Analytics / Plausible** — rozhodnout providera, přidat script tag do `frontend/index.html`. Detail v `IDEAS.md`.
- [ ] **Marketing designový prostor** — dohodnout, jestli v repu (`marketing/`) nebo mimo. Detail v `IDEAS.md`.

## Společné / sdílené

> Měňte v páru, ne sólo. Když narazíte na nutnost změny, napište do TASKS.md a domluvte se.

- [x] 2026-04-29 — Scaffold homepage + navigace + Layout + Lore rendering (Honza, autorizováno když kolega nebyl u PC). `frontend/src/{Layout,HomePage}.tsx`, `frontend/src/lore/{LoreHomePage,LoreSectionPage,LoreDocPage,MarkdownView,loreContent}.tsx/ts`. **Kolega: máš volnou ruku tohle přepracovat — víc detailů v `DECISIONS.md` (2026-04-29 — FE scaffold).**
- [ ] Design tokens (barvy, typografie, mezery) — žluť Caterpillaru jako primární? (zatím šedá neutrál)

## Hotovo

- [x] 2026-09-07 — **Design v3 „Věstník" přenesen do `frontend/`** (Kolega, celé včetně kvízu — domluveno s Honzou). Čtyři commity: tokeny+masthead → homepage → lore stránky → re-skin kvízu. Playfair Display místo stencilu, list papíru na stole, novinová hlavička a linky. Legacy v1 vrstva ze `styles.css` smazána, `brand/` složka zrušena (masthead je čistá typografie). **Kvíz je re-skin bez zásahu do logiky** — `quiz/{questions,scoring,types,share,levels,api}.ts` nedotčené, Honzova kalibrace prahů volná. Homepage i Lore stránky teď čtou počty a názvy z `content/lore/**/*.md`, ne z mockupu. Nově se renderuje `levels/_outro.md` (Závěrečné požehnání) pod stupni i na výsledkovce. Ověřeno v prohlížeči: homepage, schody, detail stupně, průchod kvízem, výsledek Zrádce — bez chyb v konzoli.
- [x] 2026-09-07 — Google Analytics 4 (Honza). `frontend/src/analytics.ts` + `usePageTracking.ts`; produkční build používá ID `G-TST9NBRYZL` zapečené v `analytics.ts` (přepsatelné `VITE_GA_MEASUREMENT_ID`), dev mód neměří. Pageviews na každou SPA routu + kvízové eventy (`quiz_start`, `quiz_complete`, `result_share`, `result_print`, `result_view_shared`, `quiz_restart`). Dotknuto sdílených `main.tsx`/`App.tsx` (jen přidané řádky). Detail v `DECISIONS.md` (2026-09-07 — GA4). Rozhodnutí GA4 vs. Plausible viz `IDEAS.md`.
- [x] 2026-04-29 — Lore obsah kompletní: ~70 markdown souborů v `content/lore/` (8 stupňů + 7 fází + 7 sekt + 6 značek + 6 svátků + 6 rituálů + 5 svatých písem + 9 pojmů + 5 hub stránek + Credo + Caterpillar). Šablony v `_TEMPLATES.md`. Wiki-linky `[[...]]` napříč obsahem. Kolega.
- [x] 2026-04-29 — Designový mockup celého webu v `design/` (HTML + JSX bez buildu, vytvořeno v **Claude Design** na claude.ai/design). 15 souborů: entry point, stylesheet, sdílené komponenty, TweaksPanel pro live-tweaking barev a fontů, 8 stránek + logo explorations. Slouží jako referenční vize pro `frontend/`. Kolega.
- [x] 2026-04-29 — Hotfix Homepage hero: wordmark „BAGRISTA" přečníval na širokých displejích za kartu „OHLÁŠENÍ". Font-size přepnut z `clamp(80px, 13vw, 200px)` (viewport-vázané) na `clamp(56px, 17cqi, 130px)` (vázané na šířku sloupce přes `container-type: inline-size`). Soubor: `frontend/src/HomePage.tsx`. Ověřeno na 1280/1920/2560/mobile — žádný překryv. Kolega: pokud chceš jiné scaling, jsme v společné zóně.
- [x] 2026-04-29 — Pivot na static-only: quiz scoring + otázky přesunuty z `backend/` na FE, backend celý smazán, `frontend/vercel.json` připravený pro Vercel deploy. Detaily v `DECISIONS.md` (2026-04-29 — Static-only deploy).
- [x] 2026-04-29 — Designová integrace: žluť/parchment/rust palette, Big Shoulders Stencil + Source Serif fonts, TopBar s wordmark + bucket diakritika, Footer (Bratrstvo žluté lžíce), Creed/Wikilink/Parchment/Chip komponenty, redesigned všechny stránky (Home/Lore index/sekce/detail, Quiz, Result). Reference v `design/`.
- [x] 2026-04-29 — Wiki-linky `[[X]]` / `[[X|alias]]` / `[[X#anchor]]`: bold + Router Link, resolver přes `nazev`/slug/long-form aliasy. Výsledková stránka načítá plný lore stupně z `content/lore/levels/*.md` (FE už není zdroj pravdy popisů stupňů).
- [x] 2026-04-29 — FE Quiz: kompletní user flow. Kvízová cesta (`/`, jedna otázka + progress + 4 volby + Zpět + klávesy 1–4), výsledková stránka (Bagrista úrovně N + model + epitet + 2-věty popis + profil 4 os v %), sdílení přes URL hash (`#v1.<19chars>`), stažení do PDF přes `window.print()`. Šedý neutrál, žádný router, žádný CSS framework — počká na společnou domluvu s kolegou (homepage/navigace/design tokens).
- [x] 2026-04-29 — BE Quiz: 19 otázek + scoring (4 osy + betrayal short-circuit), kalibrované prahy `[2,4,7,11,15,18]` a `BETRAYAL_THRESHOLD=14`, persona-průchody ověřeny pro stupně 1/2/5/7/8 přesně, 3↔4 a 6↔7 zůstávají subjektivní. Endpointy `GET /api/quiz/questions` + `POST /api/quiz/score` (vrací `axisMax` pro normalizaci os na FE) běží.
- [x] 2026-04-29 — Strategická dohoda: feature-split (Quiz/Lore) místo layer-split (BE/FE). Plán v `context/stav-me-nov-projekt-nastuduj-rosy-valley.md`, rozhodnutí zapsáno v `DECISIONS.md`.
- [x] 2026-04-29 — Doplněna doména: `bagriste_pravdy_knowledge_base_v2.md` (verze 1.0).
- [x] 2026-04-29 — Setup repa: monorepo struktura `/backend` + `/frontend`, context složka, scaffold Fastify + Vite/React.
