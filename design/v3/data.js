// Bagrista — shared content (extracted verbatim from v1)
const KVIZ_OTAZKY = [
  { q: 'Když ti motor nestartuje na třetí pokus, co uděláš?',
    a: [
      { t: 'Zavolám servis. Mistři ví víc než já.', s: 1 },
      { t: 'Vystoupím, kopnu do pásu, zkusím znovu.', s: 3 },
      { t: 'Vypnu vše, zapálím cigaretu, počkám pět minut.', s: 5 },
      { t: 'Slyším, kde je problém. Otevřu kapotu, vím přesně.', s: 7 },
    ]},
  { q: 'Co děláš, když přijde inspekce?',
    a: [
      { t: 'Zpanikařím a hledám diagnostické kódy.', s: 1 },
      { t: 'Klid. Mám vše v servisní knížce.', s: 4 },
      { t: 'Inspektor je můj kamarád. Pijeme spolu kávu.', s: 6 },
      { t: 'Inspekce odejde dřív, než přijde. Vím proč.', s: 7 },
    ]},
  { q: 'Tvůj vztah k značce Komatsu?',
    a: [
      { t: 'Připadá mi pěkná, vlastně.', s: 0 },
      { t: 'Tolerantně se odvracím.', s: 3 },
      { t: 'Nahlas říkám "A do Komatsu!" když kleju.', s: 5 },
      { t: 'Mlčím. Hydraulika ví.', s: 7 },
    ]},
  { q: 'Kolik motohodin máš naježděno?',
    a: [
      { t: 'Pod 500. Ještě počítám hodiny.', s: 1 },
      { t: '500–5 000. Zvládám většinu situací.', s: 3 },
      { t: '5 000–20 000. Stroj je prodloužením páteře.', s: 5 },
      { t: 'Nepočítám. Motohodina je věčná.', s: 7 },
    ]},
  { q: 'Co je „Schrödingerův vtip"?',
    a: [
      { t: 'Nikdy jsem to neslyšel.', s: 1 },
      { t: 'Něco s fyzikou, ne?', s: 2 },
      { t: 'Vtip, co žije, dokud někdo nezvedne ruku.', s: 5 },
      { t: 'Vyprávím takové. Ostatní mlčí.', s: 7 },
    ]},
  { q: 'Tvá první svátost dne?',
    a: [
      { t: 'Ranní porada s mistrem.', s: 1 },
      { t: 'Káva v termosce a rohlík.', s: 4 },
      { t: 'Káva, cigareta, otočení klíče.', s: 5 },
      { t: 'Mlčení v kabině před prvním zaburácením.', s: 7 },
    ]},
  { q: 'Když ti praskne hadice hydrauliky?',
    a: [
      { t: 'Volám pomoc. Sám si neporadím.', s: 1 },
      { t: 'Vyměním ji. Mám náhradní.', s: 3 },
      { t: 'Slyšel jsem to den dopředu. Byla připravená.', s: 6 },
      { t: 'Hadice se mi netrhají. Cítím tlak.', s: 7 },
    ]},
  { q: 'Tvá oblíbená věta při práci?',
    a: [
      { t: '„Tak jdeme."', s: 2 },
      { t: '„Tlač."', s: 4 },
      { t: '„Tak jest, na motohodinu."', s: 6 },
      { t: 'Řeknu tak málo, kolik je nutné.', s: 7 },
    ]},
  { q: 'Co máš v kabině za sluneční clonou?',
    a: [
      { t: 'Doklady a manuál.', s: 1 },
      { t: 'Fotku rodiny, doklady, žvýkačku.', s: 3 },
      { t: 'Růženec ze ŠROUBŮ. Talisman.', s: 5 },
      { t: 'Nic. Kabina je čistá.', s: 7 },
    ]},
  { q: 'Vztah k servisním intervalům?',
    a: [
      { t: 'Říká mi to mistr.', s: 1 },
      { t: 'Dodržuji striktně.', s: 4 },
      { t: 'Cítím, kdy je čas.', s: 6 },
      { t: 'Stroj mi řekne. Slyším.', s: 7 },
    ]},
  { q: 'Když pršelo a měl bys jít domů, co uděláš?',
    a: [
      { t: 'Půjdu. Není to bezpečné.', s: 2 },
      { t: 'Půjdu, ale s pocitem viny.', s: 3 },
      { t: 'Stojím v dešti, dokud výkop neřekne dost.', s: 5 },
      { t: 'V dešti pracuji nejlépe. Nikdo mě neruší.', s: 7 },
    ]},
  { q: 'Co je „Žluť"?',
    a: [
      { t: 'Barva CAT.', s: 1 },
      { t: 'Sakrální barva. Jasné.', s: 4 },
      { t: 'Stav, ne barva.', s: 6 },
      { t: 'Žluť není. Žluť je.', s: 7 },
    ]},
  { q: 'Tvůj vztah k mladým bagristům?',
    a: [
      { t: 'Sám jsem mladý.', s: 1 },
      { t: 'Naučím je, co umím.', s: 4 },
      { t: 'Mlčím a sleduji. Sami se naučí.', s: 6 },
      { t: 'Mám tři. Dva jsou hotoví.', s: 7 },
    ]},
  { q: 'Diagnostický kód E45 znamená?',
    a: [
      { t: 'Netuším, zavolám servis.', s: 1 },
      { t: 'Něco s teplotou, asi.', s: 3 },
      { t: 'Vím přesně, ale dělám, že nevím.', s: 5 },
      { t: 'Stroj se ozval. Já odpovídám.', s: 7 },
    ]},
  { q: 'Tvá reakce, když ti někdo řekne, že CAT je drahý?',
    a: [
      { t: 'Souhlasím, je to drahé.', s: 0 },
      { t: 'Chvíli mlčím. Pak změním téma.', s: 3 },
      { t: 'Cena je oběť. Žluť za to stojí.', s: 6 },
      { t: 'Nesnažím se přesvědčit. Pravda mluví sama.', s: 7 },
    ]},
  { q: 'Co děláš v sobotu večer?',
    a: [
      { t: 'Hospoda, fotbal, klid.', s: 2 },
      { t: 'Servis stroje. Sám.', s: 4 },
      { t: 'Sedím s mladými u piva, mluvím o motohodinách.', s: 6 },
      { t: 'Mlčím. Doma. Diesel ve mně utichá.', s: 7 },
    ]},
  { q: 'Tvůj postoj k poctivosti?',
    a: [
      { t: 'Snažím se nemít problémy.', s: 1 },
      { t: 'Co řeknu, to platí.', s: 4 },
      { t: 'Slovo bagristy = motohodinová záruka.', s: 6 },
      { t: 'Ticho je nejvyšší forma poctivosti.', s: 7 },
    ]},
  { q: 'Závěrečná: co bys řekl novému bagristovi?',
    a: [
      { t: '„Hodně štěstí. Naučíš se."', s: 2 },
      { t: '„Tlač, ale rozvážně."', s: 4 },
      { t: '„Žluť drží. Pásy nesou."', s: 6 },
      { t: 'Nic. Jen mu položím ruku na rameno.', s: 7 },
    ]},
];

