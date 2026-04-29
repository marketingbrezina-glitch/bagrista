// Bagrista — Slovník (hub stránka s kotvami)

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

const GlossaryHub = ({ onNav }) => (
  <main style={{ background: 'var(--bg)', paddingBottom: 80 }}>
    <section className="container" style={{ padding: '64px 28px 24px' }}>
      <div className="page-meta">
        <span>Lore · Slovník</span>
        <span>· {SLOVNIK_TERMS.length} pojmů</span>
        <span style={{ marginLeft: 'auto' }}>↻ Aktualizováno na motohodinu</span>
      </div>
      <h1 style={{ fontFamily: 'var(--display)', fontSize: 'clamp(60px,8vw,120px)', letterSpacing: '0.02em', lineHeight: 0.92, margin: '24px 0 16px', color: 'var(--fg)' }}>
        SLOVNÍK PRAVDY
      </h1>
      <p style={{ fontFamily: 'var(--body)', fontStyle: 'italic', fontSize: 20, color: 'var(--fg-dim)', maxWidth: 720, margin: 0 }}>
        Pojmy, které je třeba znát, abys mluvil řečí Bratrstva. Doménový kánon — kanonický význam, ne uliční.
      </p>
    </section>

    <div style={{ height: 6 }} className="stripes-thin" />

    <div className="container" style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: 56, padding: '40px 28px 0' }}>
      {/* TOC */}
      <nav style={{ position: 'sticky', top: 80, alignSelf: 'start' }}>
        <div className="mono-caption" style={{ marginBottom: 16 }}>— Obsah —</div>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 8 }}>
          {SLOVNIK_TERMS.map((t, i) => (
            <li key={t.id}>
              <a href={`#${t.id}`} style={{ display: 'flex', gap: 10, fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--fg-dim)', textDecoration: 'none', padding: '4px 0' }}>
                <span style={{ color: 'var(--accent-num)', minWidth: 24 }}>{String(i+1).padStart(2,'0')}</span>
                <span>{t.term}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Terms */}
      <article style={{ maxWidth: 760 }}>
        {SLOVNIK_TERMS.map((t, i) => (
          <section key={t.id} id={t.id} style={{ paddingBottom: 48, borderBottom: '1px dashed var(--rule-dashed)', marginBottom: 48 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, marginBottom: 6 }}>
              <span style={{ fontFamily: 'var(--mono)', fontSize: 12, letterSpacing: '0.32em', color: 'var(--accent-num)' }}>
                {String(i+1).padStart(2,'0')}
              </span>
              <h2 style={{
                fontFamily: 'var(--display)', fontSize: 56, letterSpacing: '0.01em',
                margin: 0, color: 'var(--fg)', lineHeight: 1,
              }}>{t.term.toUpperCase()}</h2>
            </div>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 12, letterSpacing: '0.16em', color: 'var(--fg-dim)', textTransform: 'uppercase', marginBottom: 18 }}>
              {t.short}
            </div>
            <p style={{ fontFamily: 'var(--body)', fontSize: 18, lineHeight: 1.7, margin: 0, color: 'var(--fg)' }}
               dangerouslySetInnerHTML={{ __html: t.body }} />
          </section>
        ))}
      </article>
    </div>
  </main>
);

window.GlossaryHub = GlossaryHub;
