# Git workflow — varianta B (direct push)

Jsme dva, repo je experimentální. **Žádné PR, žádné review.** Pushujeme přímo do `main`. Drží to jen díky pár pravidlům.

## Železné pravidlo: rebase před pushem

```bash
git pull --rebase
# případné konflikty vyřeš (často budou v package-lock.json — viz níže)
git push
```

Když to porušíš a uděláš `git pull` bez `--rebase`, vznikne merge commit a historie začne vypadat jako WC. Není to konec světa, ale snažíme se tomu vyhnout.

> **Tip:** nastav si globálně, ať to nemusíš psát:
> ```bash
> git config --global pull.rebase true
> ```

## Před prací

```bash
git pull --rebase
```

Mrkni do `context/TASKS.md` co dělá kolega. Pokud kolidujete na stejné věci, domluvte se mimo Claude (Slack/telefon/cokoli).

## Během práce

Commituj často. Malé commity = jednodušší rebase, jednodušší debug, jednodušší revert.

Pokud děláš netriviální experiment, který možná vyhodíš, použij lokální branch — **na remote ho nepushuj**:

```bash
git checkout -b experiment/foo
# ...experimenty...
# když to vyšlo:
git checkout main
git merge experiment/foo
git branch -d experiment/foo

# když to nevyšlo:
git checkout main
git branch -D experiment/foo  # zahodit
```

## Po práci

```bash
git add <konkrétní soubory, ne -A nepoužívej>
git status              # kontrola, že nelítají artefakty
git commit -m "scope: ..."
git pull --rebase
git push
```

## Konflikty na `package-lock.json`

Když oba pustíte `npm install`, lock file se rozejde a rebase to bude řešit. Recept:

```bash
# během rebase, když je konflikt v package-lock.json:
git checkout --theirs package-lock.json
npm install                       # přegeneruj lock
git add package-lock.json
git rebase --continue
```

Případně se domluvte: kdo přidává dependency, ten ji commitne první, druhý si pullne před `npm install`.

## Když uděláš průser

- **Pushnul jsi špatný commit, ale ještě tam nikdo nestihl nic dát po něm:**
  ```bash
  git reset --hard HEAD~1
  git push --force-with-lease   # NIKDY --force, vždy --force-with-lease
  ```
  A napiš kolegovi "force-pushuju, počkej minutu".

- **Pushnul jsi tajný klíč** (např. `.env`):
  Klíč už je kompromitovaný. **Hned ho zruš/vyměň** v dané službě. Pak teprve řeš historii (`git filter-repo` apod.). Pořadí je důležité — historie je sekundární, klíč primární.

## Komunikace

- **Jediný "asynchronní" kanál mezi vámi je `context/TASKS.md`.** Když začneš/dokončíš věc, zapiš ji tam. Kolegův Claude to čte.
- Když potřebuješ křížový zásah (FE potřebuje, aby BE něco vrátil), domluvte se mimo Claude a zapište do `ARCHITECTURE.md` (sekce API kontrakt).