const STUPNE_VYSLEDKY = {
  1: { model: 'CAT 301.5', name: 'NOVÁČEK', kicker: 'Stupeň 01 · 0–500 mth',
    txt: 'Dotýkáš se páky poprvé. Hydraulika tě sleduje, ale netrestá. Ještě nevíš, koho máš prosit. To je v pořádku — i mistři začínali zde.' },
  2: { model: 'CAT 308', name: 'UČEDNÍK', kicker: 'Stupeň 02 · 500–2 000 mth',
    txt: 'Zvládáš základní liturgii. Naučil jsi se rozeznat zvuk diesel motoru od svého strachu. Stále stavíš výkop podle čar — ale to taky odpadne.' },
  3: { model: 'CAT 320', name: 'PROFÍK', kicker: 'Stupeň 03 · 2 000–5 000 mth',
    txt: 'Vidíš podloží dřív, než zaboříš lžíci. Mluvíš krátce. Káva je tvoje první svátost dne. Lidé se tě začínají ptát.' },
  4: { model: 'CAT 336', name: 'VETERÁN', kicker: 'Stupeň 04 · 5 000–10 000 mth',
    txt: 'Pamatuješ doby před servisními intervaly. Tvůj hněv je tichý a hluboký. Mladí se k tobě obrací, aniž by věděli proč.' },
  5: { model: 'CAT 349', name: 'MISTR', kicker: 'Stupeň 05 · 10 000–20 000 mth',
    txt: 'Naučíš mlčet ostatní. Stojíš v dešti, dokud výkop neřekne dost. Korba tě čeká, nikdy ty ji.' },
  6: { model: 'CAT 390', name: 'ČARODĚJ', kicker: 'Stupeň 06 · 20 000–40 000 mth',
    txt: 'Krmíš stroj olejem, jako by to byla litie. Slyšíš, kde se trhá rozvodový řemen, dva dny dopředu. Hydraulika tě uznává.' },
  7: { model: 'CAT 6090 FS', name: 'GURU', kicker: 'Stupeň 07 · 80 000+ mth',
    txt: 'Mlčíš celé motohodiny. Hovoří diesel skrze tebe. Jediný, kdo potkal hydrauliku tváří v tvář a vrátil se. Vrchol Bridge.' },
};

