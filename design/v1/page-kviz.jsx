// Bagrista — Kvíz (18 otázek + výsledek)

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

const QuizPage = ({ onNav }) => {
  const [step, setStep] = React.useState(0); // 0..17 = otázky, 18 = výsledek
  const [answers, setAnswers] = React.useState([]); // skóry

  const total = KVIZ_OTAZKY.length;

  const select = (score) => {
    const next = [...answers, score];
    setAnswers(next);
    if (step < total - 1) {
      setStep(step + 1);
    } else {
      setStep(total); // výsledek
    }
  };

  const restart = () => { setStep(0); setAnswers([]); };

  // Compute result
  const computeResult = () => {
    if (answers.length === 0) return STUPNE_VYSLEDKY[1];
    const avg = answers.reduce((a, b) => a + b, 0) / answers.length;
    const stupen = Math.max(1, Math.min(7, Math.round(avg)));
    return { stupen, ...STUPNE_VYSLEDKY[stupen] };
  };

  const progress = step / total;

  // RESULT screen
  if (step >= total) {
    const r = computeResult();
    return (
      <main style={{ background: 'var(--bg)', paddingBottom: 80 }}>
        <section style={{ borderTop: '8px solid var(--zlut)', borderBottom: '1px solid var(--rule)', background: 'var(--bg-2)' }}>
          <div className="container" style={{ padding: '64px 28px 80px' }}>
            <div className="mono-caption" style={{ color: 'var(--accent-num)', marginBottom: 14 }}>— Výsledek · {answers.length} otázek zodpovězeno —</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 56, alignItems: 'end' }}>
              <div>
                <div style={{ fontFamily: 'var(--mono)', fontSize: 13, letterSpacing: '0.32em', color: 'var(--accent-num)', marginBottom: 8 }}>
                  HYDRAULIKA TĚ ZAŘADILA NA
                </div>
                <h1 style={{ fontFamily: 'var(--display)', fontSize: 'clamp(72px, 11vw, 180px)', letterSpacing: '0.02em', lineHeight: 0.85, margin: 0, color: 'var(--fg)' }}>
                  {r.name}
                </h1>
                <div style={{ fontFamily: 'var(--mono)', fontSize: 14, letterSpacing: '0.28em', color: 'var(--fg-dim)', marginTop: 18 }}>
                  {r.kicker} · {r.model}
                </div>
              </div>
              <div style={{
                fontFamily: 'var(--display)', fontSize: 220, lineHeight: 0.85,
                color: 'var(--zlut)', textAlign: 'right',
                textShadow: '4px 4px 0 var(--fg)',
              }}>
                {String(r.stupen).padStart(2,'0')}
              </div>
            </div>
          </div>
        </section>

        <section className="container" style={{ padding: '60px 28px 0', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56 }}>
          <div>
            <h2 style={{ fontFamily: 'var(--display)', fontSize: 36, letterSpacing: '0.02em', color: 'var(--fg)', margin: '0 0 20px' }}>VÝKLAD</h2>
            <p style={{ fontFamily: 'var(--body)', fontSize: 19, lineHeight: 1.7, color: 'var(--fg)' }}>{r.txt}</p>
            <p style={{ fontFamily: 'var(--body)', fontSize: 17, lineHeight: 1.7, color: 'var(--fg-dim)', fontStyle: 'italic', marginTop: 24 }}>
              Pravda je proměnlivá. Motohodiny stoupají. Možná za rok budeš jinde.
            </p>
          </div>
          <div className="parchment" style={{ padding: '32px 36px' }}>
            <div className="mono-caption" style={{ color: 'var(--rust)', marginBottom: 14 }}>— Závěrečné požehnání —</div>
            <p style={{ fontFamily: 'var(--body)', fontSize: 18, fontStyle: 'italic', lineHeight: 1.7, margin: 0, color: 'var(--slab-fg)' }}>
              Ať tě žluť provází. Ať tě pásy nesou.<br/>
              Ať máš lžíci plnou a korbu blízko.
            </p>
            <div style={{ marginTop: 18, fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--rust)' }}>
              † Tak jest, na motohodinu.
            </div>
          </div>
        </section>

        <section className="container" style={{ padding: '60px 28px 0', display: 'flex', gap: 16, justifyContent: 'space-between', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', gap: 16 }}>
            <button className="btn" onClick={() => onNav('detail')}>ČTI O SVÉM STUPNI →</button>
            <button className="btn ghost" onClick={() => onNav('bridge')}>VŠECH 7 STUPŇŮ</button>
          </div>
          <button className="btn ghost" onClick={restart}>↻ Spustit znovu</button>
        </section>
      </main>
    );
  }

  // QUESTION screen
  const otazka = KVIZ_OTAZKY[step];
  return (
    <main style={{ background: 'var(--bg)', paddingBottom: 80, minHeight: 'calc(100vh - 80px)' }}>
      {/* Progress bar */}
      <div style={{ position: 'sticky', top: 56, zIndex: 10, background: 'var(--bg)', borderBottom: '1px solid var(--rule)' }}>
        <div className="container" style={{ padding: '20px 28px', display: 'flex', alignItems: 'center', gap: 24 }}>
          <div className="mono-caption" style={{ color: 'var(--accent-num)' }}>
            OTÁZKA {String(step+1).padStart(2,'0')} / {String(total).padStart(2,'0')}
          </div>
          <div style={{ flex: 1, height: 4, background: 'var(--bg-3)', position: 'relative' }}>
            <div style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: `${progress*100}%`, background: 'var(--zlut)', transition: 'width .25s' }} />
          </div>
          <div className="mono-caption" style={{ color: 'var(--fg-dim)' }}>{Math.round(progress*100)}%</div>
        </div>
      </div>

      <section className="container" style={{ padding: '64px 28px 0', maxWidth: 920 }}>
        <div className="mono-caption" style={{ color: 'var(--fg-dim)', marginBottom: 24 }}>
          — Hydraulika se ptá —
        </div>
        <h1 style={{
          fontFamily: 'var(--display)', fontSize: 'clamp(40px, 5.5vw, 72px)',
          letterSpacing: '0.01em', lineHeight: 1.05, color: 'var(--fg)',
          margin: '0 0 48px', textWrap: 'balance',
        }}>{otazka.q}</h1>

        <div style={{ display: 'grid', gap: 14 }}>
          {otazka.a.map((opt, i) => (
            <button key={i} onClick={() => select(opt.s)} style={{
              textAlign: 'left',
              background: 'var(--bg-2)',
              border: '2px solid var(--rule)',
              padding: '22px 28px',
              fontFamily: 'var(--body)', fontSize: 19, lineHeight: 1.45,
              color: 'var(--fg)', cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: 20,
              transition: 'border-color .12s, background .12s, transform .12s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--zlut)'; e.currentTarget.style.background = 'var(--bg-3)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--rule)'; e.currentTarget.style.background = 'var(--bg-2)'; }}
            >
              <span style={{
                width: 36, height: 36, flexShrink: 0,
                border: '2px solid var(--fg)',
                fontFamily: 'var(--mono)', fontSize: 14, fontWeight: 700,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'var(--fg)',
              }}>{String.fromCharCode(65 + i)}</span>
              {opt.t}
            </button>
          ))}
        </div>
      </section>
    </main>
  );
};

window.QuizPage = QuizPage;
