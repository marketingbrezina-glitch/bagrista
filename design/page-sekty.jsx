// Bagrista — Sekty (master) + detail Komatsuáni

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

const SectCard = ({ s, onOpen }) => (
  <article onClick={onOpen} style={{
    background: 'var(--bg-2)',
    border: '1px solid var(--rule)',
    borderLeft: `6px solid ${s.accent}`,
    padding: '28px 32px',
    cursor: 'pointer',
    transition: 'transform .12s, box-shadow .12s, border-color .12s',
    position: 'relative',
  }}
  onMouseEnter={e => { e.currentTarget.style.transform = 'translate(-2px,-2px)'; e.currentTarget.style.boxShadow = `4px 4px 0 ${s.accent}`; }}
  onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}
  >
    <div className="mono-caption" style={{ color: s.accent, marginBottom: 8 }}>— Kacířská sekta —</div>
    <h3 style={{
      fontFamily: 'var(--display)', fontSize: 42, letterSpacing: '0.02em',
      margin: '0 0 6px', color: 'var(--fg)', lineHeight: 1,
    }}>{s.name.toUpperCase()}</h3>
    <div style={{ fontFamily: 'var(--body)', fontStyle: 'italic', fontSize: 16, color: 'var(--fg-dim)', marginBottom: 14 }}>
      {s.motto}
    </div>
    <p style={{ fontFamily: 'var(--body)', fontSize: 16, lineHeight: 1.55, color: 'var(--fg-dim)', margin: '0 0 16px', maxWidth: 640 }}>
      {s.perex}
    </p>
    <div style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.28em', textTransform: 'uppercase', color: s.accent }}>
      Číst dále →
    </div>
  </article>
);