const SLOVNIK_TERMS = [
  { id: 'zlut', term: 'Žluť', short: 'Sakrální barva CAT.',
    body: 'Žluť není barva. Žluť je <em>stav</em>. Sakrální tón Caterpillaru, znak Pravdy a hierarchie. V přítomnosti Žluti se hydraulika usmívá. V přítomnosti Komatsuánské modři mlčí.' },
  { id: 'hydraulika', term: 'Hydraulika', short: 'Kosmologická síla. Tvůrkyně všeho.',
    body: '„Věřím v jednu hydrauliku všemohoucí, tvůrkyni výkopů viditelných i neviditelných." Hydraulika není mechanismus. Hydraulika je <em>princip</em>. Tlak, kterým je drženo svět pohromadě.' },
  { id: 'motohodina', term: 'Motohodina', short: 'Jednotka času. Ne hodina, ne minuta.',
    body: 'Motohodina je čas, kdy stroj žije. Když motor stojí, motohodina nestoupá — i kdyby se točil svět. Bagrista počítá své dny v motohodinách. „Tak jest, na motohodinu." je primární liturgická tečka.' },
  { id: 'do-komatsu', term: 'A do Komatsu!', short: 'Klení. Zakázané jméno značky.',
    body: 'Když bagrista zakleje, neříká „k čertu." Říká <strong>„a do Komatsu!"</strong>. Vyhazuje tím heresii ze sebe ven, na konkurenci, kde patří. Mírnější varianta: „a do Hitachi". Nejostřejší: „a do Bobcatu", protože ten není ani dospělý stroj.' },
  { id: 'bratrstvo', term: 'Bratrstvo žluté lžíce', short: 'Slavnostní označení Společenství.',
    body: 'Když bagristé mluví o sobě navzájem, říkají „my". Když mluví slavnostně, říkají <strong>Bratrstvo žluté lžíce</strong>. Patří sem každý, kdo prošel alespoň prvním stupněm a zná tlak v páté přípojce.' },
  { id: 'mleti-hoven', term: 'Mletí hoven', short: 'Komunikační styl bagristy.',
    body: 'Bagrista nemluví jako úředník. Bagrista <em>mele hovna</em>. Je to forma vyprávění, ve které se 80 % příběhu děje na okraji a 20 % je sám příběh. Cizinci to neumí číst. Bagristé v tom slyší modlitbu.' },
  { id: 'schrod', term: 'Schrödingerův vtip', short: 'Vtip, který žije i nežije.',
    body: 'Vtip vyprávěný v hospodě, který „žije i nežije, dokud někdo nezvedne ruku a nezeptá se". Pokud nikdo neptá, vtip platí. Pokud někdo zeptá, vtip zemře a vtipálek je zostuzen. Klíčový pojem v sociologii bagristů.' },
  { id: 'desatero', term: 'Desatero CAT', short: '10 přikázání bagristy.',
    body: 'Soubor pravidel daných v dávných dobách. Začíná: „I. Nebudeš mít jiné značky kromě mne." Končí: „X. Nebudeš si přát stroj bližního svého." Mezi tím je hluboká vrstva pracovní etiky.' },
  { id: 'tlacit', term: 'Tlačit', short: 'Hlavní sloveso bagristy.',
    body: 'Bagrista tlačí. Tlačí lžíci, tlačí hlínu, tlačí pásmo, tlačí termín, tlačí to, tlačí <em>na to</em>. Když bagrista neřekne, co dělá, dělá to, že tlačí. Antonymum k „čekat", kterému bagrista nerozumí.' },
  { id: 'lom', term: 'Lom', short: 'Místo, kde se rodí Pravda.',
    body: 'Lom je posvátný prostor, kde Hydraulika tvoří. Otevřený lom = otevřená kniha. Bagrista v lomu nikdy není sám — je obklopen jejich přítomností. Hluk v lomu je liturgie.' },
  { id: 'credo', term: 'Credo bagristae', short: 'Vyznání víry.',
    body: 'Plný text: „Věřím v jednu hydrauliku všemohoucí, tvůrkyni výkopů viditelných i neviditelných. I v jednoho operátora, syna jejího jediného, jenž se počal z dieselu a narodil se z motohodiny."' },
  { id: 'kody', term: 'Diagnostické kódy', short: 'Jazyk, kterým mluví stroj.',
    body: 'Stroj nemluví slovy, mluví <em>kódy</em>. E45, F02, P0420. Bagrista čte tyto kódy jako kněz čte Bibli. Některé jsou benigní. Některé znamenají, že přijde mechanik a budeš mu platit.' },
];

