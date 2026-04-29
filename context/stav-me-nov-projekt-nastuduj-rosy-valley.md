# Plán: Jak rozdělit role mezi dva vibe-coding juniory na Bagristovi

## Context

Bagrista = satirický web pro osobnostní profilování bagristů. Doména daná v [`context/sekta_bagristu_knowledge_base.md`](context/sekta_bagristu_knowledge_base.md): 8 charakterových úrovní podle modelů Caterpillar (CAT 301.5 → 6090 FS + zrádce D9), inspirace scientologickým „Bridge to Total Freedom" / testem osobnosti. Repo je čerstvý scaffold (Fastify + Vite/React, jen `/api/health`), `PROJECT.md` a `TASKS.md` jsou prázdné šablony.

**Vstupy od uživatele:**
- Oba (Honza + kolega) jsou junioři, většinu kódu napíše Claude — člověk je v roli product/architect/reviewer.
- Primární cíl experimentu = **naučit se vibe-coding ve dvou**, ne nutně dodat hotový produkt.
- Otevřená otázka: dává smysl rozdělit role na „design" vs. „chování"?

**Závěr na otázku „design vs. behavior":** Jako *tvrdá hranice v kódu* spíš ne — UI komponenta je vždy obojí, formulář se validuje na BE i FE, kvízová logika je behavior s designovým výstupem. Jako *role* (kdo má poslední slovo o čem) má split smysl, ale na webu typu Bagrista líp funguje **feature/vertical split** — každý vlastní jednu výseč napříč stackem.

---

## Doporučená strategie: feature-split, ne layer-split

Pro vaši situaci (oba junioři, Claude píše kód, cíl je workflow) navrhuju opustit BE/FE rozdělení jako primární osu odpovědnosti a místo toho rozdělit projekt **podle features**. BE/FE hranice ve scaffoldu zůstává — jen ji přestáváme používat jako rozhraní mezi vámi dvěma.

### Konkrétní střih pro Bagristu

