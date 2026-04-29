# Bagrista — co to je

## Cíl

Bagrista je satirický web pro **osobnostní profilování bagristů** — kvíz inspirovaný scientologickým „Bridge to Total Freedom" / klasickými testy osobnosti, který návštěvníka zařadí do jednoho z osmi charakterových stupňů podle modelů Caterpillar (CAT 301.5 Nováček → 6090 FS Guru, plus stupeň 8 D9 Zrádce). K tomu sdružuje encyklopedii lore „Sekty bagristů" (slovník, modlitebník, rituály, svátky, kasta nečistých).

Doménový kánon: [`bagriste_pravdy_knowledge_base_v2.md`](bagriste_pravdy_knowledge_base_v2.md) — verze 1.0, kanonický referenční dokument. **Charakterové úrovně a Cyklus bagrování jsou „svaté" (🔒 neměnit bez výslovného pokynu).** Slovník, lore, rituály jsou otevřené k rozvíjení.

## Cílový uživatel / persona

Interní experiment dvou lidí (Honza + kolega) — **primárně cvičení vibe-codingu ve dvou s Claude Code**. Web pak může být veřejný jako legrácka pro kamarády, ale produkční ambice nemá.

## MVP scope

1. **Kvíz** — 15–25 otázek → vyhodnocení do jednoho z 8 stupňů → výsledková stránka s popisem stupně.
2. **Lore sekce** — stránka pro každý ze 8 stupňů, slovník (Komatsu jako nadávka, lidová rčení), modlitebník, rituály (walk-around, mazání), svátky (ConExpo, Smutný pátek, Dušičky), kasta nečistých.
3. **Sdílení výsledku** — odkaz, který otevře cizí výsledek (serializace do URL hashe nebo `/result/<id>`).

## Mimo scope (zatím)

- Auth, registrace, uživatelské účty.
- Ukládání historie výsledků v DB.
- Admin panel pro správu otázek/obsahu.
- i18n (web je česky).
- Mobilní aplikace.
- Komentáře, fórum, sdílení vlastní lore (možná v2).

## Vlastnictví / role

| Vlastník | Doména | Soubory primárně |
|---|---|---|
| **Honza** | Quiz / Profilování (otázky, scoring, výsledek, sdílení) | `frontend/src/quiz/*`, `backend/src/quiz/*` |
| **Kolega** | Lore / Encyklopedie (8 stupňů, slovník, modlitebník, rituály, svátky) | `frontend/src/lore/*`, `backend/src/lore/*` |
| **Společné** | Homepage, navigace, layout, design tokens | Měnit v páru, ne sólo |

Detail v [`TASKS.md`](TASKS.md). Důvod feature-splitu (a ne BE/FE-splitu) v [`DECISIONS.md`](DECISIONS.md).

## Otevřené otázky

- **Tone of voice na webu** — kanonicky satirický, „pseudo-svatý" jazyk z knowledge base. Drží to čtenáře, nebo to po pár klicích unaví? Rozhodne UX kvízu.
- **Vizuál** — žluť Caterpillaru jako primární barva? Industrial / blue-collar typografie? Otevřená.
- **Hostování** — Vercel/Netlify pro FE + Fly/Render pro BE? Nebo jeden box? Zatím odložit, řešit až bude co deployovat.