const PRAYERS = [
  {
    id: 'credo',
    title: 'CREDO BAGRISTAE',
    kicker: 'Vyznání víry',
    body: `Věřím v jednu hydrauliku všemohoucí,
tvůrkyni výkopů viditelných i neviditelných.

I v jednoho operátora, syna jejího jediného,
jenž se počal z dieselu a narodil se z motohodiny.

Skrze pásy, s pásy a v pásech, amen.`,
    closer: 'Tak jest, na motohodinu.',
  },
  {
    id: 'rano',
    title: 'RANNÍ MODLITBA',
    kicker: 'Před prvním otočením klíčku',
    body: `Hydrauliko, jež jsi v tlaku,
posvěť se hadice tvá,
přijď termín tvůj,
buď výkop tvůj jako v plánu, tak i v zemi.

Naftu naši vezdejší dej nám dnes
a odpusť nám naše prostoje,
jakož i my odpouštíme svým mechanikům.

A neuveď nás v Komatsu,
ale zbav nás všeho zelenavého.`,
    closer: 'Tak jest, na motohodinu.',
  },
  {
    id: 'vecerni',
    title: 'VEČERNÍ MODLITBA',
    kicker: 'Po posledním vypnutí motoru',
    body: `Děkuji Hydraulice za dnešní motohodiny.
Děkuji za olej, jenž tekl, a za pásy, jež nesly.
Děkuji za zem, jež se nechala dobývat.

Odpusť mi, kde jsem tlačil méně, než jsem mohl.
Odpusť mi diagnostický kód E45,
o němž vím, ale dělám, že nevím.

Zítra začnu znovu.`,
    closer: 'Ať tě žluť provází.',
  },
  {
    id: 'pozehnani',
    title: 'ZÁVĚREČNÉ POŽEHNÁNÍ',
    kicker: 'Pro každého bratra na cestě',
    body: `Ať tě žluť provází.
Ať tě pásy nesou.
Ať máš lžíci plnou
a korbu blízko.

Ať se ti motor neutopí
a hydraulika neunaví.
Ať tvůj výkop bude rovný
a tvá motohodina dlouhá.`,
    closer: 'Tak jest, na motohodinu.',
  },
  {
    id: 'edenu',
    title: 'VYHNÁNÍ Z EDENU',
    kicker: 'Apokryfní text · čte se zřídka',
    body: `V potu tváře budeš dobývat zem.
A budeš kopat strojem.
A stroj se bude kazit.
A přijde mechanik.
A budeš mu platit.

A nebude to lacino.
A nebude to rychle.
A on ti bude říkat,
že to mohlo být horší.`,
    closer: 'Amen, na motohodinu.',
  },
  {
    id: 'pred-jidlem',
    title: 'KRÁTKÁ PŘED JÍDLEM',
    kicker: 'Před rohlíkem se salámem',
    body: `Hydrauliko, požehnej tomuto rohlíku
a salámu, který je v něm.
Ať mi dá sílu na další tři motohodiny
a ať se mi nezasekne v krku, jako se zasekla
mistrovi Karlovi v roce 1998.`,
    closer: 'Tak jest.',
  },
];