| Vlastník | Doména | Co to obnáší napříč stackem |
|---|---|---|
| **Osoba A — Quiz / Profilování** | Kvízová cesta: úvod → otázky → vyhodnocení → výsledek („jsi CAT 320") → sdílení | FE: formulář, progres, výsledková stránka. BE: scoring algoritmus, endpoint pro vyhodnocení, případně persistence výsledku pro sdílení. |
| **Osoba B — Lore / Encyklopedie** | Statické/polostatické stránky: 8 stupňů, slovník, modlitebník, rituály, svátky, kasta nečistých | FE: routing mezi sekcemi, layout, typografie, navigace. BE: dodávka obsahu (i kdyby jen jako JSON/MD soubory). |

**Setkávací plocha** je jen homepage + navigace + sdílený design system (barvy, fonty, layout). To je málo míst — snadná koordinace.

### Proč tento střih

1. **Minimální překryv.** Quiz a Lore se v kódu skoro nedotýkají — oddělené routy, oddělené komponenty, oddělené API endpointy. Rebase konflikty budou vzácné.
2. **Každý vidí celý vertikál.** Naučíte se vibe-codit BE i FE — nezůstanete uvíznutí v jedné vrstvě. To je explicitní cíl.
3. **Doména hraje hlavní roli.** Vlastník Quizu rozhoduje o tom, jak se boduje, kolik otázek, jaký výsledek — to je produktové rozhodnutí. Vlastník Lore rozhoduje, co je v slovníku, jak vypadá modlitebník — taky produktové.
4. **Claude má jasný kontext.** Když řeknete „pracuju na Quizu", Claude ví, které soubory číst (např. `frontend/src/quiz/*` + `backend/src/quiz/*`). Když ostatní mají jiný feature, kontext se nemíchá.
5. **Snadný first milestone.** Lore vlastník začne tím, že přepíše část knowledge base do statických stránek (rychlá viditelná výhra). Quiz vlastník začne na designu otázek a scoringu (těžší, ale baví).

### Co dělá tento split *ne*ideálním a kdy ho přehodnotit

- Pokud jeden z vás má silné preference (kolega chce dělat čistě UI, Honza chce čistě data) → klasický BE/FE split je legitimní. Není to špatně, jen pak komunikace přes ARCHITECTURE.md (API kontrakty) musí být precizní.
- Až se objeví **shared concerns** (auth, design systém, sdílené typy) → udělejte je společně v páru, ne tak že je „přiřadíte" jednomu.

---

## Praktická pravidla pro vibe-coding ve dvou

Tohle je důraznější než stávající `WORKFLOW.md`, protože spoléháte na Claude:

1. **Před každým tasked Claudem si pull-rebasujte.** Claude jinak fixuje kontext na zastaralou verzi a ty rozdíly se hůř integrují.
2. **`context/TASKS.md` aktualizujte *před* začátkem práce, ne po.** Druhý Claude potřebuje vědět, čeho se nedotýkat. Pravidlo: „Co není v TASKS.md, na to si nemůžeš dělat nárok."
3. **Jeden feature = jeden Claude session.** Nemíchejte v jednom chatu Quiz a Lore. Když chcete oboje, dva chaty.
4. **Smlouvy mezi features jdou přes [`context/ARCHITECTURE.md`](context/ARCHITECTURE.md).** Když Quiz potřebuje něco z Lore (např. popis stupně po vyhodnocení), zapište to jako „API kontrakt" a teprve pak kódujte. Bez tohohle se Claude tipně.
5. **Sdílené komponenty (Header, Layout, design tokens) měňte v páru** — jeden navrhne, druhý reviewuje, pak commit. Nikdy sólo.
6. **`DECISIONS.md` updatujte agresivně.** Junior + Claude = pokušení vybrat knihovnu, která se „hodí teď". Za měsíc nebudete vědět proč. Zapsání trvá 30 vteřin.

---

## Kritické soubory k aktualizaci (před prvním feature kódem)

- [`context/PROJECT.md`](context/PROJECT.md) — doplnit cíl, MVP scope, persona. Bez tohohle Claude neví, co je „v duchu produktu". Návrh MVP scope níže.
- [`context/TASKS.md`](context/TASKS.md) — naplnit první tasky pro oba lidi (Quiz vs. Lore podle dohody).
- [`context/ARCHITECTURE.md`](context/ARCHITECTURE.md) — předběžný API kontrakt: `POST /api/quiz/score`, `GET /api/lore/levels`, atd. Detail můžete dolnit při implementaci.
- [`context/DECISIONS.md`](context/DECISIONS.md) — zapsat „2026-04-29 — feature-split místo BE/FE — proč". Aby za měsíc nikdo neřekl „proč to máme takhle".

### Návrh MVP scope (pro PROJECT.md)

1. Kvíz: 15–25 otázek → vyhodnocení do jednoho z 8 stupňů → výsledková stránka s popisem stupně.
2. Lore sekce: stránka pro každý ze 8 stupňů, slovník, modlitebník (jako statický obsah z knowledge base).
3. Sdílení výsledku linkem (`/result/<id>` nebo serializace do URL hashe — žádná DB v MVP).
4. **Mimo scope:** auth, ukládání historie výsledků, admin panel, i18n, mobilní app.

---

## Verifikace

Tento plán je strategický, ne implementační — verifikuje se rozhovorem, ne testy:

1. **Rozhodněte si s kolegou rozdělení Quiz/Lore (5 minut).** Kdo z vás má radši psát copy a vymýšlet UX, dělá Lore. Kdo radši přemýšlí o algoritmech a datech, dělá Quiz. Pokud je vám to jedno → losujte.
2. **Společně doplňte `PROJECT.md` a `TASKS.md` (30 minut).** Bez Claude. Lidská dohoda předchází kódu.
3. **Každý zkuste jeden malý feature ve své doméně (např. první 3 otázky kvízu / stránka stupně CAT 320).** Test, že se nepošlapete. Když po dni narazíte na konflikt, který nedává smysl, split nesedí — pak refaktorujte.
4. **Po týdnu retro: funguje to?** Kolik commit konfliktů jste měli? Kolikrát jste se ptali toho druhého „kde to mám hledat"? Pokud > 3× za den, něco je špatně.

---

## Co dělat hned (nedělat jako Claude, ale s uživatelem)

- Tohle je **strategická dohoda**, ne implementační task. Než pustíte Claude na kód, doporučuju dvě věci, které **udělejte vy dva sami** (bez Claude, mimo plan mode):
  1. Přečtěte si tento plán společně.
  2. Domluvte se na rozdělení Quiz vs. Lore (případně se shodněte, že to dělíte jinak).
- Pak teprve poprosíte Claude, aby aktualizoval `PROJECT.md`, `TASKS.md`, `ARCHITECTURE.md`, `DECISIONS.md`. To už je implementační task, který má smysl pustit normálně.