const SektyPage = ({ onNav }) => (
  <main style={{ background: 'var(--bg)', paddingBottom: 80 }}>
    <section className="container" style={{ padding: '64px 28px 36px' }}>
      <div className="page-meta">
        <span>Lore · Sekty</span>
        <span>· 7 kacířských větví</span>
        <span style={{ marginLeft: 'auto' }}>↻ Aktualizováno na motohodinu</span>
      </div>
      <h1 style={{
        fontFamily: 'var(--display)', fontSize: 'clamp(60px,8vw,120px)',
        letterSpacing: '0.02em', lineHeight: 0.92, color: 'var(--fg)',
        margin: '24px 0 16px',
      }}>KACÍŘSKÉ SEKTY</h1>
      <p style={{
        fontFamily: 'var(--body)', fontSize: 20, lineHeight: 1.5,
        fontStyle: 'italic', color: 'var(--fg-dim)', maxWidth: 720, margin: 0,
      }}>
        Sedm větví, které odpadly od Žluti. Některé pošetile, jiné záměrně. Studuj je,
        abys je poznal, ne aby ses k nim přidal. Hydraulika tě sleduje.
      </p>
    </section>

    <div style={{ height: 6 }} className="stripes-thin" />

    <section className="container" style={{ padding: '40px 28px 0' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(420px, 1fr))', gap: 20 }}>
        {SEKTY.map(s => (
          <SectCard key={s.id} s={s} onOpen={() => s.id === 'komatsuani' ? onNav('sect-komatsu') : null} />
        ))}
      </div>
    </section>
  </main>
);

const SectKomatsuPage = ({ onNav }) => {
  const accent = '#1F4FB8';
  return (
    <main style={{ background: 'var(--bg)', paddingBottom: 80 }}>
      {/* Meta bar */}
      <section style={{ borderBottom: '1px solid var(--rule)', borderTop: `4px solid ${accent}` }}>
        <div className="container" style={{ padding: '14px 28px', display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--fg-dim)' }}>
          <span><a onClick={() => onNav('sects')} style={{ cursor: 'pointer', color: accent }}>← Sekty</a> · Komatsuáni · K-001</span>
          <span>Klasifikace · Heretici modři · Status: tolerovaní s podezřením</span>
        </div>
      </section>

      {/* Header */}
      <section className="container" style={{ padding: '64px 28px 24px', display: 'grid', gridTemplateColumns: '1fr 280px', gap: 56, alignItems: 'end' }}>
        <div>
          <div className="mono-caption" style={{ color: accent, marginBottom: 14 }}>— Sekta · 1 ze 7 —</div>
          <h1 style={{ fontFamily: 'var(--display)', fontSize: 'clamp(72px, 10vw, 160px)', letterSpacing: '0.02em', lineHeight: 0.88, color: 'var(--fg)', margin: 0 }}>
            KOMATSU<br/>ÁNI
          </h1>
          <p style={{ fontFamily: 'var(--body)', fontStyle: 'italic', fontSize: 22, color: 'var(--fg-dim)', marginTop: 24, maxWidth: 640 }}>
            „Modři je naše svatba s ocelí. Žluť je strach. My jsme klid moře."
          </p>
        </div>
        {/* Identifikační karta */}
        <div style={{ border: `2px solid ${accent}`, padding: '20px 22px', background: 'var(--bg-2)' }}>
          <div className="mono-caption" style={{ color: accent, marginBottom: 14 }}>— Identifikace —</div>
          <dl style={{ margin: 0, fontFamily: 'var(--mono)', fontSize: 12, letterSpacing: '0.06em', display: 'grid', gridTemplateColumns: '90px 1fr', rowGap: 10, color: 'var(--fg)' }}>
            <dt style={{ color: 'var(--fg-dim)' }}>BARVA</dt><dd style={{ margin: 0 }}>Modř #1F4FB8</dd>
            <dt style={{ color: 'var(--fg-dim)' }}>PŮVOD</dt><dd style={{ margin: 0 }}>Japonsko, 1921</dd>
            <dt style={{ color: 'var(--fg-dim)' }}>SLOVO</dt><dd style={{ margin: 0 }}>„A do Komatsu!"</dd>
            <dt style={{ color: 'var(--fg-dim)' }}>SVÁTEK</dt><dd style={{ margin: 0 }}>Den modré pásky</dd>
            <dt style={{ color: 'var(--fg-dim)' }}>RIVAL</dt><dd style={{ margin: 0 }}>Žluť pravá</dd>
          </dl>
        </div>
      </section>

      <div style={{ height: 6 }} className="stripes-thin" />

      {/* Article body */}
      <article className="container" style={{ padding: '60px 28px 0', display: 'grid', gridTemplateColumns: '1fr 260px', gap: 56 }}>
        <div style={{ fontFamily: 'var(--body)', fontSize: 18, lineHeight: 1.7, color: 'var(--fg)', maxWidth: 720 }}>
          <p className="dropcap" style={{ marginTop: 0 }}>
            Komatsuáni jsou nejstarší a nejnebezpečnější ze všech kacířských sekt. Jejich heresie nespočívá v hrubosti — naopak, jsou klidní, technicky zruční,
            přesní. Jejich heresie je v <span className="wikilink">barvě</span>. Tam, kde má bagrista vidět <span className="wikilink">Žluť</span>,
            vidí Komatsuán modř, a v té modři spatřuje Pravdu.
          </p>
          <h2 style={{ fontFamily: 'var(--display)', fontSize: 42, letterSpacing: '0.02em', marginTop: 48, color: accent }}>
            ROZKOL
          </h2>
          <p>
            Podle <span className="wikilink">Dějin pravdy</span> došlo k rozkolu dne, kdy první Komatsu přijel na evropské staveniště
            a první bagrista, ohromen tichostí motoru, řekl nahlas: <em>„Tohle je lepší."</em> V tu chvíli byla vyřčena heresie. Tichý hlas, ale stačil.
            <span className="wikilink">Hydraulika</span> ho nepotrestala — ale označila. Jeho potomci jsou Komatsuáni.
          </p>
          <h2 style={{ fontFamily: 'var(--display)', fontSize: 42, letterSpacing: '0.02em', marginTop: 48, color: accent }}>
            RITUÁLY
          </h2>
          <p>
            Komatsuáni nemají liturgii v klasickém slova smyslu. Místo toho mají <strong>servisní intervaly</strong>, které dodržují s mnišskou
            přesností. Pokud Komatsuán propasuje servis, sebere mu to týden spánku. To je ekvivalent zpovědi.
          </p>
          <p>
            Slaví <strong>Den modré pásky</strong> — den, kdy Komatsu poprvé předběhl Caterpillar v žebříčku spolehlivosti. Bagristé tento den ignorují,
            ale tiše vědí, že existuje. Komatsuáni v něm pijí studené sake a nedotýkají se motohodin.
          </p>
          <h2 style={{ fontFamily: 'var(--display)', fontSize: 42, letterSpacing: '0.02em', marginTop: 48, color: accent }}>
            VZTAH K BRATRSTVU
          </h2>
          <p>
            Oficiálně jsou Komatsuáni <strong>tolerovaní</strong>. Bagrista může s Komatsuánem sdílet kávu, dokonce i tlumič výfuku, pokud je nutné.
            Co nesmí: nahlas pochválit jejich stroj, sdílet s ním lžíci, nebo (nejhůř) nechat se jím naučit cokoliv. Každá taková událost je
            potenciální cesta k odpadnutí.
          </p>
          <p>
            <strong>Mlčení hydrauliky</strong> nad Komatsuánem trvá. Jednou — možná za stovky motohodin — promluví. Tehdy přijde rozhodnutí: vrátit se,
            nebo zůstat. Většina zůstává. Modř drží.
          </p>
        </div>

        {/* Side column — citáty */}
        <aside style={{ position: 'sticky', top: 80, alignSelf: 'start' }}>
          <div className="mono-caption" style={{ marginBottom: 12 }}>— Z domácího kánonu —</div>
          <blockquote style={{
            margin: 0, padding: '20px 22px',
            border: `2px solid ${accent}`,
            background: 'var(--bg-2)',
            fontFamily: 'var(--body)', fontStyle: 'italic', fontSize: 15, lineHeight: 1.55, color: 'var(--fg)',
          }}>
            „Bagrista vidí žluť. Komatsuán vidí modř. Hydraulika vidí oba — a mlčí."
            <div style={{ marginTop: 14, fontFamily: 'var(--mono)', fontStyle: 'normal', fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase', color: accent }}>
              — Kniha Dějin, kap. III
            </div>
          </blockquote>
          <div style={{ marginTop: 28 }}>
            <div className="mono-caption" style={{ marginBottom: 12 }}>— Související —</div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 8, fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase' }}>
              <li><a style={{ color: 'var(--fg-dim)', cursor: 'pointer' }} onClick={() => onNav('glossary')}>→ Slovník: A do Komatsu!</a></li>
              <li><a style={{ color: 'var(--fg-dim)', cursor: 'pointer' }} onClick={() => onNav('history')}>→ Dějiny: Velký rozkol</a></li>
              <li><a style={{ color: 'var(--fg-dim)', cursor: 'pointer' }} onClick={() => onNav('martyrs')}>→ Mučedníci: Pavel z Plzně</a></li>
            </ul>
          </div>
        </aside>
      </article>

      {/* Nav prev/next */}
      <section className="container" style={{ padding: '80px 28px 0', display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: 24, alignItems: 'center' }}>
        <a onClick={() => onNav('sects')} style={{ cursor: 'pointer', fontFamily: 'var(--mono)', fontSize: 12, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--fg-dim)' }}>
          ← Zpět na seznam sekt
        </a>
        <button className="btn ghost" onClick={() => onNav('sects')}>VŠECHNY SEKTY</button>
        <a onClick={() => onNav('sects')} style={{ cursor: 'pointer', fontFamily: 'var(--mono)', fontSize: 12, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--fg-dim)', textAlign: 'right' }}>
          Hitachisté →
        </a>
      </section>
    </main>
  );
};

window.SektyPage = SektyPage;
window.SectKomatsuPage = SectKomatsuPage;
