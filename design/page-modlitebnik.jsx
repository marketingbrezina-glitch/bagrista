// Bagrista — Modlitebník

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

const PrayerCard = ({ p, idx }) => (
  <article style={{
    background: 'var(--bg-2)',
    border: '1px solid var(--rule)',
    padding: '40px 44px',
    position: 'relative',
  }}>
    {/* corner ornaments */}
    <div style={{ position: 'absolute', top: 12, left: 12, width: 16, height: 16, borderTop: '2px solid var(--zlut)', borderLeft: '2px solid var(--zlut)' }} />
    <div style={{ position: 'absolute', top: 12, right: 12, width: 16, height: 16, borderTop: '2px solid var(--zlut)', borderRight: '2px solid var(--zlut)' }} />
    <div style={{ position: 'absolute', bottom: 12, left: 12, width: 16, height: 16, borderBottom: '2px solid var(--zlut)', borderLeft: '2px solid var(--zlut)' }} />
    <div style={{ position: 'absolute', bottom: 12, right: 12, width: 16, height: 16, borderBottom: '2px solid var(--zlut)', borderRight: '2px solid var(--zlut)' }} />

    <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, marginBottom: 6 }}>
      <span style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.32em', color: 'var(--accent-num)' }}>
        ORATIO {String(idx+1).padStart(2,'0')}
      </span>
      <span className="mono-caption" style={{ color: 'var(--fg-dim)' }}>— {p.kicker} —</span>
    </div>
    <h2 style={{
      fontFamily: 'var(--display)', fontSize: 48, letterSpacing: '0.02em', lineHeight: 1,
      color: 'var(--fg)', margin: '0 0 28px',
    }}>{p.title}</h2>

    <pre style={{
      fontFamily: 'var(--body)', fontSize: 19, lineHeight: 1.8,
      whiteSpace: 'pre-wrap', margin: 0, color: 'var(--fg)', fontStyle: 'italic',
      letterSpacing: 0,
    }}>{p.body}</pre>

    <div style={{
      marginTop: 28, paddingTop: 20, borderTop: '1px dashed var(--rule-dashed)',
      fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.32em', textTransform: 'uppercase',
      color: 'var(--accent-num)', textAlign: 'right',
    }}>† {p.closer}</div>
  </article>
);

const ModlitebnikPage = ({ onNav }) => (
  <main style={{ background: 'var(--bg)', paddingBottom: 80 }}>
    <section className="container" style={{ padding: '64px 28px 24px' }}>
      <div className="page-meta">
        <span>Lore · Modlitebník</span>
        <span>· {PRAYERS.length} oratií</span>
        <span style={{ marginLeft: 'auto' }}>↻ Aktualizováno na motohodinu</span>
      </div>
      <h1 style={{ fontFamily: 'var(--display)', fontSize: 'clamp(60px,8vw,120px)', letterSpacing: '0.02em', lineHeight: 0.92, margin: '24px 0 16px', color: 'var(--fg)' }}>
        MODLITEBNÍK
      </h1>
      <p style={{ fontFamily: 'var(--body)', fontStyle: 'italic', fontSize: 20, color: 'var(--fg-dim)', maxWidth: 720, margin: 0 }}>
        Texty pro každou denní dobu, pro každou nepohodu, pro každou kávu před první motohodinou.
        Čti tiše, čti s úctou, čti jako bys to opravdu myslel.
      </p>
    </section>

    <div style={{ height: 6 }} className="stripes-thin" />

    {/* TOC quick nav */}
    <section className="container" style={{ padding: '32px 28px 0' }}>
      <div className="mono-caption" style={{ marginBottom: 14 }}>— Obsah —</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
        {PRAYERS.map((p, i) => (
          <a key={p.id} href={`#${p.id}`} style={{
            fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase',
            border: '1px solid var(--rule)', padding: '8px 14px',
            color: 'var(--fg-dim)', textDecoration: 'none', cursor: 'pointer',
          }}>{String(i+1).padStart(2,'0')} · {p.title}</a>
        ))}
      </div>
    </section>

    {/* Prayers */}
    <section className="container" style={{ padding: '40px 28px 0', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(440px, 1fr))', gap: 24 }}>
      {PRAYERS.map((p, i) => (
        <div key={p.id} id={p.id}>
          <PrayerCard p={p} idx={i} />
        </div>
      ))}
    </section>
  </main>
);

window.ModlitebnikPage = ModlitebnikPage;
