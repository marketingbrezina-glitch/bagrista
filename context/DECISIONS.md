# Technická rozhodnutí (lightweight ADR)

> Když uděláš netriviální technické rozhodnutí, zapiš ho sem. Formát: `YYYY-MM-DD — co — proč`. **Nejnovější nahoře.**
>
> Smyslem je, aby za týden nikdo z nás (ani Claude) neřekl "proč jsme to udělali takhle?".

---

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
