# Nápady / Parking lot

> Místo na nápady, které vznikly mimo aktuální MVP scope. Až bude na ně prostor, vyhodnotíme: vzít, posunout, vyhodit.
>
> Formát: krátký titulek, idea, kontext, otevřené otázky. Nejnovější nahoře.

---

## 2026-04-29 — Design v2: další iterace vizuálu

**Idea:** Honza už integroval první designovou vizi z `design/` mockupu (žluť/parchment/rust, Big Shoulders Stencil + Source Serif, TopBar, Wordmark, Creed, atd.). Kolega chce **další iteraci** — buď (a) doladit stávající design (typografie, spacing, mikrointerakce), nebo (b) nový designový směr přes další kolo v Claude.ai (nový mockup v `design/v2/`).

**Vlastník nápadu:** Kolega.

**Kontext:** Aktuální stav web = funkční SPA s prvním designovým průchodem. Mockup v `design/bagrista-web.html` je čerstvý, ale Honza z něj vytáhl jen část. Otázka je, jestli iterujeme nad **implementací** (přiblížit ji mockupu důkladněji), nebo nad **návrhem** (nový mockup, jiný směr).

**Otevřené otázky:**
- Co konkrétně nesedí na současné podobě webu? (Bez toho neumíme rozhodnout, jestli je to problém implementace nebo návrhu.)
- Chce Kolega přeobrátit celý web (nová paleta, jiný layout), nebo jen dotáhnout detaily?
- TweaksPanel z `design/tweaks-panel.jsx` je jen dev nástroj v mockupu — má se dostat i do produkčního webu (pro ladění za běhu), nebo zůstává v mockupu?
- Chceme mít vlastní dark mode? Aktuálně je vypnutý (light-only).

**Status:** parking lot — čeká na Kolegovu specifikaci, co konkrétně chce.

---

## 2026-04-29 — Newsletter — přihlášení k odběru

