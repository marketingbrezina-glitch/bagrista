# design/ — referenční mockupy webu

Statické mockupy vytvořené v **Claude Design** (claude.ai/design). Slouží jako **vizuální
předloha** pro produkční aplikaci ve `frontend/`.

> **Tohle se nenasazuje.** Živý web běží z `frontend/` (Vite + React + TS, deploy na Vercel).
> Mockup tady je vzor, ne build artefakt. Dokud se změna nepřenese do `frontend/`, na webu
> se nic nezmění.

## Verze

| Verze | Stav | Směr | Vstupní bod |
|---|---|---|---|
| [`v1/`](v1/) | **implementováno** ve `frontend/` | Industrial / stencil | `v1/bagrista-web.html` |
| [`v3/`](v3/) | **aktuální návrh**, čeká na přenesení | Novinový věstník | `v3/index.html` |

Číslování odpovídá verzování v Claude Design projektu, ne počtu mockupů v repu — proto
skok z v1 na v3.

## Co se mezi v1 a v3 změnilo

Není to doladění, je to **změna směru**:

| | v1 | v3 |
|---|---|---|
| Nadpisové písmo | Big Shoulders Stencil Display | **Playfair Display** |
| Mono písmo | JetBrains Mono (štítky, captiony) | **žádné** |
| Podklad | plochá stránka na pergamenu | **list papíru na pracovním stole** (`--desk`, stínovaný `.sheet`) |
| Ohraničení | tvrdé 2px černé rámy, offset stíny | vlasové linky, dvojitá novinová linka, jemné stíny |
| Motiv | varovná páska, tovární štítek | masthead, novinové „ušáky", tabulky, iniciály |
| Podtitul | „Vyznání víry" | „Věstník bagrovací komunity" |

Žluť zůstala (`#F2BE12` vs. původní `#FFCD11`), červená se přesunula do tlumenější
`#9B2D1F`.

## Jak mockup spustit

Přes **lokální HTTP server**, ne dvojklikem — Babel nesmí načítat lokální `.jsx` přes
`file://`. Nejjednodušší je VS Code + rozšíření **Live Server**: pravý klik na vstupní
soubor → *Open with Live Server*.

## ⚠️ `v3/data.js` není zdroj pravdy

`v3/data.js` obsahuje **kopii** obsahu (stupně, sekty, slovník, modlitby, kvíz, mučedníci,
dějiny), aby mockup měl co renderovat. **Needituj ho s očekáváním, že se změní web.**

Skutečné zdroje pravdy:

- **Lore obsah** → `content/lore/**/*.md`
- **Kvízové otázky a scoring** → `frontend/src/quiz/{questions,scoring}.ts`

Až se v3 přenese do `frontend/`, `data.js` se nepřenáší — produkční aplikace si obsah bere
z markdownu přes Vite glob (viz `context/ARCHITECTURE.md`, sekce Lore rendering).

## Co bylo z exportů vyhozeno

Aby v repu neležely zbytečnosti:

- **v1:** `debug-current.png`, `verify-light.png`, `uploads/` (3 nalepené screenshoty, ~600 KB)
- **v3:** `.gitignore` (duplikát kořenového), `bagrista-web.html` (bajt za bajt shodný s `index.html`)
