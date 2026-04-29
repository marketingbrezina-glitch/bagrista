# Lore — šablony obsahu

> Tento dokument popisuje **strukturu všech typů obsahu** v Lore. Když chceš přidat novou stránku stupně, sekty, svátku atd., tady najdeš formát, který má soubor mít.
>
> **Pro Hraběte (vlastníka Lore):** každá šablona má sekci „Co píšeš jako autor" s vysvětlením polí.
>
> **Pro Honzu (Quiz / FE-konzument):** každá šablona má sekci „Datový tvar (typy)" s typy polí pro buildový skript.

---

## Společné principy

### Hlavička souboru (frontmatter)

Každá stránka začíná hlavičkou mezi `---` čarami nahoře. Hlavička obsahuje **strojové údaje** (id, slug, kategorie, atd.) v YAML formátu. Pak následuje **prózní text** v markdownu.

```markdown
---
id: 4
slug: cat-320-profik
nazev: Profík na plný úvazek
...
---

(samotný text článku)
```

### Wiki-linky napříč obsahem

V textu se odkazujeme přes `[[...]]` syntax (jako v Obsidianu / Notionu):

- `[[Komatsu]]` — plný odkaz s textem „Komatsu"
- `[[Komatsu|modré peklo]]` — link na článek „Komatsu", ale v textu se zobrazí slovo „modré peklo"
- `[[Komatsuáni#konnichi-bagger|Konnichi-bagger]]` — odkaz na sekci `konnichi-bagger` ve článku Komatsuáni

Build-time skript ověří, že všechny cíle existují. Když cíl chybí, build padne.

### Slugy (URL kus)

`slug` = ten kousek adresy v prohlížeči. Pravidla:
- Jen malá písmena, číslice, pomlčky
- Žádná diakritika (`á → a`, `š → s`)
- Smysluplné a stabilní (slug se po publikaci NEMĚNÍ — odkazy by se rozbily)

### Kotvy (anchor)

Hub stránky (Slovník, Modlitebník, Dějiny atd.) mají **kotvy** uvnitř — adresy s `#`, např. `/lore/slovnik#zdar-bagr`. Kotvy se generují automaticky z nadpisů `## Něco` (převedeno na slug).

Z jiného článku odkazuješ na kotvu: `[[Slovník#zdar-bagr|„Zdař bagr!"]]`.

---

## Šablona 1 — STUPEŇ (Level)

**Účel:** 8 charakterových úrovní (CAT 301.5 → D9). Jádro celého webu — kvíz vede sem.
**Adresář:** `content/lore/levels/`
**Pojmenování souborů:** `01-cat-301-novacek.md` až `08-cat-d9-zradce.md` (číslo pro řazení v editoru, slug pro web).

### Co píšeš jako autor

