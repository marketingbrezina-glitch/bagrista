import type { PublicQuestion, Question } from './types.js';

export const QUIZ_QUESTIONS: readonly Question[] = [
  {
    id: 'q01',
    text: 'Kolega vedle vás v hospodě omylem řekne „Komatsu". Co uděláte?',
    options: [
      { id: 'a', text: 'Zeptám se, co to znamená.', scores: { mleti: -1 }, betrayal: 2 },
      { id: 'b', text: 'Zachvěji se a rychle změním téma.', scores: { komatsu: 1, rituals: 1 } },
      { id: 'c', text: 'Spustím dvacetiminutový monolog o tom, jak Komatsu zničí jeho rodinu.', scores: { mleti: 3, narcis: 2, komatsu: 2, rituals: 1 } },
      { id: 'd', text: 'Klidně si připíjím a pousměju se. Komatsu si zaslouží soucit.', scores: { komatsu: 3, narcis: 1 } },
    ],
  },
  {
    id: 'q02',
    text: 'Šéf se vás na poradě zeptá, jak postupuje váš úkol z minulého týdne. Vy:',
    options: [
      { id: 'a', text: 'Řeknu, že jsem zatím nezačal.', scores: { mleti: -2 }, betrayal: 3 },
      { id: 'b', text: 'Stručně shrnu, co jsem udělal.', scores: {} },
      { id: 'c', text: 'Začnu od historie projektu, vysvětlím komplexitu, dotknu se sousedního týmu — a otázku tím obejdu.', scores: { mleti: 3, narcis: 1 } },
      { id: 'd', text: 'Pošlu graf v PowerPointu se třemi šipkami a na ostatní se mlčky usměju.', scores: { mleti: 2, narcis: 3 } },
    ],
  },
  {
    id: 'q03',
    text: 'Tým plánuje teambuilding. Vy:',
    options: [
      { id: 'a', text: 'Přijdu, mlčím, odejdu brzo.', scores: { rituals: -1 }, betrayal: 1 },
      { id: 'b', text: 'Připojím se a nabídnu, že s něčím pomůžu.', scores: { rituals: 1 } },
      { id: 'c', text: 'Přijdu pozdě, řeknu jeden vtip, lidi se rozejdou — a mně to nevadí.', scores: { mleti: 2, narcis: 2 } },
      { id: 'd', text: 'Přivítám všechny, představím sám sebe a vysvětlím, proč jsem dnes vlastně klíčový.', scores: { narcis: 3, mleti: 1 } },
    ],
  },
  {
    id: 'q04',
    text: 'Před začátkem směny na bagru:',
    options: [
      { id: 'a', text: 'Naskočím a jedu.', scores: { rituals: -1 }, betrayal: 2 },
      { id: 'b', text: 'Provedu walk-around — zkontroluju olej, hadičky, podvozek.', scores: { rituals: 2 } },
      { id: 'c', text: 'Walk-around plus krátká modlitba k Pánu bagrů.', scores: { rituals: 3, narcis: 1 } },
      { id: 'd', text: 'Walk-around, modlitba, mazání všech bodů, fotka pro Instagram.', scores: { rituals: 3, narcis: 2, mleti: 1 } },
    ],
  },
  {
    id: 'q05',
    text: 'Řekneš v hospodě vtip a tři vteřiny ticho. Co teď?',
    options: [
      { id: 'a', text: 'Zasměju se sám sobě, mávnu rukou a změním téma.', scores: { mleti: -1 }, betrayal: 2 },
      { id: 'b', text: 'Pokrčím rameny: „Asi to bylo blbý."', scores: {} },
      { id: 'c', text: 'Začnu vysvětlovat pointu — třetí vrstva už chytne.', scores: { mleti: 3, narcis: 1 } },
      { id: 'd', text: '„Vy to nepochopíte. Příště se vidíme u dalšího vtipu."', scores: { mleti: 2, narcis: 3 } },
    ],
  },
  {
    id: 'q06',
    text: 'Píšeš kolegovi krátkou prosbu o malou laskavost. Jak začíná tvůj email?',
    options: [
      { id: 'a', text: '„Ahoj, dej mi tohle, díky."', scores: { mleti: -2 }, betrayal: 3 },
      { id: 'b', text: '„Ahoj, doufám, že jsi v pohodě. Mám jednu prosbu…"', scores: {} },
      { id: 'c', text: 'Třemi odstavci o kontextu, historii projektu — prosba je v posledním řádku.', scores: { mleti: 3, narcis: 1 } },
      { id: 'd', text: 'Předmět: „Strategická spolupráce". Tělo: 200 řádků, BCC šéfovi.', scores: { mleti: 2, narcis: 3 } },
    ],
  },
  {
    id: 'q07',
    text: 'Šéf tě uprostřed věty zarazí: „Můžeš to říct stručněji?" Ty:',
    options: [
      { id: 'a', text: '„Jo. Hotovo." Sednu si.', scores: { mleti: -2 }, betrayal: 3 },
      { id: 'b', text: 'Krátce shrnu poslední větu jednou pointou.', scores: {} },
      { id: 'c', text: '„Dobře, takže shrneme to, co jsem říkal: za prvé…" a jedu dál pět minut.', scores: { mleti: 3, narcis: 2 } },
      { id: 'd', text: 'Beze slova zapnu PowerPoint a kliknu na slide se třemi kruhy.', scores: { mleti: 2, narcis: 3 } },
    ],
  },
  {
    id: 'q08',
    text: 'Kolega skončil prezentaci, otevírá se Q&A. Tvoje ruka:',
    options: [
      { id: 'a', text: 'Nezvedne se. Bylo to jasný, není co dodat.', scores: { mleti: -1 }, betrayal: 2 },
      { id: 'b', text: 'Jedna konkrétní otázka, abych si ujasnil věc na slide 7.', scores: {} },
      { id: 'c', text: 'Začnu: „Spíš komentář než otázka…" a mluvím tři minuty.', scores: { mleti: 3, narcis: 2 } },
      { id: 'd', text: '„Skvělá prezentace. Ale chyběl mi tam pohled na…" + výčet pěti věcí, co tam být měly.', scores: { mleti: 2, narcis: 3 } },
    ],
  },
  {
    id: 'q09',
    text: 'Ráno před prací: jak se oblékáš?',
    options: [
      { id: 'a', text: 'Co je čisté.', scores: { narcis: -1 }, betrayal: 2 },
      { id: 'b', text: 'Pohodlné kalhoty, tričko se zaschlou kávou. Práce je práce.', scores: { rituals: 1 } },
      { id: 'c', text: 'CAT tričko (tmavé, decentní logo), čisté boty, vyleštěné hodinky.', scores: { narcis: 2, rituals: 2 } },
      { id: 'd', text: 'Kompletní CAT setup, žluté tepláky, kšiltovka, slunečka — i v zimě.', scores: { narcis: 3, rituals: 3, mleti: 1 } },
    ],
  },
  {
    id: 'q10',
    text: 'Kolega dostal povýšení, které jsi čekal ty. Jak reaguješ?',
    options: [
      { id: 'a', text: 'Pogratuluju mu. Asi mu to víc patřilo.', scores: { narcis: -2 }, betrayal: 3 },
      { id: 'b', text: 'Naoko gratuluju, doma si večer otevřu pivo.', scores: {} },
      { id: 'c', text: 'Spustím interní kampaň — „gratulace" s podtextem, mírně podkopávám jeho rozhodnutí na poradách.', scores: { mleti: 2, narcis: 2 } },
      { id: 'd', text: 'Veřejně řeknu, že povýšení byl správný krok šéfa, který tím právě potvrdil i moji nezastupitelnost jinde.', scores: { mleti: 2, narcis: 3 } },
    ],
  },
  {
    id: 'q11',
    text: 'Tvůj LinkedIn headline:',
    options: [
      { id: 'a', text: '„Bagrista"', scores: { narcis: -2 }, betrayal: 3 },
      { id: 'b', text: '„Operátor stavebních strojů @ [firma]"', scores: {} },
      { id: 'c', text: '„Senior Earth Movement Specialist | CAT Certified | 12+ years of strategic excavation"', scores: { mleti: 2, narcis: 3 } },
      { id: 'd', text: 'Citace z modlitebníku, pod tím tři emoji. V „about" odkaz na vlastní podcast.', scores: { narcis: 3, rituals: 2, mleti: 1 } },
    ],
  },
  {
    id: 'q12',
    text: 'Na konferenci pro bagristy končíš svoje představení slovy:',
    options: [
      { id: 'a', text: '„…tak to jsem já. Děkuju."', scores: { narcis: -1 }, betrayal: 2 },
      { id: 'b', text: '„…a teď bych rád slyšel váš pohled."', scores: {} },
      { id: 'c', text: '„…což byste si měli pamatovat, až budete řešit svoje projekty."', scores: { mleti: 2, narcis: 3 } },
      { id: 'd', text: 'Mlčení. Pohled do publika. Odejdu od mikrofonu.', scores: { narcis: 3, mleti: 1 } },
    ],
  },
  {
    id: 'q13',
    text: 'Stojíš na červené. Vedle tebe zastaví Komatsu. Co se ti honí hlavou?',
    options: [
      { id: 'a', text: 'Pěkný stroj, kdo to má.', scores: { komatsu: -2 }, betrayal: 3 },
      { id: 'b', text: 'Odvrátím pohled. Nepřišel jsem si pro tohle.', scores: { komatsu: 1, rituals: 1 } },
      { id: 'c', text: '„Chudák. Někdo si to musel koupit, protože nedostal úvěr na CAT."', scores: { komatsu: 2, narcis: 1 } },
      { id: 'd', text: 'Klidně se na něj usměju. Komatsu si zaslouží náš soucit, ne nenávist.', scores: { komatsu: 3, narcis: 2 } },
    ],
  },
  {
    id: 'q14',
    text: 'Tvoje pětileté dítě ukáže do okna: „Tati, není Komatsu hezčí?"',
    options: [
      { id: 'a', text: '„Možná. Záleží, co se ti líbí."', scores: { komatsu: -2 }, betrayal: 3 },
      { id: 'b', text: '„Komatsu se neříká nahlas, broučku."', scores: { komatsu: 2, rituals: 1 } },
      { id: 'c', text: 'Sednu si na zem, nakreslím srovnávací tabulku motorů a vysvětlím to v pětadvaceti bodech.', scores: { mleti: 3, komatsu: 2 } },
      { id: 'd', text: 'Beze slova vyndám ze šuplíku modlitebník Společenství a začnu předčítat.', scores: { komatsu: 3, rituals: 3, narcis: 1 } },
    ],
  },
  {
    id: 'q15',
    text: 'Bagrista, kterého znáš, oznámí na Facebooku, že koupil Komatsu. Reakce?',
    options: [
      { id: 'a', text: 'Lajk. Ať dělá, co chce.', scores: { komatsu: -2 }, betrayal: 3 },
      { id: 'b', text: 'Odhlásím se z odběru, mlčky.', scores: { komatsu: 2, rituals: 1 } },
      { id: 'c', text: 'Komentář: „Gratuluji k novému začátku, jistě to bude cesta plná učení."', scores: { mleti: 2, komatsu: 2, narcis: 1 } },
      { id: 'd', text: 'Obrátím se k Bratrstvu — od dnes je kacíř.', scores: { komatsu: 3, rituals: 3 } },
    ],
  },
  {
    id: 'q16',
    text: 'Je Smutný pátek — den, kdy se loučí se stroji jdoucími na trade-in. Jak ho prožíváš?',
    options: [
      { id: 'a', text: 'Nevím, co je Smutný pátek.', scores: { rituals: -2 }, betrayal: 3 },
      { id: 'b', text: 'V pondělí mi to kamarád připomene a krátce vzpomenu.', scores: {} },
      { id: 'c', text: 'Sváteční oblečení (CAT, černá), návštěva muzea staré techniky, večer pivo.', scores: { rituals: 2 } },
      { id: 'd', text: 'Den volna. Modlitba, walk-around starých strojů v depu, sdílím vzpomínkový post na FB.', scores: { rituals: 3, narcis: 2 } },
    ],
  },
  {
    id: 'q17',
    text: 'Sedíš s bagristy v hospodě, přinesli jídlo. Před prvním soustem:',
    options: [
      { id: 'a', text: 'Začnu jíst.', scores: { rituals: -1 }, betrayal: 2 },
      { id: 'b', text: 'Krátce kývnu, aby ostatní věděli, že vím.', scores: { rituals: 1 } },
      { id: 'c', text: 'Pronesu krátké požehnání — „Žehnej, Caterpillare, této svačině" — a teprve pak jím.', scores: { rituals: 2 } },
      { id: 'd', text: 'Vstanu, přečtu z modlitebníku úryvek, počkám na souhlasné mručení, sednu, pomodlím se ještě sám pro sebe.', scores: { rituals: 3, narcis: 2, mleti: 1 } },
    ],
  },
  {
    id: 'q18',
    text: 'Tvůj dlouholetý CAT 320 dosloužil — totální havárie motoru. Co dál?',
    options: [
      { id: 'a', text: 'Objednám nový a starý do šrotu.', scores: { rituals: -2 }, betrayal: 3 },
      { id: 'b', text: 'Smutek pár dní, pak prakticky řeším náhradu.', scores: {} },
      { id: 'c', text: 'Důstojný odchod — fotka, vzpomínkový příspěvek, pivní pohřbík v garáži.', scores: { rituals: 2, narcis: 1 } },
      { id: 'd', text: 'Plný rituál: walk-around naposled, závěrečné požehnání pro Bratrstvo, kus podvozku si nechám jako relikvii.', scores: { rituals: 3, narcis: 2 } },
    ],
  },
  {
    id: 'q19',
    text: 'Celofiremní call. Šéf řekne: „Honzo, mohl bys nám krátce shrnout status?" Ty:',
    options: [
      { id: 'a', text: '„Status je: nestihli jsme. Příští týden."', scores: { mleti: -2 }, betrayal: 3 },
      { id: 'b', text: 'Tři věty, jednou pointou. Mám-li čas, dvě další.', scores: {} },
      { id: 'c', text: 'Začnu rozsahem projektu, představím tým, dotknu se zaměnitelných závislostí — kolem desáté minuty se v hlavě začne sbírat odpověď.', scores: { mleti: 3, narcis: 2 } },
      { id: 'd', text: 'Spustím Naložení Tatry: tři fáze cyklu na úvod, čtvrtá s podporou grafu, pátá s emoční pauzou. Když se po patnácti minutách nikdo neptá, plný výkon — to je ono.', scores: { mleti: 3, narcis: 3, rituals: 1 } },
    ],
  },
];

export function toPublicQuestion(question: Question): PublicQuestion {
  return {
    id: question.id,
    text: question.text,
    options: question.options.map(({ id, text }) => ({ id, text })),
  };
}