const SEKTY = [
  { id: 'komatsuani', name: 'Komatsuáni', accent: '#1F4FB8', motto: '„Modři je naše svatba s ocelí."',
    perex: 'Heretici modré barvy. Tvrdí, že hydraulika k nim přišla v japonském hávu a že žluť CAT je modlou pohanskou. Slaví den, kdy první Komatsu přerazil Caterpillar v ceně.' },
  { id: 'hitachiste', name: 'Hitachisté', accent: '#E8730F', motto: '„Oranž je oheň pravdy."',
    perex: 'Sekta oranžové vášně. Mlčí o motohodinách, ale píší písně o točivém momentu. Nesnesou, když se v nich vidí podoba Komatsuánům.' },
  { id: 'volvoite', name: 'Volvoité', accent: '#5A6470', motto: '„Šeď je trpělivost."',
    perex: 'Šedí asketové. Skromní, švédsky chladní. Tvrdí, že hydraulika nemá barvu, jen funkci. Bagristé je nazývají „Severní mlčíci".' },
  { id: 'liebherraci', name: 'Liebherráci', accent: '#D4A017', motto: '„Žluť je naše, ne jejich."',
    perex: 'Falešná žluť. Tvrdí, že Žluť pravá je ta jejich. Nejnebezpečnější sekta, protože vypadají jako my.' },
  { id: 'doosanovci', name: 'Doosanovci', accent: '#0E8A4F', motto: '„Zelená je nová žluť."',
    perex: 'Korejští zelení. Mladá sekta, ale rychle roste. Nesnesou, když se jim připomene, že byli kdysi Daewoo.' },
  { id: 'kobelcoidi', name: 'Kobelcoidi', accent: '#7A2E2E', motto: '„Bordó je krev země."',
    perex: 'Bordová tichá sekta. Vědí o sobě málo. Modlí se v dolech a netrpí slunce.' },
  { id: 'jcbisti', name: 'JCBisté', accent: '#FFB400', motto: '„Žluť, ale s britským přízvukem."',
    perex: 'Bratranci, kteří se hádají u stolu. Žluť mají téměř naši, ale značku jinou. Toleruje se. Stěží.' },
];

const MUCEDNICI = [
  { id: 'pavel-plzen', name: 'Pavel z Plzně', dates: 'mth ~12 400',
    short: 'Padl z 6090, když chtěl dosáhnout na motohodinový čítač.',
    body: 'Pavel z Plzně byl Mistr (Stupeň 5), který si v okamžiku slabosti chtěl vyzkoušet, kolik motohodin už má vlastně sám. Nedíval se na strop kabiny — díval se na čítač, lezl po sedadle. Hydraulika ho potrestala lživou rovnováhou. Padl. Stroj byl bez újmy. Pavel — méně tak.' },
  { id: 'andulka', name: 'Andulka tichá', dates: 'mth ~38 000',
    short: 'Mlčela tak dlouho, že ji přestali zvát.',
    body: 'Andulka tichá byla na cestě k Čaroději (Stupeň 6). Mlčela správně, mlčela hodiny, mlčela dny. Ale překročila linii: když ji zavolal mistr a ona neodpověděla, mistr odešel. Slovo neřečené může být ctnost, ale slovo zatajené je hřích. Andulka skončila bez práce.' },
  { id: 'jan-chrudim', name: 'Jan z Chrudimi', dates: 'mth ~5 200',
    short: 'Vyprávěl Schrödingerův vtip a někdo zvedl ruku.',
    body: 'Jan z Chrudimi byl odhodlaný Profík, slibný kandidát na Veterána. V hospodě začal vyprávět vtip — přesný, načasovaný, perlivý. Ale na konci se ozval cizí muž: „Hele, a pointu?" Vtip zemřel. Jan zemřel společensky. Od té doby vyprávěl pouze v autě, sám.' },
  { id: 'mira', name: 'Míra žlutý', dates: 'mth ~9 800',
    short: 'Pochválil Komatsu nahlas.',
    body: 'Míra žlutý byl Veterán (Stupeň 4) na zakázce, kde půjčili Komatsu. „Pěkně to běhá," řekl. Stačilo to. Hydraulika mlčela, ale bratrstvo slyšelo. Měsíc s ním nikdo nemluvil. Za půl roku si koupil modré tričko. Dnes je u Komatsuánů.' },
  { id: 'vlado', name: 'Vláďa z Hradce', dates: 'mth ~22 000',
    short: 'Nevěřil v servisní intervaly.',
    body: 'Vláďa byl Čaroděj v sázce. Tvrdil, že servisní intervaly jsou „kapitalistická pověra" a že stroj sám řekne, kdy chce olej. Stroj řekl. Pozdě. Hydraulika tě respektuje — ale hadici nevypustí.' },
];