**Idea:** Návštěvníci se můžou přihlásit k odběru satirického newsletteru („Bagristické Zvěsti"?). Nová Lore obsah, hospodské moudra, sezónní připomínky (Dušičky se blíží, jdi ke hromadě pneumatik).

**Vlastník nápadu:** Kolega.

**Kontext:** Web je **static-only** (žádný BE, žádná DB — viz `DECISIONS.md` 2026-04-29). Newsletter musí buď (a) používat externí službu (Buttondown, ConvertKit, Mailchimp, Substack — form odesílá přímo na jejich URL, žádný náš BE), nebo (b) přinést zpět BE + DB (velký architektonický posun).

**Otevřené otázky:**
- Kam form umístit? Homepage (footer? sekce?), výsledková stránka kvízu, samostatná stránka „Odebírej"?
- Který provider? Doporučuju **Buttondown** (jednoduchý, laciný/free tier, spolehlivý, čitelný HTML form) nebo **Substack** (má vlastní web, tj. mohli bychom tam publikovat i obsah). Mailchimp je overkill.
- Kdo bude psát obsah newsletteru? Frekvence (týdně, měsíčně, sezónně)?
- GDPR — externí služba se stará. Přidat k formu jen „souhlas s odběrem" checkbox.

**Status:** parking lot. Rozhodnutí volby providera + umístění potřeba, pak implementace = ~30 minut práce.

---

## 2026-04-29 — Google Analytics (nebo Plausible/Umami)

**Idea:** Měřit návštěvnost webu — kolik lidí přijde, odkud, kolik dokončí kvíz, které Lore stránky jsou nejnavštěvovanější.

**Vlastník nápadu:** Kolega.

**Kontext:** Vercel deploy je připravený. Až web bude nasazený veřejně, budeme chtít metriky.

**Otevřené otázky (klíčové rozhodnutí):**
- **GA4** (Google Analytics 4) — free, mocný, ale vyžaduje **cookie consent banner** (GDPR). Kompletní data.
- **Plausible** — placený (~$9/měsíc), **žádné cookies**, žádný banner, GDPR-friendly, jednodušší data. Doporučuju.
- **Umami** — free / self-hosted, taky no cookies. Alternativa k Plausible.

Doporučuju **Plausible** nebo **Umami** — pro „satira pro kámoše" scope si nezasloužíme obtěžovat návštěvníky cookie bannerem. Pro naši potřebu (návštěvy, míra dokončení kvízu, top stránky) postačí.

**Implementation:** ~5 řádků skriptu v `<head>` `frontend/index.html` (nebo přes React helma). Zápis do `DECISIONS.md` po rozhodnutí.

**Status:** parking lot. Vyžaduje rozhodnutí providera.

---

## 2026-04-29 — Designový prostor v Claude.ai pro letáky a marketing

**Idea:** Kolega je VFX člověk a chce použít Claude.ai (Artifacts) jako pomocníka pro **tvorbu marketingových materiálů mimo web** — plakáty ke spuštění, sociální posty, PDF letáky, případně merch (samolepky, trika).

**Vlastník nápadu:** Kolega.

**Kontext:** Tohle **není feature webu**. Je to workflow pro tvorbu propagačních artefaktů. Analogicky k `design/` (mockup webu) by mohl vzniknout `marketing/` adresář v repu s SVG/HTML výstupy z Claude.ai.

**Otevřené otázky:**
- Co konkrétně chceme dělat jako první?
  - Sociální posty (IG story 1080×1920, IG feed 1080×1080, FB post 1200×630)?
  - Print letáky (A5 PDF)?
  - Merch návrhy (samolepka, trika s wordmarkem)?
- Kde skladovat výsledky? Repo `marketing/` (verzované), Google Drive (sdílené, ale mimo git), Notion (kolaborativní)?
- Kdo bude ta finální médium produkovat? Kolega (VFX profesionál) přes vlastní nástroje s Claude jako brainstorm partnerem? Nebo Claude generuje finální SVG/HTML a Kolega jen doladí?
- Bude v repu potřeba adresář `marketing/` mezi ostatními, nebo raději samostatné repo `bagrista-marketing`?

**Status:** parking lot — čeká na první konkrétní zadání (např. „chci plakát na spuštění webu ve formátu A2").

---

## 2026-04-29 — Mini-hra: Pexeso pozdravů

**Idea:** Jednoduchá pexesová hra, kde otočíš kartu s **pozdravem** a hledáš ke kartě s **odpovídající odpovědí**. Např. „Zdař bagr!" ↔ „I tobě."

**Kontext:** Vychází z Části III A knowledge base (pozdravy a jejich odpovědi). Učí kanonické pozdravy hravě, hodí se jako odlehčení v Lore sekci.

**Vlastník nápadu:** Hrabě (navrženo mimochodem při čtení Lore inventury).

**Otevřené otázky:**
- Kolik dvojic? (KB má ~5 hlavních pozdravů + ortodoxní varianty + aklamace v III B)
- Aklamace se dají vzít taky? („Sláva na výsostech naftě..." ↔ ?)
- Žije to **uvnitř Lore** (sub-stránka pod Slovníkem), nebo jako **samostatná hříčka** v hlavní navigaci?
- Vizuál karet — žluť Caterpillaru, ikona bagru, něco jiného?

**Status:** parking lot — řešit až bude jádro Lore (stupně, sekty, slovník) hotové.

---

## 2026-04-29 — Bitvy v dějinách bagrování → vlastní stránky (post-MVP)

**Idea:** KB obsahuje tabulku 10 datovaných bitev (1925 Vznik CAT, 1981 Komatsu vstup do USA, 1994 Schizma D vs. E, 2008 Krize víry, 2025 První elektrické bagry, …). V MVP jsou součástí rámcového článku „Dějiny pravdy" / „Velká válka s Komatsu". Cíl: každá bitva = **vlastní stránka** s rozšířeným příběhem (kontext, postavy, dopad).

**Vlastník nápadu:** Hrabě (rozhodnutí 2026-04-29 — bod C inventury).

**Status:** parking lot — po MVP, kdy bude jádro Lore hotové. Při psaní rámcového článku v MVP používat **kotvy** pro každou bitvu, aby pozdější rozparcelování na samostatné stránky bylo bezbolestné.

---

## 2026-04-29 — Postavy a mučedníci → vlastní stránky (post-MVP)

**Idea:** KB má 8 mučedníků s vlastními příběhy (Pepa od Kladna, Slovák z Žilinska, Karel z Liberce, Anonymní pětka, Děda Vrána, Pan Hrabě z Brna, Ivoš ze Zlína, Jirka) + dalších ~12 postav (Otis, Holt, Best, Caesar, Templáři, Leonardo, Don Fites, biblické postavy…). V MVP jsou v rámcových článcích (Mučedníci hub, Dějiny). Cíl: každá postava = **vlastní biografická stránka**.

**Vlastník nápadu:** Hrabě (rozhodnutí 2026-04-29 — bod D inventury).

**Status:** parking lot — po MVP. Při psaní hub článků v MVP používat **kotvy** pro každou postavu (např. `/lore/mucednici#deda-vrana`), aby migrace na samostatné stránky byla bezbolestná.

---

## 2026-04-29 — Otevřené otázky z KB Část VII (Mechanici)

**Kontext:** Knowledge base obsahuje 5 nezodpovězených otázek o doméně Mechaniků (KB řádky 797–803). Jsou to interní pracovní poznámky autora KB. **V Lore se nezobrazí** (rozhodnutí 2026-04-29 — bod E inventury). Buď zůstanou tady jako parking, nebo z nich Hrabě/Honza vyrobí kanonické odpovědi a doplní KB v3.

**Otázky a tipy z KB:**

1. **Mají mechanici vlastní pozdrav?** KB tip: pravděpodobně ne — mlčení je jejich pozdrav, nebo krátké kývnutí.
2. **Mají vlastní hospodu?** KB tip: ano. Někde za městem, malá, špinavá, bez piva na čepu. Sedí tam vždycky stejných pět chlapů. Nemluví spolu. Sledují fotbal bez zvuku.
3. **Co se stane, když umře mechanik?** KB tip: pohřeb bez bagristů. Přijdou jen ostatní mechanici a rodina. Caterpillar oficiálně neposílá kondolenci. Neoficiálně dealer zaplatí věnec, který se postaví **vedle hrobu, ne na něj**.
4. **Existují ženy-mechaničky?** KB tip: teologicky citlivé. Oficiálně neexistují. Neoficiálně všichni vědí o jedné v Hradci, ale nikdo o ní nemluví.
5. **Den nečistých?** Protilehlý svátek k Dušičkám pro mechaniky? KB nemá odpověď.

**Status:** parking lot. KB už drobně odpovídá — stačilo by „kanonizovat" do plnohodnotných odpovědí.