| Pole | Co je to | Povinné? | Příklad |
|---|---|---|---|
| `id` | pořadové číslo stupně (1–8) | ano | `4` |
| `slug` | URL kus | ano | `cat-320-profik` |
| `model` | oficiální název bagru | ano | `CAT 320` |
| `nazev` | přezdívka stupně | ano | `Profík na plný úvazek` |
| `stav` | jednoslovný / krátký status (kurzíva v hlavičce) | ano | `Pravý bagrista` |
| `perex` | jednověta-shrnutí (zobrazí se v master Bridge a v kvízových výsledcích) | ano | `Tohle je první stupeň, který za něco stojí.` |
| `hmotnost_t` | hmotnost stroje v tunách | ano | `20` |
| `predchozi` | slug předchozího stupně (pro navigaci „dozadu") | ne (chybí u stupně 1) | `cat-308-radovy-bagrista` |
| `dalsi` | slug následujícího stupně („cesta ven" ve struktuře) | ne (chybí u stupňů 7 a 8) | `cat-336-xe-zasveceni` |
| `posvatne` | je obsah „svatý" (🔒, neměnit bez výslovného pokynu)? Pro stupně vždy `true` | ano | `true` |

Pak následuje hlavní text — obvykle 3–5 odstavců charakterového popisu, plus sekce `## Cesta ven` na konci (kromě stupňů 7 a 8, které mají odlišné zakončení).

### Datový tvar (typy)

```ts
type Level = {
  id: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
  slug: string;
  model: string;
  nazev: string;
  stav: string;
  perex: string;
  hmotnost_t: number;
  predchozi?: string;  // slug
  dalsi?: string;      // slug
  posvatne: true;      // u stupňů vždy true
  body: string;        // markdown text
};
```

---

## Šablona 2 — FÁZE CYKLU (Phase)

**Účel:** 7 fází Cyklu bagrování — komunikační rituál vyprávění vtipu od „Prvního výkopu" po „Přejezd na nové staveniště".
**Adresář:** `content/lore/phases/`
**Pojmenování:** `1-prvni-vykop.md` až `7-prejezd.md`.

### Co píšeš jako autor

| Pole | Co je to | Povinné? | Příklad |
|---|---|---|---|
| `id` | pořadové číslo fáze (1–7) | ano | `2` |
| `slug` | URL kus | ano | `volnobeh` |
| `nazev` | název fáze | ano | `Volnoběh` |
| `cislo_fraze` | jak fáze začíná v kvízovém výstupu, slogan | ano | `Tři vteřiny ticha.` |
| `perex` | jednověta-shrnutí | ano | `Poslední šance utéct. Žádný bagrista jí nikdy nevyužil.` |
| `predchozi` | slug předchozí fáze | ne (chybí u fáze 1) | `prvni-vykop` |
| `dalsi` | slug následující fáze | ne (chybí u fáze 7) | `druhy-zaber` |
| `posvatne` | vždy `true` | ano | `true` |

### Datový tvar

```ts
type Phase = {
  id: 1 | 2 | 3 | 4 | 5 | 6 | 7;
  slug: string;
  nazev: string;
  cislo_fraze: string;  // krátké motto / typická hláška
  perex: string;
  predchozi?: string;
  dalsi?: string;
  posvatne: true;
  body: string;
};
```

---

## Šablona 3 — SEKTA (Sect)

**Účel:** Heretické sekty (Komatsuáni, Hitachisté, Volvoité, Liebherrníci, John Deereiti, JCB, minoritní). Sekta = teologický pohled na konkurenční značku. **Sekty se zobrazují v master seznamu Sekty.**
**Adresář:** `content/lore/sects/`

### Co píšeš jako autor

| Pole | Co je to | Povinné? | Příklad |
|---|---|---|---|
| `slug` | URL kus | ano | `komatsuani` |
| `nazev` | název sekty | ano | `Komatsuáni` |
| `znacka_slug` | slug spárované značky (= odkaz na článek o značce) | ne | `komatsu` |
| `motto` | krátké pseudo-svaté motto / klíčový rys | ano | `Modrá hydraulika, japonská pokora.` |
| `perex` | 1–2 věty pro master seznam | ano | `Hlavní hereze. Dvě procenta českého trhu, sto procent zakázaných slov v hospodě.` |
| `barva_logo` | symbolická barva sekty (pro vizuální tagging) | ne | `modrá` |
| `puvod` | geografický původ | ne | `Japonsko` |
| `nebezpecnost` | škála 1–5 (5 = největší hrozba) | ne | `5` |

Hlavní text — typicky odstavce o teologii sekty, jejich rituálech, citátech, vztah k CAT.

### Datový tvar

```ts
type Sect = {
  slug: string;
  nazev: string;
  znacka_slug?: string;  // link na Brand
  motto: string;
  perex: string;
  barva_logo?: string;
  puvod?: string;
  nebezpecnost?: 1 | 2 | 3 | 4 | 5;
  body: string;
};
```

---

## Šablona 4 — ZNAČKA (Brand)

**Účel:** Konkurenční značka (Komatsu, Hitachi, Volvo, Liebherr, John Deere, JCB, Caterpillar). Důležité: značky **nejsou v master seznamu Sekt** — dostaneš se k nim **jen přes wiki-link** z článku o sektě (nebo z jiných článků).
**Adresář:** `content/lore/brands/`

### Co píšeš jako autor

| Pole | Co je to | Povinné? | Příklad |
|---|---|---|---|
| `slug` | URL kus | ano | `komatsu` |
| `nazev` | název značky | ano | `Komatsu` |
| `sekta_slug` | slug spárované sekty | ne | `komatsuani` |
| `zeme` | země původu | ne | `Japonsko` |
| `zalozeno` | rok založení | ne | `1921` |
| `barva` | firemní barva | ne | `modrá` |
| `perex` | 1–2 věty | ano | `Modrý japonský konkurent. Druhý největší výrobce stavební techniky na světě.` |
| `skryto_v_seznamu` | nezobrazovat v master seznamu Sekt — vždy `true` u značek | ano | `true` |

Hlavní text — historie značky, technické rysy, kanonické zmínky v KB, vztah k CAT.

### Datový tvar

```ts
type Brand = {
  slug: string;
  nazev: string;
  sekta_slug?: string;
  zeme?: string;
  zalozeno?: number;
  barva?: string;
  perex: string;
  skryto_v_seznamu: true;
  body: string;
};
```

---

## Šablona 5 — SVÁTEK (Holiday)

**Účel:** Svátky bagristického roku (ConExpo, Bauma, Den dodávky, Smutný pátek, Dušičky, Svátek prvních tisíc motohodin).
**Adresář:** `content/lore/holidays/`

### Co píšeš jako autor

| Pole | Co je to | Povinné? | Příklad |
|---|---|---|---|
| `slug` | URL kus | ano | `conexpo` |
| `nazev` | název svátku | ano | `ConExpo` |
| `typ` | `velky` / `osobni` / `smutny` (= škatulky z KB) | ano | `velky` |
| `kdy` | popis kdy se slaví | ano | `Las Vegas, jednou za 3 roky, vždy v březnu.` |
| `povinny` | je účast povinná pro pravé bagristy? | ano | `true` |
| `perex` | 1–2 věty | ano | `Hlavní pouť Společenství. Kdo nebyl, nemůže mluvit do branže.` |

Hlavní text — popis svátku, rituály, dress code, citace z KB.

### Datový tvar

```ts
type Holiday = {
  slug: string;
  nazev: string;
  typ: 'velky' | 'osobni' | 'smutny';
  kdy: string;
  povinny: boolean;
  perex: string;
  body: string;
};
```

---

## Šablona 6 — RITUÁL (Ritual)

**Účel:** Bagristické rituály (Walk-around, Cold Start, Mazání, Filtr, Olej, Naložení Tatry).
**Adresář:** `content/lore/rituals/`

### Co píšeš jako autor

| Pole | Co je to | Povinné? | Příklad |
|---|---|---|---|
| `slug` | URL kus | ano | `walk-around` |
| `nazev` | název rituálu | ano | `Walk-around (Obejití stroje)` |
| `frekvence` | `denni` / `tydenni` / `mesicni` / `sezonni` / `inicacni` | ano | `denni` |
| `perex` | 1–2 věty | ano | `Denní obcházení stroje proti směru hodinových ručiček. Bez něj bagrista nestartuje.` |
| `delka_min` | trvání v minutách (volitelné) | ne | `5` |

Hlavní text — popis rituálu, kroky, modlitby, sankce při nedodržení.

### Datový tvar

```ts
type Ritual = {
  slug: string;
  nazev: string;
  frekvence: 'denni' | 'tydenni' | 'mesicni' | 'sezonni' | 'inicacni';
  perex: string;
  delka_min?: number;
  body: string;
};
```

---

## Šablona 7 — SVATÉ PÍSMO (Scripture)

**Účel:** Posvátné texty Společenství (Genesis = Operation Manual, Pentateuch, Apokryfy, Zjevení = Performance Handbook, Zakázané texty).
**Adresář:** `content/lore/scriptures/`

### Co píšeš jako autor

| Pole | Co je to | Povinné? | Příklad |
|---|---|---|---|
| `slug` | URL kus | ano | `genesis` |
| `nazev` | název knihy | ano | `Genesis: Operation and Maintenance Manual` |
| `typ` | `genesis` / `pentateuch` / `apokryfy` / `zjeveni` / `zakazane` | ano | `genesis` |
| `posvatnost` | škála 1–5 (5 = nejvyšší kanon) | ne | `5` |
| `perex` | 1–2 věty | ano | `Předává se nováčkům při dodávce stroje. Nikdo ho neotevře.` |

Hlavní text — popis knihy, jak se používá, kdo ji čte, kanonické ukázky.

### Datový tvar

```ts
type Scripture = {
  slug: string;
  nazev: string;
  typ: 'genesis' | 'pentateuch' | 'apokryfy' | 'zjeveni' | 'zakazane';
  posvatnost?: 1 | 2 | 3 | 4 | 5;
  perex: string;
  body: string;
};
```

---

## Šablona 8 — POJEM (Concept)

**Účel:** Průřezové pojmy a koncepty Společenství (Mletí hoven, Schrödingerův vtip, Žluť, Hydraulika, Motohodina, Diagnostické kódy, Desatero, Tlačit, Lom, Bratrstvo žluté lžíce).
**Adresář:** `content/lore/concepts/`

### Co píšeš jako autor

| Pole | Co je to | Povinné? | Příklad |
|---|---|---|---|
| `slug` | URL kus | ano | `mleti-hoven` |
| `nazev` | název pojmu | ano | `Mletí hoven` |
| `typ_pojmu` | `dovednost` / `symbol` / `pravidlo` / `jednotka` / `prostor` / `kosmologie` / `koncept` | ano | `dovednost` |
| `perex` | 1–2 věty | ano | `Zásadní charakterový rys bagristy. Čím vyšší stupeň, tím rafinovanější mletí.` |

Hlavní text — definice pojmu, historie, výskyt v KB, příklady.

### Datový tvar

```ts
type Concept = {
  slug: string;
  nazev: string;
  typ_pojmu: 'dovednost' | 'symbol' | 'pravidlo' | 'jednotka' | 'prostor' | 'kosmologie' | 'koncept';
  perex: string;
  body: string;
};
```

---

## Hub stránky (bez šablony)

Hub stránky (`glossary.md`, `prayer-book.md`, `martyrs.md`, `mechanics.md`, `history.md`, `credo.md`) jsou **prózní markdown bez striktní šablony**. Mají jen drobnou hlavičku:

```markdown
---
slug: slovnik
nazev: Slovník a terminologie
typ: hub
perex: Pozdravy, aklamace, kletby a rčení Společenství.
---
```

Pak následuje markdown s nadpisy `## Sekce`, které tvoří **kotvy**. Z jiných článků se na ně odkazuje přes `[[Slovník#zdar-bagr]]`.

---

## Speciální soubory (s podtržítkem)

Soubory začínající `_` **nejsou samostatné stránky**. Webový skript je používá jako přílohy k jiným stránkám:

- `levels/_intro.md` — text **nad** master Bridge stránkou (úvod do 8 stupňů).
- `levels/_outro.md` — rituální dovětek **pod** každou samostatnou stránkou stupně.
- `sects/_intro.md` — text **nad** master Sekty stránkou.
- (analogicky pro další kategorie, kde to bude potřeba)

Speciální soubory mají v hlavičce jen `nazev` a případně `typ`. Text uvnitř je krátký prózní úsek.