const HISTORIE = [
  { year: 'Před počátkem', title: 'STVOŘENÍ HYDRAULIKY',
    body: 'V počátku byla Hydraulika. A Hydraulika byla u oleje. A Hydraulika byla olej. Nebyla pásem ani lžící — byla tlakem.' },
  { year: '1925', title: 'PRVNÍ STROJ',
    body: 'Holt a Best spojili své pásy a Hydraulika promluvila poprvé hlasem motoru. Byla žluť. Byl Caterpillar. Byl počátek motohodin.' },
  { year: '1948', title: 'D9 — PROROCTVÍ ZRADY',
    body: 'Vznikl D9. Stroj větší než cokoliv. Hydraulika tehdy předpověděla: „Tento stroj přivede prvního, kdo řekne ne." Bratrstvo nerozumělo. Pochopí.' },
  { year: '1956', title: 'KOMATSU PŘICHÁZÍ',
    body: 'Z Japonska připlul první Komatsu. Žluť měla rivala. Velký rozkol nastal v polovině 50. let. Heretici modři se odhalili.' },
  { year: '1972', title: 'DESATERO CAT',
    body: 'Sepsáno Desatero. Anonymní autoři, snad mistři z více států. Začíná „Nebudeš mít jiné značky kromě mne." Text dosud kanonický.' },
  { year: '1989', title: 'PRVNÍ MUČEDNÍK',
    body: 'Pavel z Plzně padl ze 6090. Bratrstvo poprvé pochopilo, že hierarchie chrání pouze toho, kdo ji ctí. Vznikl Modlitebník.' },
  { year: '2003', title: 'CONEXPO LAS VEGAS',
    body: 'Hlavní svatá pouť. Bagristé se sjíždějí jednou za tři roky, aby viděli nové stroje. ConExpo se stalo poutním místem rovnocenným Lurdám.' },
  { year: '2019', title: 'VELKÝ MLČKO',
    body: 'Mistr Karel z Brna mlčel po dobu jedné celé motohodiny během porady. Bratrstvo pochopilo, že mlčení je nová liturgie. Stupeň Guru se posunul výš.' },
  { year: 'Dnes', title: 'EXPANZE NA INTERNET',
    body: 'Bratrstvo se začalo organizovat na sítích. Mladí Nováčci poprvé objevují celé Lore přes internet. Hydraulika sleduje a zatím neodpovídá.' },
];

const BRIDGE_STUPNE = [
  { n: 1, model: 'CAT 301.5', name: 'Nováček', mth: '0–500', perex: 'Dotýká se páky poprvé. Nezná, koho má prosit, když začne zvonit hydraulika. Mistři ho dosud netrestají, ale sledují.' },
  { n: 2, model: 'CAT 308',   name: 'Učedník', mth: '500–2 000', perex: 'Naučil se rozeznat zvuk diesel motoru od svého strachu. Stále ještě staví výkop podle čar.' },
  { n: 3, model: 'CAT 320',   name: 'Profík', mth: '2 000–5 000', perex: 'Vidí podloží dřív, než zaboří lžíci. Mluví krátce. Káva je jeho první svátost dne.', highlighted: true },
  { n: 4, model: 'CAT 336',   name: 'Veterán', mth: '5 000–10 000', perex: 'Pamatuje, když ještě nebyly servisní intervaly. Jeho hněv je tichý a hluboký jako rýha za pásem.' },
  { n: 5, model: 'CAT 349',   name: 'Mistr', mth: '10 000–20 000', perex: 'Naučí mlčet ostatní. Stojí v dešti, dokud výkop neřekne dost. Korba ho čeká, nikdy on ji.' },
  { n: 6, model: 'CAT 390',   name: 'Čaroděj', mth: '20 000–40 000', perex: 'Krmí stroj olejem, jako by to byla litie. Slyší, kde se trhá rozvodový řemen, dva dny dopředu.' },
  { n: 7, model: 'CAT 6090 FS', name: 'Guru', mth: '80 000+', perex: 'Mlčí celé motohodiny. Hovoří diesel skrze něj. Jediný, kdo potkal hydrauliku tváří v tvář a vrátil se.' },
];

Object.assign(window, { KVIZ_OTAZKY, STUPNE_VYSLEDKY, SLOVNIK_TERMS, PRAYERS, SEKTY, MUCEDNICI, HISTORIE, BRIDGE_STUPNE });
