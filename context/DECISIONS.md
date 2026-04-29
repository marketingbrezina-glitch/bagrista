# Technická rozhodnutí (lightweight ADR)

> Když uděláš netriviální technické rozhodnutí, zapiš ho sem. Formát: `YYYY-MM-DD — co — proč`. **Nejnovější nahoře.**
>
> Smyslem je, aby za týden nikdo z nás (ani Claude) neřekl "proč jsme to udělali takhle?".

---

## 2026-04-29 — Doména: Bagrista = satirický web na osobnostní profilování bagristů
Web profiluje návštěvníka do jednoho z 8 charakterových stupňů podle modelů Caterpillar (CAT 301.5 → 6090 FS + zrádce D9), inspirace scientologickým „Bridge to Total Freedom" / klasickými testy osobnosti. Doménový kánon je v `context/sekta_bagristu_knowledge_base.md` — verze 1.0, charakterové úrovně a Cyklus bagrování jsou „svaté" (neměnit bez výslovného pokynu), ostatní (slovník, lore, rituály) je otevřené k rozvíjení.
**Cíl projektu:** primárně cvičení vibe-codingu ve dvou s Claude Code; produktové ambice sekundární.

## 2026-04-29 — Feature-split (Quiz vs. Lore), ne layer-split (BE vs. FE)
Repo má v scaffoldu BE/FE strukturu, ale jako primární osu odpovědnosti používáme **feature-split**: Honza vlastní Quiz (kvízová cesta, scoring, výsledek, sdílení) napříč stackem, kolega vlastní Lore (8 stupňů, slovník, modlitebník, rituály, svátky) napříč stackem. Důvody:

1. Oba jsme junioři a většinu kódu píše Claude — člověk je v roli product/architect, ne dělník v jedné vrstvě. Vertical split umožňuje učit se BE i FE, což je explicitní cíl.
2. Quiz a Lore se v kódu skoro nepřekrývají → minimum rebase konfliktů.
3. Doménová rozhodnutí (kolik otázek, jak boduje, jak vypadá modlitebník) jsou produktová a patří k vlastníkovi feature, ne ke správci vrstvy.
4. Claude má jasný kontext — „pracuju na Quizu" = `frontend/src/quiz/*` + `backend/src/quiz/*`, neptám se na lore.

**Cena:** sdílené věci (homepage, navigace, layout, design tokens) musíme měnit v páru — jeden navrhne, druhý reviewuje. Pokud se to ukáže jako třecí plocha, přehodnotit.

**Plán a kontext:** `context/stav-me-nov-projekt-nastuduj-rosy-valley.md` (přesun rozhodnutí Quiz=Honza / Lore=kolega po rozhovoru).

## 2026-04-29 — Direct push do `main` (varianta B), žádné PR
Jsme jen dva, je to experimentální projekt. Code review by byl overhead. Místo toho pravidlo `git pull --rebase` před každým pushem (viz `WORKFLOW.md`).
**Cena:** žádný safety net proti nesmyslnému commitu. Když projekt zmrskneme do něčeho většího, přidáme PR + branch protection.

## 2026-04-29 — Žádné npm workspaces, dvě nezávislé `package.json`
Méně setupu, žádné konflikty pri `npm install`, snadno se rozštěpí do dvou repozitářů kdyby bylo třeba. Nevýhoda: nemůžeme sdílet TS typy mezi BE a FE bez kopírování. Až nám to začne vadit, založíme `/shared` jako lokální package.

## 2026-04-29 — Backend: Fastify místo Express
Native TypeScript support, rychlejší, schema validace přes JSON Schema out of the box. Pro náš scale je Express i Fastify jedno, ale Fastify má lepší DX.

## 2026-04-29 — Frontend: Vite + React místo Next.js
Nepotřebujeme SSR, server actions ani routing magic. Vite = nejrychlejší dev server, minimum konfigurace, instantní HMR. Až bude potřeba SSR, přemigrujeme.

## 2026-04-29 — TypeScript everywhere, `strict: true`
Jeden jazyk na BE i FE = víc sdíleného kontextu pro Claude, méně kontextového přepínání pro nás. `strict: true` od začátku, ať se nemusíme zpětně vrtat ve `any`.
